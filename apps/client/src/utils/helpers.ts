export const toHoursAndMinutes = (totalMinutes: number) => {
  if (totalMinutes < 60) return totalMinutes;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes < 10) return hours + ':' + '0' + minutes;
  return hours + ':' + minutes;
};
