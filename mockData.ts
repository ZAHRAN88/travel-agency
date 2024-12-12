export const mockAdmins = [
  { 
    id: 1, 
    name: 'Assem Omar', 
    email: 'assemomar@bfcai.eg', 
    role: 'Super Admin',
    avatarUrl: '/avatars/emma.jpg'
  },
  { 
    id: 2, 
    name: 'Mohamed Zahran', 
    email: 'mohamedzahrann0@gmail.com', 
    role: 'Super Admin',
    avatarUrl: '/avatars/emma.jpg'
  }
];

export const mockUsers = [
  {
    id: 1,
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    registered: '2024-03-10',
    avatarUrl: '/avatars/ahmed.jpg'
  },
  {
    id: 2,
    name: 'Sara Hassan',
    email: 'sara.hassan@example.com',
    registered: '2024-04-05',
    avatarUrl: '/avatars/sara.jpg'
  },
  {
    id: 3,
    name: 'Mohamed Youssef',
    email: 'mohamed.youssef@example.com',
    registered: '2024-05-12',
    avatarUrl: '/avatars/mohamed.jpg'
  },
  {
    id: 4,
    name: 'Mona Nabil',
    email: 'mona.nabil@example.com',
    registered: '2024-06-18',
    avatarUrl: '/avatars/mona.jpg'
  },
  {
    id: 5,
    name: 'Omar Fathy',
    email: 'omar.fathy@example.com',
    registered: '2024-07-22',
    avatarUrl: '/avatars/omar.jpg'
  }
];

export const mockTrips: Trip[] = [
  {
    id: 1,
    name: 'Summer Beach Tour',
    destination: 'Sharm El Sheikh',
    price: 1500,
    status: 'active',
    imgUrl: '/images/summer-beach-tour.jpg', // Example image URL
    description: 'Experience the ultimate summer getaway with our Summer Beach Tour in Sharm El Sheikh. Enjoy pristine beaches, crystal-clear waters, and a vibrant nightlife in one of Egypt\'s top holiday destinations.'
  },
  {
    id: 2,
    name: 'Pyramids Adventure',
    destination: 'Giza',
    price: 800,
    status: 'active',
    imgUrl: '/images/pyramids-adventure.jpg', // Example image URL
    description: 'Embark on an unforgettable journey through history with our Pyramids Adventure in Giza. Explore the ancient pyramids, the Sphinx, and immerse yourself in the rich cultural heritage of Egypt.'
  },
  {
    id: 3,
    name: 'Nile Cruise',
    destination: 'Luxor & Aswan',
    price: 2500,
    status: 'active',
    imgUrl: '/images/nile-cruise.jpg', // Example image URL
    description: 'Sail along the majestic Nile River with our Nile Cruise, visiting the historic cities of Luxor and Aswan. Discover ancient temples, tombs, and enjoy luxurious accommodations and amenities on board.'
  }
  ,
  {
    id: 3,
    name: 'Nile Cruise',
    destination: 'Luxor & Aswan',
    price: 2500,
    status: 'active',
    imgUrl: '/images/nile-cruise.jpg', // Example image URL
    description: 'Sail along the majestic Nile River with our Nile Cruise, visiting the historic cities of Luxor and Aswan. Discover ancient temples, tombs, and enjoy luxurious accommodations and amenities on board.'
  },
  {
    id: 3,
    name: 'Nile Cruise',
    destination: 'Luxor & Aswan',
    price: 2500,
    status: 'active',
    imgUrl: '/images/nile-cruise.jpg', // Example image URL
    description: 'Sail along the majestic Nile River with our Nile Cruise, visiting the historic cities of Luxor and Aswan. Discover ancient temples, tombs, and enjoy luxurious accommodations and amenities on board.'
  }
  
];

export const mockPackages = [
  {
    id: 1,
    name: 'Egypt Explorer Package',
    description: 'Experience the best of Egypt with this comprehensive package including pyramids and Nile cruise.',
    trips: [mockTrips[1], mockTrips[2]] as Trip[],
    price: 3000,
    discount: 15,
    status: 'active' as const,
    startDate: '2024-07-01',
    endDate: '2024-07-15'
  },
  {
    id: 2,
    name: 'Summer Special',
    description: 'Perfect summer combination of beach and culture.',
    trips: [mockTrips[0], mockTrips[1]] as Trip[],
    price: 2000,
    discount: 10,
    status: 'active' as const,
    startDate: '2024-08-01',
    endDate: '2024-08-15'
  }
];
