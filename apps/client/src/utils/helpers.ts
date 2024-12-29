import { DateScope } from '@/utils/types';
import {sessionTypeIconDictionary} from "utils/constants";

export const toHoursAndMinutes = (totalMinutes: number) => {
  if (totalMinutes < 60) return { hours: 0, minutes: totalMinutes };
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours: hours, minutes: minutes };
};

export const stringHoursMinutes = (totalMinutes: number) => {
  const { hours, minutes } = toHoursAndMinutes(totalMinutes);
  console.log(hours, minutes);
  if (minutes < 10) return hours + ':' + '0' + minutes;
  return hours + ':' + minutes;
};

export const getYesterdayDate = (): Date => {
  const date = new Date();
  return new Date(date.setDate(date.getDate() - 1));
};

// get Date object of date n (`days`) days ago
export const getPriorDate = (days: number): Date => {
  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() - days));

  return priorDate;
};

export const calculateScope = (props: DateScope) => {
  const dateScope = { ...props };

  return dateScope;
};

