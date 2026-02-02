import { useState, Fragment, useRef } from "react";
import { StepArc } from "../ui/StepArc";
import { TopNav } from "../ui/TopNav";
import { ProductBottleDisplay } from "../ui/ProductBottleDisplay";
import { ProductDetailsPanel } from "../ui/ProductDetailsPanel";

export type StepId =
  | "grip"
  | "purge"
  | "assault"
  | "clarity"
  | "surface"
  | "revive"
  | "lustre"
  | "shield"
  | "x-dirty"
  | "x-extract"
  | "x-blaq"
  | "x-fal"
  | "x-field"
  | "z-fortify";

export type Step = {
  id: StepId;
  number: string;
  label: string;
  category: string;
  subtitle?: string;
  bullets?: string[];
};

export type StepData = {
  name: string;
  productCode: string;
  shortDescription: string;
  whatItIs: string;
  capabilities: string;
  strategicIntent: string;
  deploymentProtocol: string;
  goodToKnow: string;
};

export const STEP_DATA: Record<StepId, StepData> = {
  purge: {
    name: "PURGE",
    productCode: "RG-STEP02-PURGE",
    shortDescription: "Loosens organic contamination.",
    whatItIs: "Pre-clean and APC.",
    capabilities: "Softens bug residue.",
    strategicIntent: "Controlled decontamination.",
    deploymentProtocol: "Dilute, apply, rinse.",
    goodToKnow: "Excellent first strike.",
  },
  assault: {
    name: "ASSAULT",
    productCode: "RG-STEP03-ASSAULT",
    shortDescription: "High-lubricity shampoo.",
    whatItIs: "Premium wash solution.",
    capabilities: "Dense foam, strong lubrication.",
    strategicIntent: "Predictable washing.",
    deploymentProtocol: "Foam cannon, wash, rinse.",
    goodToKnow: "pH-neutral.",
  },
  clarity: {
    name: "CLARITY",
    productCode: "RG-STEP04-CLARITY",
    shortDescription: "Streak-free glass clarity.",
    whatItIs: "Fast-evaporating glass cleaner.",
    capabilities: "Removes oils and films.",
    strategicIntent: "Clear glass improves safety.",
    deploymentProtocol: "Spray, wipe, buff.",
    goodToKnow: "Use dedicated towels.",
  },
  surface: {
    name: "SURFACE",
    productCode: "RG-STEP05-SURFACE",
    shortDescription: "Cleans interior plastics.",
    whatItIs: "Interior surface cleaner.",
    capabilities: "Removes oils and dust.",
    strategicIntent: "Clean, not dressed.",
    deploymentProtocol: "Spray on towel, wipe.",
    goodToKnow: "This is a cleaner.",
  },
  grip: {
    name: "GRIP",
    productCode: "RG-STEP01-GRIP",
    shortDescription: "Resets tire and rubber surfaces.",
    whatItIs: "A dedicated tire and rubber cleaner.",
    capabilities: "Removes old dressings and oxidation.",
    strategicIntent: "Establishes clean foundation.",
    deploymentProtocol: "Apply to tire, agitate, rinse.",
    goodToKnow: "For rubber only.",
  },
  lustre: {
    name: "LUSTRE",
    productCode: "RG-STEP07-LUSTRE",
    shortDescription: "Boosts gloss and slickness.",
    whatItIs: "Spray wax enhancer.",
    capabilities: "Enhances depth.",
    strategicIntent: "Immediate visual payoff.",
    deploymentProtocol: "Spray, spread, buff.",
    goodToKnow: "Safe for coatings.",
  },
  revive: {
    name: "REVIVE",
    productCode: "RG-STEP06-REVIVE",
    shortDescription: "Protects interior surfaces.",
    whatItIs: "Non-greasy protectant.",
    capabilities: "UV protection.",
    strategicIntent: "Extends material life.",
    deploymentProtocol: "Apply, spread, wipe.",
    goodToKnow: "Not for leather.",
  },
  shield: {
    name: "SHIELD",
    productCode: "RG-STEP08-SHIELD",
    shortDescription: "Hydrophobic protection.",
    whatItIs: "Spray-applied protective.",
    capabilities: "Water repellency.",
    strategicIntent: "Accessible protection.",
    deploymentProtocol: "Apply, spread, buff.",
    goodToKnow: "Maintenance topper.",
  },
  "x-dirty": {
    name: "X-DIRTY DETAILS",
    productCode: "RG-X-DIRTY",
    shortDescription: "Heavy soil pre-treatment.",
    whatItIs: "Concentrated pre-soak for heavily soiled vehicles.",
    capabilities: "Breaks down thick mud, road grime, heavy organic contamination.",
    strategicIntent: "Prepare heavily soiled vehicles for safe washing.",
    deploymentProtocol: "Apply to dry surface, dwell 3-5 min, rinse thoroughly.",
    goodToKnow: "Use before PURGE on extreme dirt.",
  },
  "x-extract": {
    name: "X-EXTRACTION",
    productCode: "RG-X-EXTRACT",
    shortDescription: "Organic stain removal.",
    whatItIs: "Bio-enzymatic stain remover.",
    capabilities: "Eliminates organic stains, odors, and residues.",
    strategicIntent: "Remove biological contamination from fabrics and surfaces.",
    deploymentProtocol: "Apply directly, agitate gently, extract or rinse.",
    goodToKnow: "Safe for interior fabrics and carpets.",
  },
  "x-blaq": {
    name: "X-BLAQOUT",
    productCode: "RG-X-BLAQ",
    shortDescription: "Adhesive and tar removal.",
    whatItIs: "Solvent-based adhesive remover.",
    capabilities: "Dissolves tar, sap, stickers, adhesive residue.",
    strategicIntent: "Remove stubborn bonded contaminants without damage.",
    deploymentProtocol: "Apply to contamination, dwell briefly, wipe clean.",
    goodToKnow: "Test on inconspicuous area first.",
  },
  "x-fal": {
    name: "X-FALLOUT",
    productCode: "RG-X-FAL",
    shortDescription: "Iron decontamination.",
    whatItIs: "pH-balanced iron remover.",
    capabilities: "Dissolves embedded ferrous particles from paint and wheels.",
    strategicIntent: "Remove invisible iron contamination before protection.",
    deploymentProtocol: "Spray on cool surface, watch color change, rinse thoroughly.",
    goodToKnow: "Critical before wax or coating application.",
  },
  "x-field": {
    name: "X-FIELD WASH",
    productCode: "RG-X-FIELD",
    shortDescription: "Rinseless wash concentrate.",
    whatItIs: "Waterless/rinseless wash solution.",
    capabilities: "Cleans, lubricates, and protects in one step without water.",
    strategicIntent: "Enable washing when water access is limited.",
    deploymentProtocol: "Dilute per instructions, spray and wipe with quality towels.",
    goodToKnow: "Replaces GRIP and PURGE steps in field conditions.",
  },
  "z-fortify": {
    name: "Z-FORTIFY",
    productCode: "RG-Z-FORTIFY",
    shortDescription: "Advanced protective barrier treatment.",
    whatItIs: "High-performance ceramic coating booster.",
    capabilities: "Enhanced durability, extreme hydrophobic properties, UV resistance.",
    strategicIntent: "Maximum protection for demanding conditions.",
    deploymentProtocol: "Apply after SHIELD, spread evenly, allow to cure.",
    goodToKnow: "Optional enhancement after Step 08.",
  },
};

