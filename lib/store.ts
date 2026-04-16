import { create } from "zustand";

export interface DecalState {
  image: string | null;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export const PRODUCTS_2D = [
  { id: "boxy", label: "Boxy", price: 159000, front: "/new-model/boxy-depan.webp", back: "/new-model/boxy-belakang.webp" },
  { id: "crop", label: "Crop", price: 139000, front: "/new-model/crop-depan.webp", back: "/new-model/crop-belakang.webp" },
  { id: "hoodie-boxy", label: "Hoodie Boxy", price: 259000, front: "/new-model/hoodie-boxy-depan.webp", back: "/new-model/hoodie-boxy-belakang.webp" },
  { id: "hoodie-regular", label: "Hoodie Regular", price: 249000, front: "/new-model/hoodie-regular-depan.webp", back: "/new-model/hoodie-regular-belakang.webp" },
  { id: "oversize", label: "Oversize", price: 169000, front: "/new-model/oversize-depan.webp", back: "/new-model/oversize-belakang.webp" },
  { id: "polo", label: "Polo", price: 189000, front: "/new-model/polo-depan.webp", back: "/new-model/polo-belakang.webp" },
  { id: "reguler", label: "Reguler", price: 149000, front: "/new-model/reguler-depan.webp", back: "/new-model/reguler-belakang.webp" },
  { id: "reguler-panjang", label: "Reguler Lengan Panjang", price: 169000, front: "/new-model/reguler-depan-panjang.webp", back: "/new-model/reguler-belakang-panjang.webp" },
];

export interface ConfiguratorState {
  // ── Product type ──
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
  scale: 1, // 1 is default scale in framer-motion typically
  rotation: 0,
};

const initialState = {
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
