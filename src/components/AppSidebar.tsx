
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Dumbbell, 
  BookOpen, 
  Droplets, 
  UtensilsCrossed,
  Settings,
  BarChart3,
  Calendar,
  Shield
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const mainNavItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Goals & Habits', url: '/habits', icon: Target },
  { title: 'Workouts', url: '/workouts', icon: Dumbbell },
  { title: 'Study Timer', url: '/study', icon: BookOpen },
  { title: 'Water Tracker', url: '/water', icon: Droplets },
  { title: 'Meal Tracker', url: '/meals', icon: UtensilsCrossed },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Schedule', url: '/schedule', icon: Calendar }
];

const adminNavItems = [
  { title: 'Admin Panel', url: '/admin', icon: Shield },
  { title: 'Settings', url: '/settings', icon: Settings }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const getNavClassName = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? 'bg-orange-100 text-orange-700 border-r-2 border-orange-500' 
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-gray-900">RiseUp</h1>
                <p className="text-xs text-gray-500">Discipline Tracker</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
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
