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
  users, 
  trips, 
  admins 
}) => {
  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming').length;
  const ongoingTrips = trips.filter(trip => trip.status === 'ongoing').length;

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
          title="Upcoming Trips"
          value={upcomingTrips}
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          description="Scheduled trips"
        />
        
        <StatCard
          title="Ongoing Trips"
          value={ongoingTrips}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          description="Currently active trips"
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
            <CardTitle className="text-xl">Upcoming Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {trips
                .filter(trip => trip.status === 'upcoming')
                .slice(0, 5)
                .map(trip => (
                  <div key={trip.id} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Map className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{trip.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {trip.destination} - {new Date(trip.date).toLocaleDateString()}
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