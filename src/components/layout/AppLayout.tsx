
import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    ChevronLeft,
    ChevronRight,
    Users,
    Calendar,
    ClipboardList,
    Home,
    Menu,
    LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AppLayout = () => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const routes = [
        {
            path: "/",
            name: "Dashboard",
            icon: Home,
        },
        {
            path: "/members",
            name: "Members",
            icon: Users,
        },
        {
            path: "/events",
            name: "Events",
            icon: Calendar,
        },
        {
            path: "/event-forms",
            name: "Event Forms",
            icon: ClipboardList,
        },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const SidebarContent = () => (
        <div className="h-full flex flex-col">
            <div className="px-3 py-4">
                <h1 className="text-xl font-bold mb-6 px-2">Membership Portal</h1>
                <nav className="space-y-1">
                    {routes.map((route) => {
                        const Icon = route.icon;
                        return (
                            <NavLink
                                key={route.path}
                                to={route.path}
                                className={`flex items-center px-2 py-2 rounded-md transition-colors ${isActive(route.path)
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-muted"
                                    }`}
                            >
                                <Icon
                                    className={`mr-3 h-5 w-5 ${isActive(route.path) ? "text-primary" : "text-muted-foreground"
                                        }`}
                                />
                                <span>{route.name}</span>
                            </NavLink>
                        );
                    })}

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
                            {open && (
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
                </nav>
            </div>
            <div className="mt-auto p-4">
                <ThemeToggle />
            </div>
        </div>
    );

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Desktop Sidebar */}
            <div
                className={`h-screen bg-card border-r transition-all duration-300 hidden md:block ${sidebarOpen ? "w-64" : "w-16"
                    }`}
            >
                {sidebarOpen ? (
                    <div className="h-full relative">
                        <SidebarContent />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-2"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-4 h-full">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="mb-6"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <div className="space-y-4 flex flex-col items-center">
                            {routes.map((route) => {
                                const Icon = route.icon;
                                return (
                                    <NavLink
                                        key={route.path}
                                        to={route.path}
                                        className={`p-2 rounded-md transition-colors ${isActive(route.path)
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-muted"
                                            }`}
                                        title={route.name}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${isActive(route.path) ? "text-primary" : "text-muted-foreground"
                                                }`}
                                        />
                                    </NavLink>
                                );
                            })}
                        </div>
                        <div className="mt-auto mb-4">
                            <ThemeToggle />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4 z-10">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto pt-12 md:pt-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
