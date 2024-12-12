"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Modal } from '../components/ui/modal';

interface PackagesGridProps {
  packages: Package[];
}

const PackagesGrid: React.FC<PackagesGridProps> = ({ packages }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {packages.map(pkg => (
        <Card key={pkg.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            {pkg.imgUrl && (
              <Image width={300} height={300} src={pkg.imgUrl} alt={pkg.name} className="w-full h-48 object-cover rounded-t-md" />
            )}
            <CardTitle className="text-lg font-bold">{pkg.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Description: {pkg.description}</p>
            <p className="text-sm text-muted-foreground">Price: ${pkg.price.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${pkg.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {pkg.status}
            </p>
            <Button onClick={() => handleOpenModal(pkg)} className="mt-2">View Details</Button>
          </CardContent>
        </Card>
      ))}

      {/* Modal for Package Details */}
      {selectedPackage && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <h2 className="text-xl font-bold">{selectedPackage.name}</h2>
            <Image width={300} height={300} src={selectedPackage.imgUrl!} alt={selectedPackage.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <p className="text-sm text-muted-foreground">Description: {selectedPackage.description}</p>
            <p className="text-sm text-muted-foreground">Price: ${selectedPackage.price.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${selectedPackage.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {selectedPackage.status}
            </p>
            <Button onClick={handleCloseModal} className="mt-4">Close</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PackagesGrid;
