"use client"

import React from 'react';
import { 
  Users,
  Map,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockPackages, mockTrips, mockUsers } from '@/mockData';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const Dashboard: React.FC<DashboardProps> = React.memo(({ 
  users = mockUsers, 
  trips = mockTrips, 
  admins = [],
  packages = mockPackages 
}) => {
  const activeTrips = trips.filter(trip => trip.status === 'active').length;
  const activePackages = packages.filter(pkg => pkg.status === 'active').length;

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Active registered users"
        />
        
        <StatCard
          title="Total Trips"
          value={trips.length}
          icon={<Map className="h-4 w-4 text-muted-foreground" />}
          description="All time trips"
        />
        
        <StatCard
          title="Active Trips"
          value={activeTrips}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          description="Currently active trips"
        />
        
        <StatCard
          title="Active Packages"
          value={activePackages}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Currently active packages"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-xl">Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {users.slice(-5).map(user => (
                <div key={user.id} className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Registered on {new Date(user.registered).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl">Active Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {packages
                .filter(pkg => pkg.status === 'active')
                .slice(0, 5)
                .map(pkg => (
                  <div key={pkg.id} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Map className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{pkg.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(pkg.startDate).toLocaleDateString()} - {new Date(pkg.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';