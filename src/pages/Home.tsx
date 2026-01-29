import { useState } from "react";
import { StepArc } from "../ui/StepArc";
import { TopNav } from "../ui/TopNav";
import { ProductBottleDisplay } from "../ui/ProductBottleDisplay";
import { ProductDetailsPanel } from "../ui/ProductDetailsPanel";

export type StepId =
  | "purge"
  | "assault"
  | "clarity"
  | "surface"
  | "grip"
  | "lustre"
  | "ops-center"
  | "shield";

export type Step = {
  id: StepId;
  number: string;
  label: string;
  subtitle?: string;
  bullets?: string[];
};

export type StepData = {
  name: string;
  description: string;
  subtitle: string;
  capabilities: string[];
  strategicIntent: string;
  deploymentProtocol: string[];
};

export const STEP_DATA: Record<StepId, StepData> = {
  purge: {
    name: "PURGE",
    description: "Powerful Foaming Cyclol Pre-Wash",
    subtitle: "MET FEENITER",
    capabilities: [
      "Thoroughly foams & breaks down dirt",
      "Loosens contaminant safely",
      "Resets the surface for the next stages",
    ],
    strategicIntent: "Trose cere Delauntitin or fout the mission ate 6 as60. Daunies tid onrraces.",
    deploymentProtocol: [
      "Snereachy Oatoo ese od Frarming PURGE",
      "Fliecte peted force anig",
      "Reet th carica",
      "Pleccion o womcer wash",
    ],
  },
  assault: {
    name: "ASSAULT",
    description: "Aggressive Surface Treatment",
    subtitle: "MET FEENITER",
    capabilities: [
      "Deep penetration and cleaning",
      "Removes stubborn contaminants",
      "Prepares surface for next phase",
    ],
    strategicIntent: "Advanced assault protocol for maximum surface preparation.",
    deploymentProtocol: [
      "Apply ASSAULT treatment",
      "Allow proper dwell time",
      "Rinse thoroughly",
      "Proceed to next stage",
    ],
  },
  clarity: {
    name: "CLARITY",
    description: "Crystal Clear Surface Enhancement",
    subtitle: "MET FEENITER",
    capabilities: [
      "Enhances surface clarity",
      "Removes water spots and streaks",
      "Creates pristine finish",
    ],
    strategicIntent: "Achieve maximum clarity and visual perfection.",
    deploymentProtocol: [
      "Apply CLARITY solution",
      "Work in sections",
      "Buff to perfection",
      "Inspect for clarity",
    ],
  },
  surface: {
    name: "SURFACE",
    description: "Premium Surface Preparation",
    subtitle: "MET FEENITER",
    capabilities: [
      "Perfect surface preparation",
      "Removes all imperfections",
      "Creates ideal base layer",
    ],
    strategicIntent: "Prepare the perfect foundation for protection.",
    deploymentProtocol: [
      "Clean surface thoroughly",
      "Apply SURFACE treatment",
      "Allow to cure",
      "Ready for protection",
    ],
  },
  grip: {
    name: "GRIP",
    description: "Enhanced Adhesion Formula",
    subtitle: "MET FEENITER",
    capabilities: [
      "Improves product adhesion",
      "Creates strong bond",
      "Enhances durability",
    ],
    strategicIntent: "Ensure maximum grip and adhesion for lasting protection.",
    deploymentProtocol: [
      "Apply GRIP formula",
      "Work into surface",
      "Allow bonding time",
      "Verify adhesion",
    ],
  },
  lustre: {
    name: "LUSTRE",
    description: "Ultimate Shine Enhancement",
    subtitle: "MET FEENITER",
    capabilities: [
      "Creates deep, rich shine",
      "Enhances color depth",
      "Provides premium finish",
    ],
    strategicIntent: "Achieve the ultimate lustre and visual depth.",
    deploymentProtocol: [
      "Apply LUSTRE treatment",
      "Polish to perfection",
      "Inspect finish quality",
      "Final shine application",
    ],
  },
  "ops-center": {
    name: "OPS CENTER",
    description: "Operational Control & Assessment",
    subtitle: "MET FEENITER",
    capabilities: [
      "Comprehensive quality check",
      "Surface assessment",
      "Intervention zone activation",
    ],
    strategicIntent: "Central command for quality control and intervention decisions.",
    deploymentProtocol: [
      "Conduct full assessment",
      "Evaluate surface condition",
      "Determine intervention needs",
      "Proceed with protocol",
    ],
  },
  shield: {
    name: "SHIELD",
    description: "Ultimate Protection Layer",
    subtitle: "MET FEENITER",
    capabilities: [
      "Long-lasting protection",
      "Water repellency",
      "UV and environmental shield",
    ],
    strategicIntent: "Final protective layer for maximum durability and defense.",
    deploymentProtocol: [
      "Apply SHIELD protection",
      "Ensure even coverage",
      "Allow proper curing",
      "Final inspection complete",
    ],
  },
};

export const STEPS: Step[] = [
  { id: "purge", number: "01", label: "PURGE" },
  { id: "assault", number: "02", label: "ASSAULT" },
  { id: "clarity", number: "03", label: "CLARITY" },
  { id: "surface", number: "04", label: "SURFACE" },
  { id: "grip", number: "05", label: "GRIP" },
  { id: "lustre", number: "06", label: "LUSTRE" },
  { id: "ops-center", number: "07", label: "OPS CENTER" },
  { id: "shield", number: "08", label: "SHIELD" },
];

export function Home() {
  // Default active product: PURGE (01)
  const [activeStepId, setActiveStepId] = useState<StepId>("purge");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      <TopNav />

      {/* Add padding-top to account for larger overlapping logo */}
      <main className="mx-auto max-w-[1920px] px-6 pt-20 pb-10 relative z-0">
        {/* Step Arc Progress Bar with Banner-Product background */}
        <div className="mb-10">
          <StepArc
            steps={STEPS}
            activeId={activeStepId}
            onStepClick={(id) => setActiveStepId(id)}
          />
        </div>

        {/* Product menu links - 8 products styled as arrow tabs */}
        <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-3">
          {STEPS.map((step) => {
            const active = activeStepId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                type="button"
                className="flex flex-shrink-0 items-stretch focus:outline-none"
              >
                <span
                  className={`relative z-10 flex items-center rounded-l-full px-4 py-2 text-[11px] font-semibold tracking-[0.24em] uppercase ${
                    active
                      ? "bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35] border-r-0"
                      : "bg-black/50 text-white/75 border border-[#333333] border-r-0 hover:border-[#FF6B35]/50 hover:text-[#FF6B35]"
                  }`}
                >
                  <span className="mr-1">{step.number}</span>
                  {step.label}
                </span>
                {/* Arrow tip */}
                <span
                  className={`relative -ml-px w-4 ${active ? "bg-[#FF6B35]/25 border-t border-b border-r border-[#FF6B35]" : "bg-black/50 border-t border-b border-r border-[#333333]"} [clip-path:polygon(0_0,100%_50%,0_100%)]`}
                />
              </button>
            );
          })}
        </div>

        {/* Two sections: Left (Product Display) and Right (Product Details) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-10 gap-8 items-stretch">
          {/* Left Section: Product Bottle Display - 30% width */}
          <div className="lg:col-span-3">
            <ProductBottleDisplay activeStepId={activeStepId} />
          </div>

          {/* Right Section: Product Details - 70% width */}
          <div className="lg:col-span-7">
            <ProductDetailsPanel activeStepId={activeStepId} />
          </div>
        </div>
      </main>
    </div>
  );
}
