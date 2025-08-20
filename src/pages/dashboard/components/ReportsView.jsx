import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { demoData } from '../../../utils/demoData';

const ReportsView = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('revenue');

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reportOptions = [
    { value: 'revenue', label: 'Revenue Analysis' },
    { value: 'transactions', label: 'Transaction Trends' },
    { value: 'customers', label: 'Customer Insights' },
    { value: 'credit', label: 'Credit Performance' }
  ];

  const monthlyRevenue = demoData.revenueData.map(item => ({
    ...item,
    target: item.revenue * 1.1, // Add target as 10% higher than actual
    growth: ((item.revenue - (item.revenue * 0.9)) / (item.revenue * 0.9) * 100).toFixed(1)
  }));

  const categoryBreakdown = demoData.categoryBreakdown;
  const customerMetrics = demoData.customerMetrics;
  const topProducts = demoData.topProducts;
  const creditMetrics = demoData.creditScoreHistory.map((item, index) => ({
    month: item.month,
    score: item.score,
    loanEligibility: 650000 + (index * 50000) // Progressive loan eligibility
  }));

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-dark-text-secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-dark-text-primary">Business Reports</h2>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => alert('Export functionality would be implemented here')}
            >
              Export PDF
            </Button>
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={() => alert('Share functionality would be implemented here')}
            >
              Share Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Report Type"
            options={reportOptions}
            value={selectedReport}
            onChange={setSelectedReport}
          />
          
          <Select
            label="Time Period"
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      </div>
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dark-text-primary">Revenue Performance</h3>
          <div className="flex items-center space-x-2 text-sm text-green-400 font-medium">
            <Icon name="TrendingUp" size={16} />
            <span>+32.8% vs last period</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="DollarSign" size={24} color="var(--color-primary)" />
              <div>
                <p className="text-sm text-blue-400">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-300">₹14,55,680</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={24} color="var(--color-success)" />
              <div>
                <p className="text-sm text-green-400">Target Achievement</p>
                <p className="text-2xl font-bold text-green-300">98.2%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="TrendingUp" size={24} color="#8B5CF6" />
              <div>
                <p className="text-sm text-purple-400">Growth Rate</p>
                <p className="text-2xl font-bold text-purple-300">+6.2%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? `₹${value?.toLocaleString('en-IN')}` : `₹${value?.toLocaleString('en-IN')}`,
                  name === 'revenue' ? 'Actual Revenue' : 'Target'
                ]}
                labelStyle={{ color: '#ffffff' }}
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#6B7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Revenue by Category</h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="amount"
                >
                  {categoryBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']}
                  labelStyle={{ color: '#ffffff' }}
                  contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryBreakdown?.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category?.color }}
                  />
                  <span className="text-sm text-dark-text-secondary">{category?.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-dark-text-primary">₹{category?.amount?.toLocaleString('en-IN')}</div>
                  <div className="text-xs text-dark-text-muted">{category?.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
          <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Customer Insights</h3>
          <div className="space-y-4">
            {customerMetrics?.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-dark-bg-secondary rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-dark-bg-card rounded-lg flex items-center justify-center">
                    <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-text-secondary">{metric?.metric}</p>
                    <p className="text-xl font-bold text-dark-text-primary">{metric?.value}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${metric?.color} font-medium`}>
                  <Icon name="TrendingUp" size={16} />
                  <span className="text-sm">{metric?.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Top Performing Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg-tertiary border-b border-dark-border-primary">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-dark-text-primary">Product</th>
                <th className="text-center py-3 px-4 font-semibold text-dark-text-primary">Units Sold</th>
                <th className="text-right py-3 px-4 font-semibold text-dark-text-primary">Revenue</th>
                <th className="text-center py-3 px-4 font-semibold text-dark-text-primary">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topProducts?.map((product, index) => (
                <tr key={index} className="border-b border-dark-border-primary hover:bg-dark-bg-secondary">
                  <td className="py-3 px-4 font-medium text-dark-text-primary">{product?.name}</td>
                  <td className="py-3 px-4 text-center text-dark-text-secondary">{product?.sales}</td>
                  <td className="py-3 px-4 text-right font-medium text-dark-text-primary">
                    ₹{product?.revenue?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Icon 
                      name={getTrendIcon(product?.trend)} 
                      size={16} 
                      className={getTrendColor(product?.trend)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-dark-bg-card rounded-xl border border-dark-border-primary p-6">
        <h3 className="text-lg font-semibold text-dark-text-primary mb-6">Credit Score & Loan Eligibility Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={creditMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis yAxisId="left" stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'score' ? value : `₹${value?.toLocaleString('en-IN')}`,
                  name === 'score' ? 'Credit Score' : 'Loan Eligibility'
                ]}
                labelStyle={{ color: '#ffffff' }}
                contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333333' }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="score" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="loanEligibility" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-sm text-dark-text-secondary">Credit Score</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-dark-text-secondary">Loan Eligibility (₹)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
