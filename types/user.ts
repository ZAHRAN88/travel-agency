interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

 interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

 interface User {
  id: number;
  name: string;
  email: string;
  registered: string;
  avatarUrl: string;
}

 interface NewAdminForm {
  name: string;
  email: string;
  role: string;
}
type ActiveSection = 'dashboard' | 'admins' | 'users' | 'trips'| 'packages';

interface DashboardProps {
  users: User[];
  trips: Trip[];
  admins: Admin[];
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}