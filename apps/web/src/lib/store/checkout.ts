import { create } from "zustand";

type List = {
  store_stock_id: string;
  quantity: number;
  unit_price: number;
  weight: number;
};

type State = {
  list: List[];
  shipCost: number;
  origin: string;
  destination: string;
};

type Action = {
  add: (data: List) => void;
  remove: (store_stock_id: string) => void;
  listTotal: (list: State["list"]) => number;
  weight: (list: State["list"]) => number;
};

export const useCheckout = create<State & Action>((set, get) => ({
  list: [],
  shipCost: 0,
  origin: "",
  destination: "",
  add: (data) =>
    set(({ list }) => {
      const idx = list.findIndex((e) => e.store_stock_id);
      if (idx !== -1) {
        const newList = [...list];
        newList[idx] = { ...data };
        return { list: newList };
      }
      return { list: [...list, data] };
    }),

  remove: (store_stock_id) =>
    set(({ list }) => ({
      list: list.filter((e) => e.store_stock_id != store_stock_id),
    })),

  listTotal: (list) => list.reduce((p, s) => p + s.quantity * s.unit_price, 0),

  weight: (list) => list.reduce((p, s) => p + s.quantity * s.weight, 0),
}));
