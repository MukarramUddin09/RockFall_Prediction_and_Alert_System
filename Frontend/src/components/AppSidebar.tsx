import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Activity,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Heart,
  Mountain,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "System overview and key metrics",
  },
  {
    title: "Map View",
    url: "/map",
    icon: Map,
    description: "Interactive sensor network map",
  },
  {
    title: "Live Data",
    url: "/live-data",
    icon: Activity,
    description: "Real-time sensor readings",
  },
  {
    title: "Predictions & Alerts",
    url: "/predictions",
    icon: AlertTriangle,
    description: "ML predictions and warnings",
  },
  {
    title: "Historical Trends",
    url: "/trends",
    icon: TrendingUp,
    description: "Data analysis over time",
  },
  {
    title: "Events & Training",
    url: "/events",
    icon: Calendar,
    description: "Event timeline and research mode",
  },
  {
    title: "System Health",
    url: "/health",
    icon: Heart,
    description: "Network status and diagnostics",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const active = isActive(path);
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      active
        ? "bg-sidebar-accent text-sidebar-primary font-medium"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
    }`;
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-semibold text-sidebar-foreground">
                Rockfall EWS
              </h1>
              <p className="text-xs text-sidebar-foreground/70">
                Early Warning System
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium">
            {!isCollapsed && "Monitoring"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-sidebar-foreground/60 truncate">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}