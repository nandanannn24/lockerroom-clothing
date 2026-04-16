"use client";

import { useConfigStore } from "@/lib/store";

export function ColorPicker() {
  const meshColor = useConfigStore((s) => s.meshColor);
  const setMeshColor = useConfigStore((s) => s.setMeshColor);

  return (
    <div className="flex flex-col gap-5">
      {/* Custom Color Input - Big & Prominent Unrestricted */}
      <div className="flex bg-[#111] p-3 rounded-2xl border border-white/10 items-center gap-4 shadow-inner">
        {/* The swatch that actually triggers the picker */}
        <label 
          className="relative w-16 h-16 rounded-xl flex shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 transition-transform active:scale-95 group"
          style={{ backgroundColor: meshColor }}
        >
          <input
            type="color"
            value={meshColor}
            onChange={(e) => setMeshColor(e.target.value)}
            className="absolute inset-x-0 -top-4 w-full h-[200%] cursor-pointer opacity-0"
            title="Pilih Warna Sablon"
          />
          {/* Edit Icon Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
          </div>
        </label>
        
        {/* Hex Text & Guiding Title */}
        <div className="flex flex-col flex-1">
          <span className="text-[10px] text-[#f5c518] font-bold uppercase tracking-widest mb-1">Custom Bebas</span>
          <span className="text-white font-mono text-2xl tracking-wider uppercase font-bold">{meshColor}</span>
        </div>
      </div>
    </div>
  );
}
