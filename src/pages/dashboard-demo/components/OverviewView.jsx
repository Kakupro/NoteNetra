import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import { demoData } from '../../../utils/demoData';

const OverviewView = ({ children }) => {
  const kpiData = demoData.kpiData;

  const revenueData = demoData.revenueData;
  const paymentMethodData = demoData.paymentMethodData;
  const creditScoreHistory = demoData.creditScoreHistory;

  return (
    <div className="p-6 space-y-6">
      {children} {/* Render children here */}
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData?.map((kpi, index) => (
          <div
            key={index}
            className={`${kpi?.bgColor} ${kpi?.borderColor} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${kpi?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={kpi?.icon} size={24} color={kpi?.color?.replace('text-', 'var(--color-')} />
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
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark-text-primary">Revenue Trend</h3>
            <div className="flex items-center space-x-2 text-sm text-dark-text-secondary">
              <Icon name="Calendar" size={16} />
              <span>Last 6 months</span>
            </div>
          </div>
          <div className="h-64">
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
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark-text-primary">Payment Methods</h3>
            <div className="flex items-center space-x-2 text-sm text-dark-text-secondary">
              <Icon name="PieChart" size={16} />
              <span>Current month</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {paymentMethodData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {paymentMethodData?.map((method, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: method?.color }}
                />
                <span className="text-sm text-dark-text-secondary">{method?.name} ({method?.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Credit Score Progress */}
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dark-text-primary">Credit Score Progress</h3>
          <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
            <Icon name="TrendingUp" size={16} />
            <span>+62 points in 6 months</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={creditScoreHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis domain={[650, 800]} stroke="#9ca3af" />
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
    </div>
  );
};

export default OverviewView;