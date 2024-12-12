interface Package {
  id: number;
  name: string;
  description: string;
  trips: Trip[];
  startDate: string;
  endDate: string;
  price: number;
  discount: number;
  status: 'active' | 'inactive';
  imgUrl?:string
}
  
   interface NewPackageForm {
  name: string;
  description: string;
  tripIds: number[];
  startDate: string;
  endDate: string;
  price: string;
  discount: string;
  imgUrl?:string

  }