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

export const mockTrips = [
  {
    id: 1,
    name: 'Summer Beach Tour',
    destination: 'Sharm El Sheikh',
    date: '2024-07-15',
    price: 1500,
    status: 'upcoming' as const
  },
  {
    id: 2,
    name: 'Pyramids Adventure',
    destination: 'Giza',
    date: '2024-08-20',
    price: 800,
    status: 'upcoming' as const
  },
  {
    id: 3,
    name: 'Nile Cruise',
    destination: 'Luxor & Aswan',
    date: '2024-06-10',
    price: 2500,
    status: 'ongoing' as const
  }
];

export const mockPackages = [
  {
    id: 1,
    name: 'Egypt Explorer Package',
    description: 'Experience the best of Egypt with this comprehensive package including pyramids and Nile cruise.',
    trips: [mockTrips[1], mockTrips[2]],
    price: 3000,
    discount: 15,
    status: 'active' as const
  },
  {
    id: 2,
    name: 'Summer Special',
    description: 'Perfect summer combination of beach and culture.',
    trips: [mockTrips[0], mockTrips[1]],
    price: 2000,
    discount: 10,
    status: 'active' as const
  }
];
