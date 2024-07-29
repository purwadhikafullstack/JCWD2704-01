export const invGenerate = (userID: string) => {
  return `INV-${userID}${new Date().getTime()}`;
};
