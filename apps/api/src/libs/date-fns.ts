import { addMonths } from 'date-fns';

export const formatNewDate = (months: number) => {
  const nowDate = new Date();
  const newDate = addMonths(nowDate, months);

  return newDate;
};
