
import { useState } from 'react';
import Button from '@/components/ui/button';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="w-full max-w-md mb-6">
        <div className="flex rounded-lg overflow-hidden border">
          <Button
            variant={showLogin ? "primary" : "ghost"}
            className={`flex-1 rounded-none ${showLogin ? "" : "hover:bg-transparent"}`}
            onClick={() => setShowLogin(true)}
          >
            Sign In
          </Button>
          <Button
            variant={!showLogin ? "primary" : "ghost"}
            className={`flex-1 rounded-none ${!showLogin ? "" : "hover:bg-transparent"}`}
            onClick={() => setShowLogin(false)}
          >
            Sign Up
          </Button>
        </div>
      </div>
      
      {showLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default Auth;
