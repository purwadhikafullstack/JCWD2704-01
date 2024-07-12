/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 140,
  plugins: ["prettier-plugin-tailwindcss"],
  // tailwindcss
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme", "clsx", "tw"],
};
