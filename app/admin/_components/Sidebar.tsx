"use client";

import React from "react";
import { LayoutDashboard, Users, Settings, LogOut, Map, X, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    className={`
      flex items-center w-full p-3 rounded-lg transition-colors duration-200
      ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-accent text-muted-foreground hover:text-foreground"
      }
    `}
    onClick={onClick}
  >
    {React.cloneElement(icon as React.ReactElement, {
      className: "mr-3 h-5 w-5",
    })}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  isMobile?: boolean;
  isSidebarOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  setActiveSection,
  isMobile,
  isSidebarOpen,
  onClose,
}) => {
  return (
    <div className={`
      ${isMobile 
        ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out'
        : 'relative transition-all duration-300'
      }
      ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
      ${!isMobile && !isSidebarOpen ? 'w-0 opacity-0' : 'w-64 opacity-100'}
      bg-card border-r flex flex-col
    `}>
      <div className="p-4 overflow-hidden">
        {/* Logo and Title */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/logo.png" alt="Company Logo" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-grow">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            isActive={activeSection === 'dashboard'}
            onClick={() => {
              setActiveSection('dashboard');
              if (isMobile) {
                onClose?.();
              }
            }}
          />
          <SidebarItem
            icon={<Users />}
            label="Admins"
            isActive={activeSection === 'admins'}
            onClick={() => {
              setActiveSection('admins');
              if (isMobile) {
                onClose?.();
              }
            }}
          />
          <SidebarItem
            icon={<Users />}
            label="Users"
            isActive={activeSection === 'users'}
            onClick={() => {
              setActiveSection('users');
              if (isMobile) {
                onClose?.();
              }
            }}
          />
          <SidebarItem
            icon={<Map />}
            label="Trips"
            isActive={activeSection === 'trips'}
            onClick={() => {
              setActiveSection('trips');
              if (isMobile) {
                onClose?.();
              }
            }}
          />
          <SidebarItem
            icon={<Package />}
            label="Packages"
            isActive={activeSection === 'packages'}
            onClick={() => {
              setActiveSection('packages');
              if (isMobile) {
                onClose?.();
              }
            }}
          />
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto space-y-2">
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            isActive={false}
            onClick={() => {}}
          />
          <SidebarItem
            icon={<LogOut />}
            label="Logout"
            isActive={false}
            onClick={() => {}}
          />

          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/current-user.jpg" alt="Current User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
