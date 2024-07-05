import { generate } from 'voucher-code-generator';

export const generateReferral = () => {
  const referral = generate({
    pattern: '####-####',
    count: 1,
    charset: 'alphanumeric',
  });

  return referral[0];
};

export const generateSlug = (str: string): string => {
  return str
    .toLocaleLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
