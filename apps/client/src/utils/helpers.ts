import { DateScope } from '@/utils/types';

export const toHoursAndMinutes = (totalMinutes: number) => {
  if (totalMinutes < 60) return { hours: 0, minutes: totalMinutes };
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours: hours, minutes: minutes };
};

export const stringHoursMinutes = (totalMinutes: number) => {
  const { hours, minutes } = toHoursAndMinutes(totalMinutes);
  if (minutes < 10) return hours + ':' + '0' + minutes;
  return hours + ':' + minutes;
};

export const getYesterdayDate = (): Date => {
  const date = new Date();
  return new Date(date.setDate(date.getDate() - 1));
};

export const calculateScope = (props: DateScope) => {
  const dateScope = { ...props };

  return dateScope;
};
