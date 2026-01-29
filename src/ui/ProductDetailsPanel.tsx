import type { StepId } from "../pages/Home";
import { STEPS, STEP_DATA } from "../pages/Home";

// Background images for each step - for now using the same image, later can be customized
const STEP_BACKGROUND_IMAGES: Record<StepId, string> = {
  purge: "/step-purge.png",
  assault: "/step-assault.png",
  clarity: "/step-clarity.png",
  surface: "/step-surface.png",
  grip: "/step-grip.png",
  lustre: "/step-lustre.png",
  "ops-center": "/step-ops-center.png",
  shield: "/step-shield.png",
};

export function ProductDetailsPanel({ activeStepId }: { activeStepId: StepId }) {
  const activeStep = STEPS.find((s) => s.id === activeStepId) ?? STEPS[0];
  const stepData = STEP_DATA[activeStepId];
  const backgroundImage = STEP_BACKGROUND_IMAGES[activeStepId];

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-[#333333] h-auto w-full transition-all duration-500 bg-[#0A0A0A]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        minHeight: "400px",
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />

      {/* Content overlaid on background */}
      <div className="relative z-10 flex flex-col p-4">
        {/* Header - Top Left */}
        <div className="mb-3">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full border-2 border-[#FF6B35] bg-black/40 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-black tracking-wider text-[#FF6B35]">
                {activeStep.number}
              </span>
            </div>
            <div>
              <div className="text-3xl font-black tracking-[0.16em] text-white">
                {stepData.name}
              </div>
              <div className="text-sm font-semibold tracking-wider text-white/60 mt-1">
                {stepData.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* CAPABILITIES - Full width box below header */}
        <div className="mb-3 bg-black/30 p-3 rounded-lg">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-2">
            CAPABILITIES
          </div>
          <ul className="space-y-1.5 text-sm text-white/85">
            {stepData.capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#FF6B35] mt-1">✓</span>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* STRATEGIC INTENT, DEPLOYMENT PROTOCOL, and Button - Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start">
          {/* STRATEGIC INTENT - Left */}
          <div className="md:col-span-4 bg-black/30 p-3 rounded-lg">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-2">
              STRATEGIC INTENT
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {stepData.strategicIntent}
            </p>
          </div>

          {/* DEPLOYMENT PROTOCOL - Middle */}
          <div className="md:col-span-4 bg-black/40 p-3 rounded-lg">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-2">
              DEPLOYMENT PROTOCOL
            </div>
            <ul className="space-y-1.5 text-sm text-white/70">
              {stepData.deploymentProtocol.map((protocol, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#FF6B35] mt-1.5 h-1.5 w-1.5 rounded-full bg-[#FF6B35] flex-shrink-0" />
                  <span>{protocol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ADD TO GO-BAG Button - Right, aligned to bottom of boxes */}
          <div className="md:col-span-4 flex justify-end items-end">
            <button className="rounded-lg bg-[#FF6B35] px-6 py-3 text-base font-bold tracking-wider text-white shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:bg-[#FF8C5A] transition-colors whitespace-nowrap">
              + ADD TO GO-BAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
