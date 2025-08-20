import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { getAuth, signOut } from 'firebase/auth';

const Header = ({ user }) => {
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

  return (
    <header className="bg-dark-bg-secondary border-b border-dark-border-primary shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dark-accent-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-dark-text-primary">NoteNetra</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Welcome message and logout moved to sidebar bottom */}
        </div>
      </div>
    </header>
  );
};

export default Header;
