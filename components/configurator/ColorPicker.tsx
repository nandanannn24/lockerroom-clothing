"use client";

import { useConfigStore } from "@/lib/store";

const PRESET_COLORS = [
  "#1a1a1a", "#f5c518", "#f0f0f0", "#1a1a3e", "#4a1a1a", "#1a3d2a", "#d4a017", "#4a4a4a"
];

export function ColorPicker() {
  const meshColor = useConfigStore((s) => s.meshColor);
  const setMeshColor = useConfigStore((s) => s.setMeshColor);

  return (
    <div className="flex flex-col gap-5">
      {/* Custom Color Input - Big & Prominent */}
      <div className="flex bg-[#111] p-3 rounded-2xl border border-white/10 items-center gap-4 shadow-inner">
        {/* The swatch that actually triggers the picker */}
        <label 
          className="relative w-14 h-14 rounded-xl flex shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 transition-transform active:scale-95 group"
          style={{ backgroundColor: meshColor }}
        >
          <input
            type="color"
            value={meshColor}
            onChange={(e) => setMeshColor(e.target.value)}
            className="absolute inset-x-0 -top-4 w-full h-[200%] cursor-pointer opacity-0"
          />
          {/* Edit Icon Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </div>
        </label>
        
        {/* Hex Text */}
        <div className="flex flex-col flex-1">
          <span className="text-[10px] text-[#f5c518] font-bold uppercase tracking-widest mb-1">Custom Warna</span>
          <span className="text-white font-mono text-xl tracking-wider uppercase font-bold">{meshColor}</span>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Preset Colors */}
      <div className="flex flex-col gap-3">
         <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center">Inspirasi Populer</span>
         <div className="flex flex-wrap justify-center gap-3">
            {PRESET_COLORS.map((hex) => (
              <button
                key={hex}
                className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
                  meshColor === hex ? "border-[#f5c518] scale-110 shadow-[0_0_15px_rgba(245,197,24,0.4)]" : "border-white/10 hover:border-white/30"
                }`}
                style={{ backgroundColor: hex }}
                onClick={() => setMeshColor(hex)}
                aria-label={`Pilih warna ${hex}`}
              />
            ))}
         </div>
      </div>
    </div>
  );
}
