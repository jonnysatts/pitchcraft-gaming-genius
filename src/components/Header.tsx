
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { signOut } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import Button from '@/components/ui/button';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white border-b border-games-silver sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/placeholder.svg" 
              alt="Games Age Logo" 
              className="h-8 w-8 mr-2"
            />
            <span className="font-medium text-games-navy">Games Age</span>
          </a>
        </div>
        
        {user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-games-navy hover:text-games-blue transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-games-slate flex items-center justify-center text-games-navy mr-2">
                <User className="w-4 h-4" />
              </div>
              <span className="mr-1">{user.email}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-games-navy hover:bg-games-slate"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-games-navy hover:bg-games-slate"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
