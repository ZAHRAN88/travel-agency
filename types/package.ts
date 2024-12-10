 interface Package {
    id: number;
    name: string;
    description: string;
    trips: Trip[];
    price: number;
    discount: number;
    status: 'active' | 'inactive';
  }
  
   interface NewPackageForm {
    name: string;
    description: string;
    tripIds: number[];
    price: string;
    discount: string;
  }