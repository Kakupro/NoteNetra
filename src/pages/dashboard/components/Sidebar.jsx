import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { getAuth, signOut } from 'firebase/auth';

const Sidebar = ({ isCollapsed, onToggleCollapse, user }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login-page');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3', path: '/dashboard' }, // Use absolute path for overview
    { id: 'transactions', label: 'Transactions', icon: 'Receipt', path: 'transactions' },
    { id: 'credit-score', label: 'Credit Score', icon: 'TrendingUp', path: 'credit-score' },
    { id: 'reports', label: 'Reports', icon: 'FileText', path: 'reports' },
    { id: 'chatbot', label: 'Chatbot', icon: 'MessageCircle', path: 'chatbot' },
    { id: 'community-chat', label: 'Community Chat', icon: 'MessageCircle', path: 'community-chat' },
    { id: 'account-settings', label: 'Account Settings', icon: 'Settings', path: 'user-profile' } // Assuming user-profile route for current user
  ];

  return (
    <aside className={`bg-dark-bg-card border-r border-dark-border-primary transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-full`}>
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
      <nav className="p-4 space-y-2 flex-1">
        {menuItems?.map((item) => (
          <NavLink
            key={item?.id}
            to={item?.path} 
            end={item?.id === 'overview'} // Use 'end' for the overview to match exact path
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-dark-accent-primary/20 text-dark-accent-primary border border-dark-accent-primary/30' :'text-dark-text-secondary hover:bg-dark-bg-tertiary hover:text-dark-text-primary'
              }`
            }
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              // activeView is no longer used here, NavLink's isActive handles styling
              color={'currentColor'}
            />
            {!isCollapsed && <span className="font-medium">{item?.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Profile and Logout Section at Bottom */}
      <div className="border-t border-dark-border-primary p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-text-primary truncate">
                Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </p>
              <p className="text-xs text-dark-text-secondary truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="w-full"
          iconName="LogOut"
          iconPosition="left"
        >
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;