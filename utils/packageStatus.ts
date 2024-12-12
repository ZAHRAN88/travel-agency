export const getPackageStatus = (startDate: string, endDate: string): Package['status'] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  return today <= end ? 'active' : 'inactive';
}; 