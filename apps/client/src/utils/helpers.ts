export const toHoursAndMinutes = (totalMinutes: number) => {
  if (totalMinutes < 60) return { hours: 0, minutes: totalMinutes };
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours: hours, minutes: minutes };
};

export const stringHoursMinutes = (totalMinutes: number) => {
  const { hours, minutes } = toHoursAndMinutes(totalMinutes);
  if (minutes < 10) return hours + ':' + '0' + minutes;
  return minutes + ':' + hours;
};
