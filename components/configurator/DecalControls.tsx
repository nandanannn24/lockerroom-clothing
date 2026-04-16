"use client";

import { useConfigStore } from "@/lib/store";

export function DecalControls() {
  const { activeSide, decals, updateDecal } = useConfigStore();
  const currentDecal = decals[activeSide];

  if (!currentDecal.image) return null;

  return (
    <div className="flex flex-col gap-4 mt-2 p-4 bg-[#111] border border-white/10 rounded-2xl shadow-inner animate-fade-in-up">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-[#f5c518] font-bold uppercase tracking-widest shrink-0 shadow-[0_0_10px_rgba(245,197,24,0.2)] bg-[#f5c518]/10 px-2 py-0.5 rounded">Transformasi</span>
        <button 
          onClick={() => updateDecal(activeSide, { x: 0, y: 0, scale: 1, rotation: 0 })}
          className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* XY POSITIONS D-PAD STYLE COMBINED */}
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs text-gray-300 font-medium tracking-wide">Posisi X (Kiri/Kanan)</label>
              <span className="text-xs text-gray-500 font-mono w-12 text-right">{Math.round(currentDecal.x)}</span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="1"
              value={currentDecal.x}
              onChange={(e) => updateDecal(activeSide, { x: parseFloat(e.target.value) })}
              className="w-full accent-[#f5c518] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs text-gray-300 font-medium tracking-wide">Posisi Y (Atas/Bawah)</label>
              <span className="text-xs text-gray-500 font-mono w-12 text-right">{Math.round(currentDecal.y)}</span>
            </div>
            <input
              type="range"
              min="-250"
              max="250"
              step="1"
              value={currentDecal.y}
              onChange={(e) => updateDecal(activeSide, { y: parseFloat(e.target.value) })}
              className="w-full accent-[#f5c518] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        {/* SCALE & ROTATION */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs text-gray-300 font-medium tracking-wide">Ukuran</label>
              <span className="text-xs text-gray-500 font-mono">{(currentDecal.scale * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.01"
              value={currentDecal.scale}
              onChange={(e) => updateDecal(activeSide, { scale: parseFloat(e.target.value) })}
              className="w-full accent-[#f5c518] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-xs text-gray-300 font-medium tracking-wide">Rotasi</label>
              <span className="text-xs text-gray-500 font-mono">{currentDecal.rotation}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={currentDecal.rotation}
              onChange={(e) => updateDecal(activeSide, { rotation: parseFloat(e.target.value) })}
              className="w-full accent-[#f5c518] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

      </div>

      <p className="text-[9px] text-gray-500 italic mt-1 text-center font-medium">Gunakan slider untuk hasil render yang lebih smooth dan presisi tinggi.</p>
    </div>
  );
}
