import React from 'react';
import { Link } from 'react-router-dom';

const CustomLogo = ({ variant = 'default', className = '', showText = true, design = 'custom' }) => {
  
  // Different logo designs
  const logoDesigns = {
    modern: {
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path 
              d="M12 2L2 7L12 12L22 7L12 2Z" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
            <path 
              d="M2 17L12 22L22 17" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <path 
              d="M2 12L12 17L22 12" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            />
          </svg>
        </div>
      ),
      accent: "bg-yellow-400"
    },
    
    tech: {
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        </div>
      ),
      accent: "bg-red-400"
    },
    
    finance: {
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      ),
      accent: "bg-orange-400"
    },
    
    minimal: {
      icon: (
        <div className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-600 rounded-md flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      ),
      accent: "bg-blue-400"
    },
    
    custom: {
      icon: (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 overflow-hidden">
          <img 
            src="/assets/images/your-logo.png" 
            alt="NoteNetra Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to default logo if custom logo fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Fallback SVG logo */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white hidden">
            <path 
              d="M12 2L2 7L12 12L22 7L12 2Z" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ),
      accent: "bg-transparent"
    }
  };

  const currentDesign = logoDesigns[design] || logoDesigns.modern;

  const LogoIcon = () => (
    <div className="relative">
      {currentDesign.icon}
      {/* Accent dot */}
      <div className={`absolute -top-1 -right-1 w-2 h-2 ${currentDesign.accent} rounded-full opacity-80`}></div>
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <Link to="/landing-page" className={`group ${className}`}>
        <LogoIcon />
      </Link>
    );
  }

  return (
    <Link to="/landing-page" className={`flex items-center space-x-3 group ${className}`}>
      <LogoIcon />
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-dark-text-primary tracking-tight">
            NoteNetra
          </span>
          <span className="text-xs text-dark-text-muted -mt-1 font-medium">
            Smart Finance Hub
          </span>
        </div>
      )}
    </Link>
  );
};

export default CustomLogo;
