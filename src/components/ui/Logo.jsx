import React from 'react';
import { Link } from 'react-router-dom';


const Logo = ({ variant = 'default', className = '', showText = true }) => {
  const LogoIcon = () => (
    <div className="relative">
      <img 
        src="/assets/images/note.jpeg" 
        alt="NoteNetra Logo" 
        className="w-8 h-8 rounded-lg shadow-md transition-micro group-hover:scale-105"
      />
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

export default Logo;