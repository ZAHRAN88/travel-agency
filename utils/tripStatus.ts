export const getTripStatus = (date: string): Trip['status'] => {
  const tripDate = new Date(date);
  const today = new Date();
  
  tripDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  const endDate = new Date(tripDate);
  endDate.setDate(endDate.getDate() + 7);
  
  if (tripDate > today) return 'upcoming';
  if (tripDate <= today && today <= endDate) return 'ongoing';
  return 'completed';
}; 