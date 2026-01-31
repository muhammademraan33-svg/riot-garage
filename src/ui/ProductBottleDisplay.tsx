import type { StepId } from "../pages/Home";

type InterventionProduct = {
  id: StepId;
  name: string;
  description: string;
  group: string;
};

const INTERVENTION_PRODUCTS: InterventionProduct[] = [
  {
    id: "x-dirty",
    name: "X-DIRTY DETAILS",
    description: "Heavy Soil Pre-Treatment",
    group: "Pre-Wash Interventions → Waypoint: Between GRIP & PURGE",
  },
  {
    id: "x-extract",
    name: "X-EXTRACTION",
    description: "Organic Stain Removal",
    group: "Pre-Wash Interventions → Waypoint: Between GRIP & PURGE",
  },
  {
    id: "x-blaq",
    name: "X-BLAQOUT",
    description: "Adhesive Removal",
    group: "Pre-Wash Interventions → Waypoint: Between GRIP & PURGE",
  },
  {
    id: "x-fal",
    name: "X-FALLOUT",
    description: "Iron Decontamination",
    group: "Post-Wash Decontamination → Waypoint: Between ASSAULT & CLARITY",
  },
  {
    id: "x-field",
    name: "X-FIELD WASH",
    description: "Rinseless / Waterless",
    group: "Field Wash Alternative → Bypasses GRIP + PURGE",
  },
  {
    id: "z-fortify",
    name: "Z-FORTIFY",
    description: "Protective Barrier Treatment",
    group: "Post-Protection Enhancement → After SHIELD (Step 08)",
  },
];

export function ProductBottleDisplay({
  activeStepId,
  onProductClick,
}: {
  activeStepId: StepId;
  onProductClick?: (id: StepId) => void;
}) {
  // Group products by their group label
  const groupedProducts = INTERVENTION_PRODUCTS.reduce((acc, product) => {
    if (!acc[product.group]) {
      acc[product.group] = [];
    }
    acc[product.group].push(product);
    return acc;
  }, {} as Record<string, InterventionProduct[]>);

  return (
    <div className="relative rounded-2xl border border-[#333333] bg-black/40 p-8 min-h-[600px] flex flex-col h-full overflow-visible">
      {/* Zone Label - Above content */}
      <div className="absolute -top-3 left-6 z-30">
        <div className="bg-black/80 border border-[#333333] px-4 py-1 rounded">
          <div className="text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
            Intervention Zone™
          </div>
        </div>
      </div>

      {/* Intervention Products */}
      <div className="relative z-10 flex flex-col gap-4 flex-1 overflow-y-auto">
        {Object.entries(groupedProducts).map(([groupLabel, products]) => (
          <div key={groupLabel} className="flex flex-col gap-3">
            {/* Group Label */}
            <div className="text-[8px] font-bold tracking-[0.12em] text-[#D4A574] uppercase text-center mb-1">
              {groupLabel}
            </div>
            
            {/* Products in this group */}
            <div className="flex flex-wrap gap-2 justify-center">
              {products.map((product) => {
                const isActive = activeStepId === product.id;
                return (
                  <button
                    key={product.id}
                    onClick={() => onProductClick?.(product.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300 min-h-[90px] min-w-[110px] ${
                      isActive
                        ? "bg-gradient-to-br from-[#FF6B35]/30 to-[#FF6B35]/20 border-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.5)]"
                        : "bg-black/50 border-[#333333] hover:border-[#FF6B35]/50 hover:bg-black/70"
                    }`}
                  >
                    <div
                      className={`text-base font-black mb-1 ${
                        isActive ? "text-[#FF6B35]" : "text-white/80"
                      }`}
                    >
                      {product.name}
                    </div>
                    <div
                      className={`text-[9px] font-semibold tracking-[0.1em] text-center ${
                        isActive ? "text-white/90" : "text-white/60"
                      }`}
                    >
                      {product.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
