
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-grid p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px] animate-scale-in">
        <div className="flex flex-col space-y-2 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-4">
            MA
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Membership Admin Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage members, events, and forms.
          </p>
        </div>
        <div className="bg-card border p-6 rounded-lg shadow-sm">
          <div className="flex flex-col space-y-4">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign in with Auth0"
              )}
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              Please sign in to access the membership portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
