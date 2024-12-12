"use client"

import React, { useState } from 'react';
import { Map, Plus, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TripsManagementProps {
  trips: Trip[];
  onAddTrip: (trip: NewTripForm) => void;
  onEditTrip: (id: number, trip: NewTripForm) => void;
  onDeleteTrip: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export const TripsManagement: React.FC<TripsManagementProps> = React.memo(({ 
  trips, 
  onAddTrip,
  onEditTrip,
  onDeleteTrip,
  onToggleStatus
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState<NewTripForm>({
    name: '',
    destination: '',
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
                  <TableCell className="hidden sm:table-cell">${trip.price}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onToggleStatus(trip.id)}
                      className={`${
                        trip.status === 'active' 
                          ? 'text-green-600 hover:text-green-700' 
                          : 'text-red-600 hover:text-red-700'
                      }`}
                    >
                      {trip.status === 'active' ? (
                        <>
                          <ToggleRight className="h-4 w-4 mr-2" />
                          Active
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-4 w-4 mr-2" />
                          Inactive
                        </>
                      )}
                    </Button>
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
            setFormData({ name: '', destination: '', price: '' });
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
              setFormData({ name: '', destination: '', price: '' });
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