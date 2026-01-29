import { useState } from "react";
import type { StepId } from "../pages/Home";

type ProductImage = "PURGE" | "GRIP" | "XBlackqout";

const PRODUCT_IMAGES: Record<ProductImage, string> = {
  PURGE: "/PURGE.png",
  GRIP: "/GRIP.png",
  XBlackqout: "/XBlackqout.png",
};

export function ProductBottleDisplay({ activeStepId: _activeStepId }: { activeStepId: StepId }) {
  const [selectedProduct, setSelectedProduct] = useState<ProductImage>("PURGE");

  return (
    <div className="relative rounded-2xl border border-[#333333] bg-black/40 p-8 min-h-[600px] flex flex-col h-full">
      {/* Glowing orange gear-like circular design background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2">
          {/* Concentric circles with dashed/glowing effect */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-[#FF6B35]/30" 
            style={{
              borderStyle: "dashed",
              borderDasharray: "20 10",
            } as React.CSSProperties} 
          />
          <div 
            className="absolute inset-8 rounded-full border-2 border-[#FF6B35]/20" 
            style={{
              borderStyle: "dashed",
              borderDasharray: "15 8",
            } as React.CSSProperties} 
          />
          <div 
            className="absolute inset-16 rounded-full border border-[#FF6B35]/10" 
            style={{
              borderStyle: "dashed",
              borderDasharray: "10 5",
            } as React.CSSProperties} 
          />
          {/* Gear teeth effect - more prominent */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            const x = 250 + 200 * Math.cos(rad);
            const y = 250 + 200 * Math.sin(rad);
            return (
              <div
                key={i}
                className="absolute h-10 w-2 rounded-full bg-[#FF6B35]/25"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  boxShadow: "0 0 10px rgba(255,107,53,0.4)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Product image positioned absolutely to match circle center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <img
            src={PRODUCT_IMAGES[selectedProduct]}
            alt={selectedProduct}
            className="h-96 w-auto object-contain transition-all duration-300"
            style={{
              filter: "drop-shadow(0 0 30px rgba(255,107,53,0.6)) drop-shadow(0 0 60px rgba(255,107,53,0.3))",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* RIOT LINE™ heading - top left */}
        <div className="text-base font-semibold tracking-[0.24em] text-white mb-2">
          RIOT LINE™
        </div>

        {/* Spacer for product image area */}
        <div className="flex-1 relative min-h-[400px]">
        </div>

        {/* X-DIRTY DETAILS section with clickable images */}
        <div className="mt-auto pt-6">
          <div className="text-center text-sm font-semibold tracking-wider text-white mb-2">
            X-DIRTY DETAILS
          </div>
          <div className="text-center text-xs tracking-wide text-white/70 mb-6">
            RELEGION FREE PFREI
          </div>
          
          {/* Three clickable bottles with orange glow effect */}
          <div className="flex justify-center gap-4">
            {(Object.keys(PRODUCT_IMAGES) as ProductImage[]).map((product) => (
              <button
                key={product}
                onClick={() => setSelectedProduct(product)}
                className={`relative transition-all duration-300 ${
                  selectedProduct === product
                    ? "scale-110"
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  filter: selectedProduct === product 
                    ? "drop-shadow(0 0 15px rgba(255,107,53,0.8)) drop-shadow(0 0 30px rgba(255,107,53,0.4))"
                    : "drop-shadow(0 0 8px rgba(255,107,53,0.3))",
                }}
              >
                <img
                  src={PRODUCT_IMAGES[product]}
                  alt={product}
                  className="h-32 w-auto object-contain cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
