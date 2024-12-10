"use client"

import React, { useState, useCallback } from 'react';
import { 
  Users, 
  UserPlus, 
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
  DialogTitle, 
  DialogTrigger 
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AdminManagementProps {
  admins: Admin[];
  onAddAdmin: (admin: NewAdminForm) => void;
}

export const AdminManagement: React.FC<AdminManagementProps> = React.memo(({ 
  admins, 
  onAddAdmin 
}) => {
  const [newAdmin, setNewAdmin] = useState<NewAdminForm>({
    name: '',
    email: '',
    role: ''
  });

  const handleAddAdmin = useCallback(() => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.role) {
      alert('Please fill in all fields');
      return;
    }

    onAddAdmin(newAdmin);
    
    // Reset form
    setNewAdmin({ name: '', email: '', role: '' });
  }, [newAdmin, onAddAdmin]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle className="flex items-center">
          <Users className="mr-2" /> Admin Management
        </CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-4 w-4" /> Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-sm">Name</Label>
                <Input 
                  id="name" 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin(prev => ({...prev, name: e.target.value}))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-sm">Email</Label>
                <Input 
                  id="email" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin(prev => ({...prev, email: e.target.value}))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right text-sm">Role</Label>
                <Input 
                  id="role" 
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin(prev => ({...prev, role: e.target.value}))}
                  className="col-span-3" 
                />
              </div>
            </div>
            <Button onClick={handleAddAdmin} className="w-full">Add Admin</Button>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Admin</TableHead>
              <TableHead className="min-w-[200px] hidden md:table-cell">Email</TableHead>
              <TableHead className="min-w-[150px] hidden sm:table-cell">Role</TableHead>
              <TableHead className="min-w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={admin.avatarUrl} alt={admin.name} />
                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{admin.name}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">{admin.email}</TableCell>
                <TableCell className="hidden sm:table-cell">{admin.role}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
});

AdminManagement.displayName = 'AdminManagement';