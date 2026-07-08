import { create } from 'zustand';

interface LocalProductsStore {
  localIds: Set<number>;
  addLocalId: (id: number) => void;
  removeLocalId: (id: number) => void;
  isLocalId: (id: number) => boolean;
}

export const useLocalProductsStore = create<LocalProductsStore>((set, get) => ({
  localIds: new Set<number>(),
  addLocalId: (id: number) =>
    set((state) => {
      const newSet = new Set(state.localIds);
      newSet.add(id);
      return { localIds: newSet };
    }),
  removeLocalId: (id: number) =>
    set((state) => {
      const newSet = new Set(state.localIds);
      newSet.delete(id);
      return { localIds: newSet };
    }),
  isLocalId: (id: number) => get().localIds.has(id),
}));
