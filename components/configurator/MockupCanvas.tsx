"use client";

import { useConfigStore, PRODUCTS_2D } from "@/lib/store";

interface MockupCanvasProps {
  forcedSide?: "front" | "back";
  hideBackground?: boolean;
}

export function MockupCanvas({ forcedSide, hideBackground = false }: MockupCanvasProps) {
  const { selectedModel, activeSide: globalActiveSide, meshColor, decals } = useConfigStore();
  
  const currentSide = forcedSide || globalActiveSide;
  const currentProduct = PRODUCTS_2D.find((p) => p.id === selectedModel) || PRODUCTS_2D[0];
  const imageSrc = currentSide === "front" ? currentProduct.front : currentProduct.back;
  const currentDecal = decals[currentSide];

  // Specific dynamic sizing to accommodate large models
  const isLargeModel = selectedModel === "hoodie-boxy" || selectedModel === "reguler-panjang" || selectedModel === "hoodie-regular";
  const containerSizingClass = isLargeModel ? "w-full max-w-[550px]" : "w-full max-w-[400px]";

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center relative touch-none ${hideBackground ? 'bg-transparent' : ''}`}>
      
      {/* ── Label (Only for export dual-checkout) ── */}
      {forcedSide && (
        <h3 className="text-[#f5c518] font-display text-4xl mb-6 uppercase tracking-widest bg-black/50 px-6 py-2 rounded-full border border-[#f5c518]/30">
          {forcedSide === 'front' ? 'Depan' : 'Belakang'}
        </h3>
      )}

      {/* ── Background Ambiance ── */}
      {!hideBackground && (
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[40vh] blur-[120px] opacity-20 pointer-events-none transition-colors duration-700" 
          style={{ backgroundColor: meshColor }} 
        />
      )}

      <div className={`relative flex items-center justify-center transition-all duration-500 ease-out ${containerSizingClass}`}>
        
        {/* ── MOCKUP CONTAINER ── */}
        <div className="relative w-full aspect-[3/4] flex items-center justify-center">

          {/* LAYER 1: BASE COLOR (Masked precisely to shirt shape) */}
          <div 
            className="absolute inset-0 z-0 transition-colors duration-300"
            style={{
              backgroundColor: meshColor,
              WebkitMaskImage: `url('${imageSrc}')`,
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskImage: `url('${imageSrc}')`,
              maskSize: "contain",
              maskPosition: "center",
              maskRepeat: "no-repeat"
            }}
          />

          {/* LAYER 2: SHADOWS/TEXTURE OVERLAY (Multiply blend mode) */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              mixBlendMode: "multiply",
              opacity: 0.95
            }}
          />

          {/* LAYER 3: HIGHLIGHTS/SHEEN (Screen/Lighten for ultra realism - optional enhancement) */}
          <div 
            className="absolute inset-0 z-20 pointer-events-none opacity-30 mix-blend-screen"
            style={{
              backgroundImage: `url('${imageSrc}')`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* LAYER 4: CUSTOM DECAL (Manual positioning, NO DRAG) */}
          {currentDecal.image && (
            <div 
              className="absolute z-30 pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${currentDecal.x}px, ${currentDecal.y}px) scale(${currentDecal.scale}) rotate(${currentDecal.rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <img 
                src={currentDecal.image} 
                alt="Custom Decal" 
                className="max-w-[200px] h-auto object-contain drop-shadow-2xl" 
                style={{ 
                  filter: 'contrast(1.05) brightness(1.02)' 
                }}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
