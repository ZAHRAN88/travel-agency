 interface NewTripForm {
    name: string;
    destination: string;
    date: string;
    price: string;
  }
  
  interface Trip {
    id: number;
    name: string;
    destination: string;
    date: string;
    price: number;
    status: 'upcoming' | 'ongoing' | 'completed';
  }
  interface TripsManagementProps {
    trips: Trip[];
    onAddTrip: (trip: NewTripForm) => void;
    onEditTrip: (id: number, trip: NewTripForm) => void;  // Add this line
  }