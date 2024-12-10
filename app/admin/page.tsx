"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import { Sidebar } from './_components/Sidebar';
import { AdminManagement } from './_components/AdminManagement';
import { UserManagement } from './_components/UserManagement';
import { TripsManagement } from './_components/TripsManagement';
import { Dashboard } from './_components/Dashboard';
import { PackageManagement } from './_components/PackageManagement';
import { mockAdmins, mockTrips, mockUsers, mockPackages } from '@/mockData';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { getTripStatus } from '@/utils/tripStatus';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [packages, setPackages] = useState<Package[]>(mockPackages);

  const handleAddAdmin = useCallback((newAdmin: NewAdminForm) => {
    const newAdminEntry: Admin = {
      ...newAdmin,
      id: admins.length + 1,
      avatarUrl: `/avatars/${newAdmin.name.toLowerCase().replace(' ', '-')}.jpg`
    };
    setAdmins(prev => [...prev, newAdminEntry]);
  }, [admins]);

  const handleAddTrip = useCallback((newTrip: NewTripForm) => {
    setTrips(prev => [...prev, {
      id: prev.length + 1,
      ...newTrip,
      price: parseFloat(newTrip.price),
      status: getTripStatus(newTrip.date)
    }]);
  }, []);

  const handleEditTrip = useCallback((id: number, updatedTrip: NewTripForm) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id ? {
        ...trip,
        ...updatedTrip,
        price: parseFloat(updatedTrip.price),
        status: getTripStatus(updatedTrip.date)
      } : trip
    ));
  }, []);

  const handleDeleteTrip = useCallback((id: number) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  }, []);

  const handleAddPackage = useCallback((newPackage: NewPackageForm) => {
    setPackages(prev => [...prev, {
      id: prev.length + 1,
      ...newPackage,
      trips: trips.filter(trip => newPackage.tripIds.includes(trip.id)),
      price: parseFloat(newPackage.price),
      discount: parseFloat(newPackage.discount),
      status: 'active'
    }]);
  }, [trips]);

  const handleEditPackage = useCallback((id: number, updatedPackage: NewPackageForm) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id ? {
        ...pkg,
        ...updatedPackage,
        trips: trips.filter(trip => updatedPackage.tripIds.includes(trip.id)),
        price: parseFloat(updatedPackage.price),
        discount: parseFloat(updatedPackage.discount)
      } : pkg
    ));
  }, [trips]);

  const handleDeletePackage = useCallback((id: number) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard users={users} trips={trips} admins={admins} />;
      case 'admins':
        return (
          <AdminManagement 
            admins={admins} 
            onAddAdmin={handleAddAdmin}
          />
        );
      case 'users':
        return <UserManagement users={users} />;
      case 'trips':
        return (
          <TripsManagement 
            trips={trips} 
            onAddTrip={handleAddTrip} 
            onEditTrip={handleEditTrip}
            onDeleteTrip={handleDeleteTrip}
          />
        );
      case 'packages':
        return (
          <PackageManagement 
            packages={packages}
            trips={trips}
            onAddPackage={handleAddPackage}
            onEditPackage={handleEditPackage}
            onDeletePackage={handleDeletePackage}
          />
        );
      default:
        return <Dashboard users={users} trips={trips} admins={admins} />;
    }
  };

  const updateTripStatuses = useCallback(() => {
    setTrips(prev => prev.map(trip => ({
      ...trip,
      status: getTripStatus(trip.date)
    })));
  }, []);

  useEffect(() => {
    updateTripStatuses();
    const interval = setInterval(updateTripStatuses, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, [updateTripStatuses]);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`
          fixed top-4 left-4 z-50
          ${isMobile ? 'block' : 'hidden'}
          ${isSidebarOpen ? 'hidden' : 'block'}
        `}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className={`
        flex-1 overflow-auto transition-all duration-300
        ${isSidebarOpen && !isMobile ? 'ml-5' : 'ml-0'}
      `}>
        <ScrollArea className="h-full">
          <div className="p-4">
            {renderContent()}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default AdminDashboard;