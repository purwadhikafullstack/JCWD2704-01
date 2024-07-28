export const toIDR = (price: number = 0) =>
  price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
