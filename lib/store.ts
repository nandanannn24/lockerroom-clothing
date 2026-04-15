import { create } from "zustand";

// ─── 3D Configurator State ──────────────────────────────────────────

export type ProductType = "tshirt" | "hoodie";

export interface ConfiguratorState {
  // ── Product type ──
  productType: ProductType;
  setProductType: (type: ProductType) => void;

  // ── Mesh color ──
  meshColor: string;
  setMeshColor: (color: string) => void;

  // ── Decal image ──
  decalImage: string | null;
  setDecalImage: (img: string | null) => void;

  // ── Decal transforms ──
  decalPosition: [number, number];
  setDecalPosition: (pos: [number, number]) => void;
  decalScale: number;
  setDecalScale: (scale: number) => void;
  decalRotation: number;
  setDecalRotation: (rot: number) => void;

  // ── Product options ──
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  quantity: number;
  setQuantity: (qty: number) => void;

  // ── Actions ──
  resetConfig: () => void;
}

const initialState = {
  productType: "tshirt" as ProductType,
  meshColor: "#1a1a1a",
  decalImage: null,
  decalPosition: [0, 0.05] as [number, number],
  decalScale: 0.15,
  decalRotation: 0,
  selectedSize: "M",
  quantity: 1,
};

export const useConfigStore = create<ConfiguratorState>((set) => ({
  ...initialState,

  setProductType: (type) => set({ productType: type }),
  setMeshColor: (color) => set({ meshColor: color }),
  setDecalImage: (img) => set({ decalImage: img }),
  setDecalPosition: (pos) => set({ decalPosition: pos }),
  setDecalScale: (scale) => set({ decalScale: scale }),
  setDecalRotation: (rot) => set({ decalRotation: rot }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setQuantity: (qty) => set({ quantity: Math.max(1, qty) }),
  resetConfig: () => set(initialState),
}));
