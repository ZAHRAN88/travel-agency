"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Modal } from '../components/ui/modal';
import Image from 'next/image';

interface TripsGridProps {
  trips: Trip[];
}

const TripsGrid: React.FC<TripsGridProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrip(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {trips.map(trip => (
        <Card key={trip.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            {trip.imgUrl && (
              <Image src={trip.imgUrl} alt={trip.name} width={300} height={300} className="w-full h-48 object-cover rounded-t-md" />
            )}
            <CardTitle className="text-lg font-bold">{trip.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Destination: {trip.destination}</p>
            <p className="text-sm text-muted-foreground">Price: ${trip.price.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${trip.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {trip.status}
            </p>
            <Button onClick={() => handleOpenModal(trip)} className="mt-2">View Details</Button>
          </CardContent>
        </Card>
      ))}

      {selectedTrip && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div className="p-4">
            <h2 className="text-xl my-3 font-bold">{selectedTrip.name}</h2>
            <Image src={selectedTrip.imgUrl!} width={300} height={300} alt={selectedTrip.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <p className='text-sm w-64'><span className='text-sm text-muted-foreground'>Desc :</span> {selectedTrip.description!}</p>
            <p className="text-sm text-muted-foreground">Destination: {selectedTrip.destination}</p>
            <p className="text-sm text-muted-foreground">Price: ${selectedTrip.price.toFixed(2)}</p>
            <p className={`text-sm font-semibold ${selectedTrip.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {selectedTrip.status}
            </p>
            <Button onClick={handleCloseModal} className="mt-4">Close</Button>
            <Button variant={'secondary'}  className="mt-4 mx-2">Book Now</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TripsGrid;