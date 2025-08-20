import React from 'react';
import Icon from '../../../components/AppIcon';

const DemoSidebar = ({ activeView, onViewChange, isCollapsed, onToggleCollapse }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' },
    { id: 'credit-score', label: 'Credit Score', icon: 'TrendingUp' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  return (
    <aside className={`bg-dark-bg-card border-r border-dark-border-primary transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-dark-border-primary">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-dark-text-primary">Dashboard</h2>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-dark-bg-tertiary transition-colors"
        >
          <Icon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={20} 
            color="currentColor"
          />
        </button>
      </div>
      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {menuItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => onViewChange(item?.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              activeView === item?.id
                ? 'bg-dark-accent-primary/20 text-dark-accent-primary border border-dark-accent-primary/30' :'text-dark-text-secondary hover:bg-dark-bg-tertiary hover:text-dark-text-primary'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              color={activeView === item?.id ? '#3b82f6' : 'currentColor'}
            />
            {!isCollapsed && <span className="font-medium">{item?.label}</span>}
          </button>
        ))}
      </nav>
      {/* Demo Info */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-dark-accent-primary/10 border border-dark-accent-primary/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} color="#3b82f6" />
              <span className="text-sm font-medium text-dark-accent-primary">Demo Data</span>
            </div>
            <p className="text-xs text-dark-text-secondary">
              This dashboard shows simulated MSME transaction data for demonstration purposes.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DemoSidebar;