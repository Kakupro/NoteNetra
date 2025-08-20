import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileBottomNav from './components/MobileBottomNav';
import DeviceStatus from '../../components/DeviceStatus';
import { getAuth } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    // Do not collapse sidebar for community-chat specifically
    if (location.pathname.startsWith('/dashboard/community-chat')) {
      setIsSidebarCollapsed(false); // Ensure sidebar is not collapsed for chat
    } else if (location.pathname === '/chat') {
      setIsSidebarCollapsed(true);
    } else if (window.innerWidth >= 768) { // Only uncollapse if not mobile view
      setIsSidebarCollapsed(false);
    }
  }, [location.pathname]);

  const handleViewChange = (view) => {
    // No longer needed for primary navigation via router, but keep if used for internal component state
    // setActiveView(view);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Removed renderActiveView function

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-dark-accent-primary rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-dark-accent-primary rounded animate-spin"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-dark-text-primary mb-2">Loading NoteNetra Dashboard</h2>
          <p className="text-dark-text-secondary">Preparing your dashboard...</p>
          <div className="w-64 bg-dark-bg-tertiary rounded-full h-2 mx-auto mt-4">
            <div className="bg-dark-accent-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-dark-bg-primary">
      <Header user={user} />
      
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <Sidebar
            // activeView no longer directly used for routing
            onViewChange={handleViewChange} // Keep if needed for other internal state
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            user={user}
          />
        )}

        <main className={`flex-1 overflow-y-auto ${isMobile ? 'pb-16' : ''}`}>
          <div className="h-full">
            <Outlet /> {/* Render nested route content here */}
          </div>
        </main>
      </div>

      <MobileBottomNav
        // activeView no longer directly used for routing
        onViewChange={handleViewChange} // Keep if needed for other internal state
        isVisible={isMobile}
      />
    </div>
  );
};

export default DashboardPage;
