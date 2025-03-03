
import { useAuth0 } from '@auth0/auth0-react';
import { AuthContextType, AuthUser } from '@/lib/types';
import { toast } from 'sonner';

export const useAuth = (): AuthContextType => {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    user
  } = useAuth0();

  const login = () => {
    try {
      loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in');
    }
  };

  const logoutWithRedirect = () => {
    try {
      auth0Logout({ 
        logoutParams: {
          returnTo: window.location.origin 
        }
      });
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user: user as AuthUser | null,
    login,
    logout: logoutWithRedirect
  };
};
