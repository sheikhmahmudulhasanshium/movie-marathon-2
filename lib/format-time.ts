export const formatTime = (totalMinutes: number): string => {
    if (totalMinutes === 0) return 'Time not available';
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    // Handle cases where minutes is 0
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };
  