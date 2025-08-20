import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const pathMapping = {
    '/landing-page': { label: 'Home', icon: 'Home' },
    '/features-page': { label: 'Features', icon: 'Zap' },
    '/pricing-page': { label: 'Pricing', icon: 'DollarSign' },
    '/dashboard-demo': { label: 'Demo', icon: 'Monitor' },
    '/contact-page': { label: 'Contact', icon: 'MessageCircle' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/landing-page', icon: 'Home' }];

    if (location?.pathname !== '/landing-page') {
      const currentPath = location?.pathname;
      const currentPage = pathMapping?.[currentPath];
      
      if (currentPage) {
        breadcrumbs?.push({
          label: currentPage?.label,
          path: currentPath,
          icon: currentPage?.icon,
          current: true
        });
      }
    } else {
      breadcrumbs[0].current = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 && location?.pathname === '/landing-page') {
    return null;
  }

  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-border" 
                strokeWidth={2}
              />
            )}
            
            {item?.current ? (
              <span className="flex items-center space-x-1.5 text-foreground font-medium">
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  color="var(--color-primary)" 
                  strokeWidth={2}
                />
                <span>{item?.label}</span>
              </span>
            ) : (
              <Link
                to={item?.path}
                className="flex items-center space-x-1.5 hover:text-primary transition-micro"
              >
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  strokeWidth={2}
                />
                <span>{item?.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;