import { create } from "zustand";

type List = {
  store_stock_id: string;
  quantity: number;
  unit_price: number;
  discount: number;
  weight: number;
};

type State = {
  list: List[];
  origin: string;
  destination: string;
};

type Action = {
  removeAllList: () => void;
  add: (data: List) => void;
  remove: (store_stock_id: string) => void;
  setDestination: (address_id: string) => void;
  setOrigin: (address_id: string) => void;
  listTotal: (list: State["list"]) => number;
  weight: (list: State["list"]) => number;
};

export const useCheckout = create<State & Action>((set, get) => ({
  list: [],
  origin: "",
  destination: "",
  removeAllList: () => set((s) => ({ ...s, list: [] })),
  add: (data) =>
    set(({ list }) => {
      const idx = list.findIndex((e) => e.store_stock_id == data.store_stock_id);
      console.log(idx);
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

  setDestination: (address_id) => set((s) => ({ ...s, destination: address_id })),
  setOrigin: (address_id) => set((s) => ({ ...s, origin: address_id })),

  listTotal: (list) => list.reduce((p, s) => p + s.quantity * (s.unit_price - s.discount), 0),
  weight: (list) => list.reduce((p, s) => p + s.quantity * s.weight, 0),
}));
