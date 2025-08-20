import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import { getAuth } from 'firebase/auth';
import { database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';
import Button from '../../../components/ui/Button';
import { demoData, formatCurrency, formatDate } from '../../../utils/demoData';
import { computeCreditScoreFromTransactions } from '../../../utils/msmeScore';

const OverviewView = ({ children }) => {
  const [kpiData, setKpiData] = useState(demoData.kpiData);
  const [revenueData, setRevenueData] = useState(demoData.revenueData);
  const [paymentMethodData, setPaymentMethodData] = useState(demoData.paymentMethodData);
  const [creditScoreHistory, setCreditScoreHistory] = useState(demoData.creditScoreHistory);
  const [recentTransactions, setRecentTransactions] = useState(demoData.recentTransactions);
  const [scoreResult, setScoreResult] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const transactionsRef = ref(database, `transactions/${user.uid}`);
      const creditHistoryRef = ref(database, `creditHistory/${user.uid}`);

      onValue(transactionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const transactions = Object.values(data);
          // Calculate KPIs
          const totalRevenue = transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
          const totalTransactions = transactions.length;
          // Compute real-time credit score from cash transactions
          const computed = computeCreditScoreFromTransactions(
            transactions.map(t => ({
              time: t.time,
              amount: t.amount,
              type: t.type, // 'credit' or 'debit'
            }))
          );
          setScoreResult(computed);

          setKpiData([
            { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: "TrendingUp", color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20", change: "" },
            { title: "Total Transactions", value: totalTransactions, icon: "Receipt", color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", change: "" },
            { title: "Credit Score", value: computed?.score300to900 ?? '—', icon: "Award", color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", change: "" },
          ]);

          // Process revenue data for chart
          const monthlyRevenue = transactions.reduce((acc, t) => {
            const month = new Date(t.time).toLocaleString('default', { month: 'short' });
            if (t.type === 'credit') {
              acc[month] = (acc[month] || 0) + t.amount;
            }
            return acc;
          }, {});
          setRevenueData(Object.keys(monthlyRevenue).map(month => ({ month, revenue: monthlyRevenue[month] })));

          // Process payment method data
          const paymentMethods = transactions.reduce((acc, t) => {
            acc[t.mode] = (acc[t.mode] || 0) + 1;
            return acc;
          }, {});
          const total = Object.values(paymentMethods).reduce((acc, val) => acc + val, 0);
          setPaymentMethodData(Object.keys(paymentMethods).map(mode => ({ name: mode, value: (paymentMethods[mode] / total) * 100, color: '#' + Math.floor(Math.random()*16777215).toString(16) })));

          // Set recent transactions
          setRecentTransactions(transactions.slice(-5).reverse());
        }
      });

      onValue(creditHistoryRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const history = Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));
          setCreditScoreHistory(history);
          // KPI credit score is driven by real-time computation above
        }
      });
    }
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      {children} 
      <div className="mb-6">
        <Button
          onClick={() => window.open('https://razorpay.me/@notenetra', '_blank')}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Accept Online Payments (via Razorpay)
        </Button>
      </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData?.map((kpi, index) => (
          <div
            key={index}
            className={`${kpi?.bgColor} ${kpi?.borderColor} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${kpi?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={kpi?.icon} size={24} className={kpi?.color} />
              </div>
              <div className={`flex items-center space-x-1 ${kpi?.color} text-sm font-medium`}>
                <Icon name="TrendingUp" size={16} />
                <span>{kpi?.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-dark-text-primary mb-1">{kpi?.value}</h3>
              <p className="text-sm text-dark-text-secondary">{kpi?.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']}
                  labelStyle={{ color: '#ffffff' }}
                  contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
                />
                <Bar dataKey="revenue" fill="#0891b2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${tx.type === 'credit' ? 'green' : 'red'}-500`}>
                      <Icon name={tx.type === 'credit' ? 'TrendingUp' : 'TrendingDown'} size={20} className={`text-${tx.type === 'credit' ? 'green' : 'red'}-400`} />
                    </div>
                    <div>
                      <p className="font-medium text-dark-text-primary">{tx.mode}</p>
                      <p className="text-sm text-dark-text-secondary">{new Date(tx.time).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>₹{tx.amount.toLocaleString('en-IN')}</p>
                </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Credit Score Progress</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creditScoreHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis domain={['dataMin - 50', 'dataMax + 50']} stroke="#9ca3af" />
                <Tooltip 
                  formatter={(value) => [value, 'Credit Score']}
                  labelStyle={{ color: '#ffffff' }}
                  contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Payment Methods</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={5}
                >
                  {paymentMethodData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(2)}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;