"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useConfigStore, PRODUCTS_2D } from "@/lib/store";

export function MockupCanvas() {
  const { selectedModel, activeSide, meshColor, decals, updateDecal } = useConfigStore();
  
  const product = PRODUCTS_2D.find((p) => p.id === selectedModel);
  // Default to a fallback if not found, to avoid crash. The user must provide these images.
  const imageUrl = product ? product[activeSide] : "";
  const currentDecal = decals[activeSide];

  // A ref for the bounding box
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center pt-24 md:pt-0">
      {/* Container that represents the shirt area */ }
      <div 
        ref={constraintsRef}
        className="relative w-full max-w-[500px] aspect-[3/4] mx-auto overflow-hidden pointer-events-auto"
        id="mockup-canvas-capture"
      >
        {/* Layer 1 & 2: Color Mask & Webp Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            {/* Color Base Filter */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundColor: meshColor,
                  maskImage: `url(${imageUrl})`,
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                  WebkitMaskImage: `url(${imageUrl})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                }}
            />
            {/* Shading Multiply */}
            <img 
              src={imageUrl} 
              alt="Shirt Mockup" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-multiply opacity-90 block" 
            />
        </div>

        {/* Layer 3: Decal Area */}
        {currentDecal.image && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.div
              drag
              dragConstraints={constraintsRef}
              dragMomentum={false}
              className="absolute cursor-grab active:cursor-grabbing origin-center pointer-events-auto filter drop-shadow-md"
              style={{
                width: "200px", // Base size, scaled afterwards
                x: currentDecal.x,
                y: currentDecal.y,
                scale: currentDecal.scale,
                rotate: currentDecal.rotation,
              }}
              onDrag={(e, info) => {
                updateDecal(activeSide, { 
                  x: currentDecal.x + info.delta.x, 
                  y: currentDecal.y + info.delta.y 
                });
              }}
            >
              <img 
                src={currentDecal.image} 
                alt="Decal" 
                className="w-full h-auto object-contain pointer-events-none"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
