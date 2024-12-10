"use client"

import React, { useState } from 'react';
import { 
  Map, 
  Plus, 
  Edit, 
  Trash2 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TripsManagementProps {
  trips: Trip[];
  onAddTrip: (trip: NewTripForm) => void;
  onEditTrip: (id: number, trip: NewTripForm) => void;
  onDeleteTrip: (id: number) => void;
}

const getTripStatus = (date: string): Trip['status'] => {
  const tripDate = new Date(date);
  const today = new Date();
  
  // Set times to midnight for accurate date comparison
  tripDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  // Add 7 days to trip date for "ongoing" status duration
  const endDate = new Date(tripDate);
  endDate.setDate(endDate.getDate() + 7);
  
  if (tripDate > today) {
    return 'upcoming';
  } else if (tripDate <= today && today <= endDate) {
    return 'ongoing';
  } else {
    return 'completed';
  }
};

export const TripsManagement: React.FC<TripsManagementProps> = React.memo(({ 
  trips, 
  onAddTrip,
  onEditTrip,
  onDeleteTrip
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState<NewTripForm>({
    name: '',
    destination: '',
    date: '',
    price: ''
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="flex items-center">
          <Map className="mr-2" /> Trip Management
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Trip
        </Button>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="hidden sm:table-cell">Destination</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span>{trip.name}</span>
                      <div className="flex flex-col text-sm text-muted-foreground sm:hidden">
                        <span>{trip.destination}</span>
                        <span>${trip.price}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{trip.destination}</TableCell>
                  <TableCell className="hidden md:table-cell">{trip.date}</TableCell>
                  <TableCell className="hidden sm:table-cell">${trip.price}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${trip.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}
                    >
                      {trip.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingTrip(trip);
                          setFormData({
                            name: trip.name,
                            destination: trip.destination,
                            date: trip.date,
                            price: trip.price.toString()
                          });
                          setIsOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onDeleteTrip(trip.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setFormData({ name: '', destination: '', date: '', price: '' });
            setEditingTrip(null);
            setIsOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingTrip ? 'Edit Trip' : 'Add New Trip'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right">Destination</Label>
              <Input 
                id="destination" 
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({...prev, destination: e.target.value}))}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input 
                id="date" 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input 
                id="price" 
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                className="col-span-3" 
              />
            </div>
          </div>
          <Button 
            onClick={() => {
              if (editingTrip) {
                onEditTrip(editingTrip.id, formData);
              } else {
                onAddTrip(formData);
              }
              setIsOpen(false);
              setEditingTrip(null);
              setFormData({ name: '', destination: '', date: '', price: '' });
            }} 
            className="w-full"
          >
            {editingTrip ? 'Save Changes' : 'Add Trip'}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
});

TripsManagement.displayName = 'TripsManagement';