interface NewTripForm {
  name: string;
  destination: string;
  price: string;  // Keep as string in form
  imgUrl?:string
}

interface Trip {
  id: number;
  name: string;
  destination: string;
  description?:string;
  price: number;
  status: 'active' | 'inactive';
  imgUrl?:string
}
interface TripsManagementProps {
  trips: Trip[];
  onAddTrip: (trip: NewTripForm) => void;
  onEditTrip: (id: number, trip: NewTripForm) => void;  // Add this line
}