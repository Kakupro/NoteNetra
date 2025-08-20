import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeatureComparison = () => {
  const [activeCategory, setActiveCategory] = useState('core');

  const categories = [
    { id: 'core', label: 'Core Features', icon: 'Zap' },
    { id: 'analytics', label: 'Analytics & Reports', icon: 'BarChart3' },
    { id: 'integration', label: 'Integrations', icon: 'Link' },
    { id: 'support', label: 'Support & Training', icon: 'HeadphonesIcon' }
  ];

  const features = {
    core: [
      { name: 'Cash Transaction Logging', starter: true, professional: true, enterprise: true },
      { name: 'UPI Transaction Tracking', starter: true, professional: true, enterprise: true },
      { name: 'Basic Dashboard Access', starter: true, professional: true, enterprise: true },
      { name: 'Transaction History (3 months)', starter: true, professional: false, enterprise: false },
      { name: 'Transaction History (12 months)', starter: false, professional: true, enterprise: true },
      { name: 'Transaction History (Unlimited)', starter: false, professional: false, enterprise: true },
      { name: 'Multi-location Support', starter: false, professional: true, enterprise: true },
      { name: 'Staff Account Management', starter: false, professional: '3 accounts', enterprise: 'Unlimited' },
      { name: 'Custom Business Rules', starter: false, professional: false, enterprise: true }
    ],
    analytics: [
      { name: 'Basic Sales Reports', starter: true, professional: true, enterprise: true },
      { name: 'Customer Analytics', starter: false, professional: true, enterprise: true },
      { name: 'Inventory Tracking', starter: false, professional: true, enterprise: true },
      { name: 'Profit Margin Analysis', starter: false, professional: false, enterprise: true },
      { name: 'Predictive Analytics', starter: false, professional: false, enterprise: true },
      { name: 'Custom Report Builder', starter: false, professional: false, enterprise: true },
      { name: 'Real-time Dashboards', starter: false, professional: true, enterprise: true },
      { name: 'Export to Excel/PDF', starter: false, professional: true, enterprise: true }
    ],
    integration: [
      { name: 'Basic API Access', starter: false, professional: true, enterprise: true },
      { name: 'Accounting Software Integration', starter: false, professional: '2 platforms', enterprise: 'Unlimited' },
      { name: 'E-commerce Platform Sync', starter: false, professional: false, enterprise: true },
      { name: 'ONDC Marketplace Integration', starter: false, professional: false, enterprise: true },
      { name: 'Banking API Integration', starter: false, professional: false, enterprise: true },
      { name: 'Custom Webhook Support', starter: false, professional: false, enterprise: true },
      { name: 'Third-party App Marketplace', starter: false, professional: false, enterprise: true }
    ],
    support: [
      { name: 'Email Support', starter: true, professional: true, enterprise: true },
      { name: 'Phone Support', starter: false, professional: true, enterprise: true },
      { name: 'Priority Support', starter: false, professional: false, enterprise: true },
      { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
      { name: 'Setup & Training', starter: 'Self-service', professional: '2 hours', enterprise: '8 hours' },
      { name: 'Monthly Business Reviews', starter: false, professional: false, enterprise: true },
      { name: 'Custom Training Programs', starter: false, professional: false, enterprise: true }
    ]
  };

  const plans = ['starter', 'professional', 'enterprise'];
  const planLabels = { starter: 'Starter', professional: 'Professional', enterprise: 'Enterprise' };

  const renderFeatureValue = (value) => {
    if (value === true) {
      return <Icon name="Check" size={20} color="var(--color-success)" strokeWidth={2.5} />;
    }
    if (value === false) {
      return <Icon name="X" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />;
    }
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      <div className="p-8 border-b border-border">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">Feature Comparison</h3>
          <p className="text-muted-foreground">
            Compare features across all NoteNetra plans to find the perfect fit
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} strokeWidth={2} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-4 font-semibold text-foreground min-w-64">Feature</th>
              {plans?.map((plan) => (
                <th key={plan} className="text-center p-4 font-semibold text-foreground min-w-32">
                  {planLabels?.[plan]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features?.[activeCategory]?.map((feature, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/30 transition-micro">
                <td className="p-4 text-foreground font-medium">{feature?.name}</td>
                {plans?.map((plan) => (
                  <td key={plan} className="p-4 text-center">
                    {renderFeatureValue(feature?.[plan])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;