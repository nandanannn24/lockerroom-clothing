"use client";

import { useConfigStore } from "@/lib/store";

export function DecalControls() {
  const decalImage = useConfigStore((s) => s.decalImage);
  const decalPosition = useConfigStore((s) => s.decalPosition);
  const setDecalPosition = useConfigStore((s) => s.setDecalPosition);
  const decalScale = useConfigStore((s) => s.decalScale);
  const setDecalScale = useConfigStore((s) => s.setDecalScale);
  const decalRotation = useConfigStore((s) => s.decalRotation);
  const setDecalRotation = useConfigStore((s) => s.setDecalRotation);

  if (!decalImage) return null;

  return (
    <div className="flex flex-col gap-4 mt-2 bg-black/40 border border-white/5 rounded-xl p-4">
      <h3 className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
        </svg>
        Atur Posisi
      </h3>

      {/* Position X */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-gray-300">
          <label htmlFor="decal-pos-x">Horizontal</label>
          <span className="font-mono text-gray-500">{decalPosition[0].toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="decal-pos-x"
          min="-0.4"
          max="0.4"
          step="0.01"
          value={decalPosition[0]}
          onChange={(e) => setDecalPosition([parseFloat(e.target.value), decalPosition[1]])}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f5c518]"
        />
      </div>

      {/* Position Y */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-gray-300">
          <label htmlFor="decal-pos-y">Vertikal</label>
          <span className="font-mono text-gray-500">{decalPosition[1].toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="decal-pos-y"
          min="-0.4"
          max="0.4"
          step="0.01"
          value={decalPosition[1]}
          onChange={(e) => setDecalPosition([decalPosition[0], parseFloat(e.target.value)])}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f5c518]"
        />
      </div>

      {/* Scale */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-gray-300">
          <label htmlFor="decal-scale">Ukuran</label>
          <span className="font-mono text-gray-500">{(decalScale * 100).toFixed(0)}%</span>
        </div>
        <input
          type="range"
          id="decal-scale"
          min="0.05"
          max="0.5"
          step="0.01"
          value={decalScale}
          onChange={(e) => setDecalScale(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f5c518]"
        />
      </div>

      {/* Rotation */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-gray-300">
          <label htmlFor="decal-rotation">Rotasi</label>
          <span className="font-mono text-gray-500">{decalRotation.toFixed(0)}°</span>
        </div>
        <input
          type="range"
          id="decal-rotation"
          min="0"
          max="360"
          step="1"
          value={decalRotation}
          onChange={(e) => setDecalRotation(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f5c518]"
        />
      </div>
    </div>
  );
}