export const STEPS: Step[] = [
  { id: "grip", number: "01", label: "GRIP", category: "TIRE & RUBBER" },
  { id: "purge", number: "02", label: "PURGE", category: "PRE-WASH" },
  { id: "assault", number: "03", label: "ASSAULT", category: "CONTACT WASH" },
  { id: "clarity", number: "04", label: "CLARITY", category: "GLASS" },
  { id: "surface", number: "05", label: "SURFACE", category: "INTERIOR CLEAN" },
  { id: "revive", number: "06", label: "REVIVE", category: "INTERIOR SHIELD" },
  { id: "lustre", number: "07", label: "LUSTRE", category: "GLOSS BOOST" },
  { id: "shield", number: "08", label: "SHIELD", category: "PROTECTION" },
];

export function Home() {
  // Default active product: GRIP (01)
  const [activeStepId, setActiveStepId] = useState<StepId>("grip");
  
  // Ref for Product Information Zone to scroll into view
  const productInfoZoneRef = useRef<HTMLDivElement>(null);
  
  // Check if current selection is an intervention product
  const isInterventionProduct = [
    "x-dirty",
    "x-extract",
    "x-blaq",
    "x-fal",
    "x-field",
    "z-fortify",
  ].includes(activeStepId);
  
  // Check if it's a pre-wash intervention (should appear between step 1 and 2)
  const isPreWashIntervention = ["x-dirty", "x-extract", "x-blaq"].includes(activeStepId);
  
  // Check if it's X-Fallout (should appear between step 3 and 4)
  const isXFallout = activeStepId === "x-fal";
  
  // Check if it's X-Field Wash (should replace steps 1 and 2)
  const isXFieldWash = activeStepId === "x-field";
  
  // Check if it's Z-Fortify (should appear after step 8)
  const isZFortify = activeStepId === "z-fortify";
  
  // Get the product name to display in step navigation
  const activeProductName = isInterventionProduct
    ? STEP_DATA[activeStepId]?.name || ""
    : null;
  
  // Determine intervention product position for StepArc
  const interventionProductForArc = isInterventionProduct
    ? (() => {
        if (isPreWashIntervention) {
          return { id: activeStepId, name: activeProductName || "", position: 'between-1-2' as const };
        } else if (isXFallout) {
          return { id: activeStepId, name: activeProductName || "", position: 'between-3-4' as const };
        } else if (isXFieldWash) {
          return { id: activeStepId, name: activeProductName || "", position: 'replaces-1-2' as const };
        } else if (isZFortify) {
          return { id: activeStepId, name: activeProductName || "", position: 'after-8' as const };
        }
        return null;
      })()
    : null;
  
  // Handle step click with scroll to Product Information Zone
  const handleStepClick = (id: StepId) => {
    setActiveStepId(id);
    // Scroll to Product Information Zone after a short delay to allow state update
    setTimeout(() => {
      productInfoZoneRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      <TopNav />

      {/* Add padding-top to account for larger overlapping logo */}
      <main className="mx-auto max-w-[1920px] px-3 sm:px-4 md:px-6 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 relative z-0">
        {/* Step Arc Progress Bar with Banner-Product background */}
        <div className="mb-10">
          <StepArc
            steps={STEPS}
            activeId={activeStepId}
            onStepClick={handleStepClick}
            interventionProduct={interventionProductForArc}
          />
        </div>

        {/* Heading Banner */}
        <div className="mb-4 sm:mb-5 md:mb-6 rounded-lg bg-black/40 border border-[#333333] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-[0.16em] text-white uppercase">
            The Riot Line™
          </div>
          <div className="text-xs sm:text-sm font-medium italic tracking-[0.1em] text-white/75 uppercase">
            Core 8-Step Workflow
          </div>
        </div>

        {/* Product menu links - 8 products styled as arrow tabs */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 sm:pb-5 md:pb-6 py-2 sm:py-3 md:py-4">
          {/* Show X-Field Wash at the start if selected */}
          {isXFieldWash && activeProductName && (
            <button
              onClick={() => handleStepClick(activeStepId)}
              type="button"
              className="flex flex-shrink-0 items-stretch focus:outline-none"
            >
              <span
                className="relative z-10 flex items-center rounded-l-full px-6 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
              >
                {activeProductName}
              </span>
              {/* Arrow tip */}
              <span
                className="relative -ml-px w-4 bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35] [clip-path:polygon(0_0,100%_50%,0_100%)]"
              />
            </button>
          )}
          
          {STEPS.map((step) => {
            const active = activeStepId === step.id;
            const isStep01 = step.id === "grip";
            const isStep02 = step.id === "purge";
            const isStep03 = step.id === "assault";
            const isStep08 = step.id === "shield";
            
            // Hide steps 1 and 2 when X-Field Wash is selected
            if (isXFieldWash && (isStep01 || isStep02)) {
              return null;
            }
            
            return (
              <Fragment key={step.id}>
                <button
                  onClick={() => handleStepClick(step.id)}
                  type="button"
                  className="flex flex-shrink-0 items-stretch focus:outline-none"
                >
                  <span
                    className={`relative z-10 flex items-center rounded-l-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase ${
                      active
                        ? "bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
                        : "bg-black/50 text-white/75 border border-[#333333] border-r-0 hover:border-[#FF6B35]/50 hover:text-[#FF6B35]"
                    }`}
                  >
                    <span className="mr-0.5 sm:mr-1">{step.number}</span>
                    {step.label}
                  </span>
                  {/* Arrow tip */}
                  <span
                    className={`relative -ml-px w-2 sm:w-3 md:w-4 ${active ? "bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35]" : "bg-black/50 border-t border-b border-r border-[#333333]"} [clip-path:polygon(0_0,100%_50%,0_100%)]`}
                  />
                </button>
                
                {/* Insert intervention product button between step 01 and step 02 */}
                {isStep01 && isPreWashIntervention && activeProductName && (
                  <button
                    onClick={() => handleStepClick(activeStepId)}
                    type="button"
                    className="flex flex-shrink-0 items-stretch focus:outline-none"
                  >
                    <span
                      className="relative z-10 flex items-center rounded-l-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
                    >
                      {activeProductName}
                    </span>
                    {/* Arrow tip */}
                    <span
                      className="relative -ml-px w-2 sm:w-3 md:w-4 bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35] [clip-path:polygon(0_0,100%_50%,0_100%)]"
                    />
                  </button>
                )}
                
                {/* Insert X-Fallout button between step 03 and step 04 */}
                {isStep03 && isXFallout && activeProductName && (
                  <button
                    onClick={() => handleStepClick(activeStepId)}
                    type="button"
                    className="flex flex-shrink-0 items-stretch focus:outline-none"
                  >
                    <span
                      className="relative z-10 flex items-center rounded-l-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
                    >
                      {activeProductName}
                    </span>
                    {/* Arrow tip */}
                    <span
                      className="relative -ml-px w-2 sm:w-3 md:w-4 bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35] [clip-path:polygon(0_0,100%_50%,0_100%)]"
                    />
                  </button>
                )}
                
                {/* Insert Z-Fortify button after step 08 */}
                {isStep08 && isZFortify && activeProductName && (
                  <button
                    onClick={() => handleStepClick(activeStepId)}
                    type="button"
                    className="flex flex-shrink-0 items-stretch focus:outline-none"
                  >
                    <span
                      className="relative z-10 flex items-center rounded-l-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-4 text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
                    >
                      {activeProductName}
                    </span>
                    {/* Arrow tip */}
                    <span
                      className="relative -ml-px w-2 sm:w-3 md:w-4 bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35] [clip-path:polygon(0_0,100%_50%,0_100%)]"
                    />
                  </button>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Two sections: Left (Product Display) and Right (Product Details) */}
        {/* Mobile: Stacked (Product Details first, then Intervention Zone below) */}
        {/* Larger screens: Side by side (Intervention Zone left 30%, Product Details right 70%) */}
        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-10 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-stretch">
          {/* Left Section: Product Bottle Display - 30% width (appears second on mobile, first on large screens) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <ProductBottleDisplay 
              activeStepId={activeStepId}
              onProductClick={handleStepClick}
            />
          </div>

          {/* Right Section: Product Details - 70% width (appears first on mobile, second on large screens) */}
          <div ref={productInfoZoneRef} className="lg:col-span-7 overflow-visible order-1 lg:order-2">
            <ProductDetailsPanel 
              activeStepId={activeStepId} 
              onStepClick={handleStepClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
