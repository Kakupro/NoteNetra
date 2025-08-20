import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileBottomNav = ({ activeView, onViewChange, isVisible }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' },
    { id: 'credit-score', label: 'Credit', icon: 'TrendingUp' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-bg-card border-t border-dark-border-primary z-40 md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onViewChange(item?.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              activeView === item?.id
                ? 'text-dark-accent-primary bg-dark-accent-primary/20' :'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-bg-tertiary'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              color={activeView === item?.id ? '#3b82f6' : 'currentColor'}
            />
            <span className="text-xs font-medium">{item?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;