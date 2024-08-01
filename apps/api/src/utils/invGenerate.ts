import { nanoid } from 'nanoid';

export const invGenerate = (userID: string) => {
  const newDate = new Date();
  const date = newDate.toISOString().replace(/T.*|Z/g, '').replace(/-/g, '');
  return `INV-${date}-${userID}-${nanoid(5)}`.toUpperCase();
};
