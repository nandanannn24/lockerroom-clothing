import { create } from "zustand";

export interface DecalState {
  image: string | null;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export type Category = "KAOS" | "HOODIE" | "POLO SHIRT" | "";

export const PRODUCTS_2D = [
  // KAOS
  { id: "boxy", category: "KAOS", label: "Boxy", price: 159000, front: "/new-model/boxy-depan.webp", back: "/new-model/boxy-belakang.webp" },
  { id: "oversize", category: "KAOS", label: "Oversize", price: 169000, front: "/new-model/oversize-depan.webp", back: "/new-model/oversize-belakang.webp" },
  { id: "reguler", category: "KAOS", label: "Reguler", price: 149000, front: "/new-model/reguler-depan.webp", back: "/new-model/reguler-belakang.webp" },
  { id: "reguler-panjang", category: "KAOS", label: "Reguler Lengan Panjang", price: 169000, front: "/new-model/reguler-depan-panjang.webp", back: "/new-model/reguler-belakang-panjang.webp" },
  { id: "crop", category: "KAOS", label: "Croptop", price: 139000, front: "/new-model/crop-depan.webp", back: "/new-model/crop-belakang.webp" },
  // HOODIE
  { id: "hoodie-boxy", category: "HOODIE", label: "Hoodie Boxy", price: 259000, front: "/new-model/hoodie-boxy-depan.webp", back: "/new-model/hoodie-boxy-belakang.webp" },
  { id: "hoodie-regular", category: "HOODIE", label: "Hoodie Regular", price: 249000, front: "/new-model/hoodie-regular-depan.webp", back: "/new-model/hoodie-regular-belakang.webp" },
  // POLO
  { id: "polo", category: "POLO SHIRT", label: "Polo", price: 189000, front: "/new-model/polo-depan.webp", back: "/new-model/polo-belakang.webp" },
];

export interface ConfiguratorState {
  // ── Category & Product type ──
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectedModel: string;
  setSelectedModel: (id: string) => void;

  // ── Mesh color ──
  meshColor: string;
  setMeshColor: (color: string) => void;

  // ── View Side ──
  activeSide: "front" | "back";
  setActiveSide: (side: "front" | "back") => void;

  // ── Decals ──
  decals: {
    front: DecalState;
    back: DecalState;
  };
  updateDecal: (side: "front" | "back", updates: Partial<DecalState>) => void;

  // ── Product options ──
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;

  // ── Actions ──
  resetConfig: () => void;
}

const initialDecalState: DecalState = {
  image: null,
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
};

const initialState = {
  selectedCategory: "" as Category,
  selectedModel: "boxy",
  meshColor: "#ffffff",
  activeSide: "front" as const,
  decals: {
    front: { ...initialDecalState },
    back: { ...initialDecalState },
  },
  selectedSize: "M",
  quantity: 1,
};

export const useConfigStore = create<ConfiguratorState>((set) => ({
  ...initialState,

  setSelectedCategory: (cat) => set({ selectedCategory: cat }),
  setSelectedModel: (id) => set({ selectedModel: id }),
  setMeshColor: (color) => set({ meshColor: color }),
  setActiveSide: (side) => set({ activeSide: side }),
  
  updateDecal: (side, updates) =>
    set((state) => ({
      decals: {
        ...state.decals,
        [side]: { ...state.decals[side], ...updates },
      },
    })),

  setSelectedSize: (size) => set({ selectedSize: size }),
  setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),
  resetConfig: () => set(initialState),
}));
