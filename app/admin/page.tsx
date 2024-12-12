"use client"

import React, { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Sidebar } from './_components/Sidebar';
import { Dashboard } from './_components/Dashboard';
import { AdminManagement } from './_components/AdminManagement';
import { UserManagement } from './_components/UserManagement';
import { TripsManagement } from './_components/TripsManagement';
import { PackageManagement } from './_components/PackageManagement';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { mockAdmins, mockUsers, mockTrips, mockPackages } from '@/mockData';
import { getPackageStatus } from '@/utils/packageStatus';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const [admins, setAdmins] = useState(mockAdmins);
  const [users, setUsers] = useState(mockUsers);
  const [trips, setTrips] = useState(mockTrips);
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
      status: 'active'
    }]);
  }, []);

  const handleEditTrip = useCallback((id: number, updatedTrip: NewTripForm) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id ? {
        ...trip,
        ...updatedTrip,
        price: parseFloat(updatedTrip.price)
      } : trip
    ));
  }, []);

  const handleDeleteTrip = useCallback((id: number) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  }, []);

  const handleToggleTripStatus = useCallback((id: number) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id 
        ? { ...trip, status: trip.status === 'active' ? 'inactive' : 'active' }
        : trip
    ));
  }, []);

  const handleAddPackage = useCallback((newPackage: NewPackageForm) => {
    setPackages(prev => [...prev, {
      id: prev.length + 1,
      ...newPackage,
      trips: trips.filter(trip => newPackage.tripIds.includes(trip.id)),
      price: parseFloat(newPackage.price),
      discount: parseFloat(newPackage.discount),
      status: getPackageStatus(newPackage.startDate, newPackage.endDate)
    }]);
  }, [trips]);

  const handleEditPackage = useCallback((id: number, updatedPackage: NewPackageForm) => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === id ? {
        ...pkg,
        ...updatedPackage,
        trips: trips.filter(trip => updatedPackage.tripIds.includes(trip.id)),
        price: parseFloat(updatedPackage.price),
        discount: parseFloat(updatedPackage.discount),
        status: getPackageStatus(updatedPackage.startDate, updatedPackage.endDate)
      } : pkg
    ));
  }, [trips]);

  const handleDeletePackage = useCallback((id: number) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard users={users} trips={trips} admins={admins} packages={packages} />;
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
            onToggleStatus={handleToggleTripStatus}
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
        return <Dashboard users={users} trips={trips} admins={admins} packages={packages} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        className={`
          fixed top-4 left-4 z-50 md:hidden
          ${isSidebarOpen ? 'hidden' : 'block'}
        `}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex min-h-screen">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen && !isMobile ? 'ml-5' : 'ml-0'}
          min-h-screen
        `}>
          <div className="container mx-auto px-4 py-8">
            <div className="rounded-lg bg-background">
              <ScrollArea className="h-[calc(100vh-2rem)]">
                <div className="p-6">
                  {renderContent()}
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>

      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;