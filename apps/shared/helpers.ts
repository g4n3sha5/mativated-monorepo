// get Date object of date n (`days`) days ago
export const getPriorDate = (days: number): Date => {
  const today = new Date();
  return new Date(new Date().setDate(today.getDate() - days));
};
