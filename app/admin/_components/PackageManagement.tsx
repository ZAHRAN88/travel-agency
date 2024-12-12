"use client"

import React, { useState, useEffect } from 'react';
import { 
  Package, 
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
/* import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface PackageManagementProps {
  packages: Package[];
  trips: Trip[];
  onAddPackage: (pkg: NewPackageForm) => void;
  onEditPackage: (id: number, pkg: NewPackageForm) => void;
  onDeletePackage: (id: number) => void;
}

export const PackageManagement: React.FC<PackageManagementProps> = React.memo(({ 
  packages, 
  trips,
  onAddPackage,
  onEditPackage,
  onDeletePackage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<NewPackageForm>({
    name: '',
    description: '',
    tripIds: [],
    price: '',
    discount: '',
    startDate: '',
    endDate: ''
  });

  const calculatePackagePrice = (tripIds: number[], discount: string) => {
    const totalPrice = tripIds.reduce((sum, tripId) => {
      const trip = trips.find(t => t.id === tripId);
      return sum + (trip?.price || 0);
    }, 0);
    
    const discountAmount = totalPrice * (parseFloat(discount || '0') / 100);
    return (totalPrice - discountAmount).toFixed(2);
  };

  // Update price whenever trips or discount changes
  useEffect(() => {
    const newPrice = calculatePackagePrice(formData.tripIds, formData.discount);
    setFormData(prev => ({...prev, price: newPrice}));
  }, [formData.tripIds, formData.discount]);

  const handleSubmit = () => {
    if (!formData.name || !formData.description || formData.tripIds.length < 2) {
      alert('Please fill in all fields and select at least 2 trips');
      return;
    }

    if (editingPackage) {
      onEditPackage(editingPackage.id, formData);
    } else {
      onAddPackage(formData);
    }
    
    setIsOpen(false);
    setEditingPackage(null);
    setFormData({ name: '', description: '', tripIds: [], price: '', discount: '', startDate: '', endDate: '' });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="flex items-center">
          <Package className="mr-2" /> Package Management
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Package
        </Button>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="hidden sm:table-cell">Description</TableHead>
                <TableHead className="hidden md:table-cell">Trips</TableHead>
                <TableHead className="hidden sm:table-cell">Price</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span>{pkg.name}</span>
                      <div className="flex flex-col text-sm text-muted-foreground sm:hidden">
                        <span>${pkg.price}</span>
                        <span>{pkg.trips.length} trips</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell max-w-[200px] truncate">
                    {pkg.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {pkg.trips.map(trip => (
                        <Badge key={trip.id} variant="secondary">
                          {trip.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    ${pkg.price}
                    {pkg.discount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        -{pkg.discount}%
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                      {pkg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingPackage(pkg);
                          setFormData({
                            name: pkg.name,
                            description: pkg.description,
                            tripIds: pkg.trips.map(t => t.id),
                            price: pkg.price.toString(),
                            discount: pkg.discount.toString(),
                            startDate: pkg.startDate,
                            endDate: pkg.endDate
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
                        onClick={() => onDeletePackage(pkg.id)}
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
            setFormData({ name: '', description: '', tripIds: [], price: '', discount: '', startDate: '', endDate: '' });
            setEditingPackage(null);
            setIsOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
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
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Trips</Label>
              <div className="col-span-3 space-y-2">
                {trips
                  .filter(trip => trip.status === 'active')
                  .map(trip => (
                    <div key={trip.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`trip-${trip.id}`}
                        checked={formData.tripIds.includes(trip.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              tripIds: [...prev.tripIds, trip.id]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              tripIds: prev.tripIds.filter(id => id !== trip.id)
                            }));
                          }
                        }}
                      />
                      <label htmlFor={`trip-${trip.id}`}>
                        {trip.name} - ${trip.price}
                      </label>
                    </div>
                  ))}
                {trips.filter(trip => trip.status === 'active').length === 0 && (
                  <p className="text-sm text-muted-foreground">No active trips available</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price</Label>
              <Input 
                id="price" 
                type="number"
                value={formData.price}
                disabled
                className="col-span-3 bg-muted" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount" className="text-right">Discount %</Label>
              <Input 
                id="discount" 
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) => setFormData(prev => ({
                  ...prev, 
                  discount: e.target.value
                }))}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">Start Date</Label>
              <Input 
                id="startDate" 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({...prev, startDate: e.target.value}))}
                className="col-span-3" 
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">End Date</Label>
              <Input 
                id="endDate" 
                type="date"
                value={formData.endDate}
                min={formData.startDate} // Ensure end date is after start date
                onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                className="col-span-3" 
              />
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            {editingPackage ? 'Save Changes' : 'Add Package'}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
});

PackageManagement.displayName = 'PackageManagement';
