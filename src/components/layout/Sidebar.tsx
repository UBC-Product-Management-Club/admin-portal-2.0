
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, Calendar, FileText, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden rounded-full p-2 bg-primary text-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 animate-fade-in" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground z-40 flex h-full flex-col overflow-hidden transition-all duration-300",
          isOpen ? "w-64" : isMobile ? "w-0" : "w-16",
          isMobile && "fixed left-0 top-0 bottom-0 shadow-xl"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-center border-b border-sidebar-border p-4">
            <div className={cn("flex items-center gap-2", !isOpen && !isMobile && "hidden")}>
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                MA
              </div>
              <h1 className="font-semibold tracking-tight truncate">
                Membership Admin
              </h1>
            </div>
            {!isOpen && !isMobile && (
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                MA
              </div>
            )}
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              <NavItem
                to="/members"
                label="Members"
                icon={<Users size={20} />}
                isOpen={isOpen}
              />
              <NavItem
                to="/events"
                label="Events"
                icon={<Calendar size={20} />}
                isOpen={isOpen}
              />
              <NavItem
                to="/event-forms"
                label="Event Forms"
                icon={<FileText size={20} />}
                isOpen={isOpen}
              />
            </ul>
          </nav>

          {/* User profile */}
          <div className="mt-auto border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                {user?.picture ? (
                  <img src={user.picture} alt={user?.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              {isOpen && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[160px]">{user?.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[160px]">{user?.email}</span>
                </div>
              )}
              <button
                onClick={() => logout()}
                className="ml-auto rounded-full p-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

function NavItem({ to, label, icon, isOpen }: NavItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors",
            isActive
              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )
        }
      >
        <span className="flex-shrink-0">{icon}</span>
        {isOpen && <span>{label}</span>}
      </NavLink>
    </li>
  );
}
