import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FeatureNavigation = () => {
  const [activeSection, setActiveSection] = useState('transaction-tracking');
  const [isSticky, setIsSticky] = useState(false);

  const navigationItems = [
    {
      id: 'transaction-tracking',
      label: 'Transaction Tracking',
      icon: 'Activity',
      description: 'Smart cash & UPI monitoring'
    },
    {
      id: 'credit-engine',
      label: 'Credit Engine',
      icon: 'TrendingUp',
      description: 'AI-powered credit scoring'
    },
    {
      id: 'invoicing',
      label: 'Invoicing',
      icon: 'FileText',
      description: 'One-click invoice generation'
    },
    {
      id: 'storefront',
      label: 'Storefront',
      icon: 'Store',
      description: 'ONDC-compatible marketplace'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 200);

      // Update active section based on scroll position
      const sections = navigationItems?.map(item => document.getElementById(item?.id));
      const currentSection = sections?.find(section => {
        if (section) {
          const rect = section?.getBoundingClientRect();
          return rect?.top <= 100 && rect?.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection?.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element?.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav 
      className={`transition-all duration-300 z-40 ${
        isSticky 
          ? 'fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-card border-b border-border' 
          : 'relative bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto content-spacing">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => scrollToSection(item?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro whitespace-nowrap ${
                  activeSection === item?.id
                    ? 'bg-primary text-primary-foreground shadow-interactive'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color={activeSection === item?.id ? 'white' : 'currentColor'}
                  strokeWidth={2}
                />
                <div className="text-left">
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs opacity-80 hidden lg:block">{item?.description}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open('/dashboard-demo', '_blank')}
            >
              Try Live Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FeatureNavigation;