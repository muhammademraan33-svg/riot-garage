import { useState, useEffect } from "react";
import type { StepId } from "../pages/Home";
import { STEPS, STEP_DATA } from "../pages/Home";

// Map step numbers to step IDs
const STEP_NUMBER_TO_ID: Record<string, StepId> = {
  "01": "grip",
  "02": "purge",
  "03": "assault",
  "04": "clarity",
  "05": "surface",
  "06": "revive",
  "07": "lustre",
  "08": "shield",
};

// Background images for each step - for now using the same image, later can be customized
const STEP_BACKGROUND_IMAGES: Record<StepId, string> = {
  grip: "/step-grip.png",
  purge: "/step-purge.png",
  assault: "/step-assault.png",
  clarity: "/step-clarity.png",
  surface: "/step-surface.png",
  revive: "/step-ops-center.png",
  lustre: "/step-lustre.png",
  shield: "/step-shield.png",
  "x-dirty": "/step-grip.png", // Use default for intervention products
  "x-extract": "/step-grip.png",
  "x-blaq": "/step-grip.png",
  "x-fal": "/step-grip.png",
  "x-field": "/step-grip.png",
  "z-fortify": "/step-grip.png",
};

// Product bottle images for each step
const STEP_BOTTLE_IMAGES: Record<StepId, string> = {
  grip: "/step-01-grip.png",
  purge: "/step-02-purge.png",
  assault: "/step-03-assault.png",
  clarity: "/step-04-clarity.png",
  surface: "/step-05-surface.png",
  revive: "/step-06-revive.jpg",
  lustre: "/step-07-lustre.jpg",
  shield: "/step-08-shield.jpg",
  "x-dirty": "/XBlackqout.png",
  "x-extract": "/x-extraction.jpg",
  "x-blaq": "/x-blaqout.jpg",
  "x-fal": "/x-fallout.jpg",
  "x-field": "/XBlackqout.png",
  "z-fortify": "/z-fortify.jpg",
};

export function ProductDetailsPanel({ 
  activeStepId, 
  onStepClick 
}: { 
  activeStepId: StepId;
  onStepClick?: (id: StepId) => void;
}) {
  const activeStep = STEPS.find((s) => s.id === activeStepId);
  const stepData = STEP_DATA[activeStepId];
  const backgroundImage = STEP_BACKGROUND_IMAGES[activeStepId] || "/step-grip.png";
  // For intervention products, don't show step number
  const activeStepNumber = activeStep?.number || null;
  const isInterventionProduct = !activeStep;
  
  // Responsive min height and width
  const [minHeight, setMinHeight] = useState("400px");
  const [width, setWidth] = useState(1024);
  
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      setWidth(w);
      if (w < 768) {
        setMinHeight("300px");
      } else if (w < 1024) {
        setMinHeight("350px");
      } else {
        setMinHeight("400px");
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // If stepData is not found, show error message
  if (!stepData) {
    console.error("Step data not found for:", activeStepId, "Available keys:", Object.keys(STEP_DATA));
    return (
      <div className="relative rounded-xl border border-[#333333] h-auto w-full bg-[#0A0A0A] p-8">
        <div className="text-white">Product data not found for: {activeStepId}</div>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-xl overflow-visible border border-[#333333] h-auto w-full transition-all duration-500 bg-[#0A0A0A]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        minHeight,
      }}
    >
      {/* Zone Label - Above product name, positioned relative to container */}
      <div className="absolute -top-2 sm:-top-2.5 md:-top-3 left-3 sm:left-4 md:left-6 z-30">
        <div className="bg-black/80 border border-[#333333] px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded">
          <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
            Product Information Zone™
          </div>
        </div>
      </div>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 rounded-xl overflow-hidden" />

      {/* Compass Wheel - Top Right - Visible on all screens, resized for mobile */}
      <div className="absolute top-2 sm:top-3 md:top-4 z-20 flex flex-col items-center" style={{ right: width < 768 ? 'calc(0.5rem + 15px)' : width < 1024 ? 'calc(0.75rem + 20px)' : 'calc(1rem + 30px)' }}>
        <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.2em] text-[#D4A574] uppercase mb-0.5 sm:mb-1 text-center">
          THE RIOT LINE™
        </div>
        <div className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-bold tracking-[0.15em] text-white uppercase mb-1 sm:mb-2 md:mb-3 text-center">
          8 STEP SYSTEM
        </div>
        
        {/* Compass SVG */}
        <div className="relative w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] mb-1 sm:mb-1.5 md:mb-2">
          <svg width="140" height="140" viewBox="0 0 140 140" className="absolute inset-0 w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => {
              const stepNumber = String(i + 1).padStart(2, '0');
              const isActive = stepNumber === activeStepNumber;
              const centerX = 70;
              const centerY = 70;
              const radius = 60;
              const innerRadius = 20;
              const startAngle = (i * 45 - 90) * Math.PI / 180;
              const endAngle = ((i + 1) * 45 - 90) * Math.PI / 180;
              
              const x1 = centerX + innerRadius * Math.cos(startAngle);
              const y1 = centerY + innerRadius * Math.sin(startAngle);
              const x2 = centerX + radius * Math.cos(startAngle);
              const y2 = centerY + radius * Math.sin(startAngle);
              const x3 = centerX + radius * Math.cos(endAngle);
              const y3 = centerY + radius * Math.sin(endAngle);
              const x4 = centerX + innerRadius * Math.cos(endAngle);
              const y4 = centerY + innerRadius * Math.sin(endAngle);
              
              const pathD = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;
              
              const midAngle = (startAngle + endAngle) / 2;
              const textRadius = radius - 14;
              const textX = centerX + textRadius * Math.cos(midAngle);
              const textY = centerY + textRadius * Math.sin(midAngle);
              
              return (
                <g key={i}>
                  <path
                    d={pathD}
                    fill={isActive ? "#FF6B35" : "#2a2a2a"}
                    stroke={isActive ? "#FF6B35" : "#4a4a4a"}
                    strokeWidth="1.5"
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => {
                      const stepId = STEP_NUMBER_TO_ID[stepNumber];
                      if (stepId && onStepClick) {
                        onStepClick(stepId);
                      }
                    }}
                    style={{
                      filter: isActive ? "drop-shadow(0 0 8px rgba(255,107,53,0.8))" : "none",
                    }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                    fontSize="14"
                    fontWeight="900"
                    fontFamily="Arial, sans-serif"
                    className="cursor-pointer select-none"
                    onClick={() => {
                      const stepId = STEP_NUMBER_TO_ID[stepNumber];
                      if (stepId && onStepClick) {
                        onStepClick(stepId);
                      }
                    }}
                    style={{
                      textShadow: isActive ? "0 0 8px rgba(255,107,53,0.8)" : "none",
                      pointerEvents: "all",
                    }}
                  >
                    {stepNumber}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle
              cx="70"
              cy="70"
              r="20"
              fill="#2a2a2a"
              stroke="#B87333"
              strokeWidth="2"
            />
          </svg>
        </div>
        
        {/* Step label below compass - only show for regular steps */}
        {!isInterventionProduct && activeStepNumber && (
          <div className="text-center">
            <div className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-bold tracking-[0.1em] text-white uppercase mb-0.5">
              STEP {activeStepNumber}
            </div>
            <div className="text-[9px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-black tracking-[0.1em] text-[#D4A574] uppercase">
              {activeStep?.label || "GRIP"}
            </div>
          </div>
        )}
        {isInterventionProduct && (
          <div className="text-center">
            <div className="text-[9px] sm:text-[10px] md:text-[12px] lg:text-[14px] font-black tracking-[0.1em] text-[#D4A574] uppercase">
              {stepData.name}
            </div>
          </div>
        )}
      </div>

      {/* Content overlaid on background */}
      <div className="relative z-10 flex flex-col p-3 sm:p-3.5 md:p-4 pt-4 sm:pt-5 md:pt-6">
        {/* Header */}
        <div className="mb-3 sm:mb-3.5 md:mb-4">
          <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.16em] text-white mb-1">
            {stepData.name}
          </div>
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-white/60 mb-1 sm:mb-2">
            {stepData.productCode}
          </div>
          <div className="text-xs sm:text-sm text-white/80">
            {stepData.shortDescription}
          </div>
        </div>

        {/* What It Is / What It Does */}
        <div className="mb-2 sm:mb-2.5 md:mb-3 bg-black/30 p-2 sm:p-2.5 md:p-3 rounded-lg">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-1 sm:mb-1.5 md:mb-2">
            What It Is / What It Does
          </div>
          <p className="text-xs sm:text-sm text-white/85">
            {stepData.whatItIs}
          </p>
        </div>

        {/* Capabilities */}
        <div className="mb-2 sm:mb-2.5 md:mb-3 bg-black/30 p-2 sm:p-2.5 md:p-3 rounded-lg">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-1 sm:mb-1.5 md:mb-2">
            Capabilities
          </div>
          <p className="text-xs sm:text-sm text-white/85">
            {stepData.capabilities}
          </p>
        </div>

        {/* Strategic Intent */}
        <div className="mb-2 sm:mb-2.5 md:mb-3 bg-black/30 p-2 sm:p-2.5 md:p-3 rounded-lg">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-1 sm:mb-1.5 md:mb-2">
            Strategic Intent
          </div>
          <p className="text-xs sm:text-sm text-white/85">
            {stepData.strategicIntent}
          </p>
        </div>

        {/* Deployment Protocol */}
        <div className="mb-2 sm:mb-2.5 md:mb-3 bg-black/30 p-2 sm:p-2.5 md:p-3 rounded-lg">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-1 sm:mb-1.5 md:mb-2">
            Deployment Protocol
          </div>
          <p className="text-xs sm:text-sm text-white/85">
            {stepData.deploymentProtocol}
          </p>
        </div>

        {/* Good to Know */}
        <div className="mb-2 sm:mb-2.5 md:mb-3 bg-black/30 p-2 sm:p-2.5 md:p-3 rounded-lg">
          <div className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-white/50 mb-1 sm:mb-1.5 md:mb-2">
            Good to Know
          </div>
          <p className="text-xs sm:text-sm text-white/85">
            {stepData.goodToKnow}
          </p>
        </div>

        {/* ADD TO GO-BAG Button - Center Bottom */}
        <div className="flex justify-center mt-4 sm:mt-5 md:mt-6 mb-3 sm:mb-3.5 md:mb-4">
          <button className="rounded-lg bg-[#FF6B35] px-3 py-1.5 sm:px-5 sm:py-2 md:px-7 md:py-2.5 lg:px-8 lg:py-3 text-xs sm:text-sm md:text-base font-bold tracking-wider text-white shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:bg-[#FF8C5A] transition-colors">
            + ADD TO GO-BAG
          </button>
        </div>
      </div>

      {/* Product Bottle Display - Bottom Right, aligned with wheel - Visible on all screens, resized for mobile */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 z-20 flex items-center">
        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]" style={{ marginRight: '0px' }}>
          {/* Glowing orange gear-like circular design background */}
          <div className="absolute inset-0 overflow-visible">
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2">
              {/* Concentric circles with dashed/glowing effect */}
              <div 
                className="absolute inset-0 rounded-full border-3 border-[#FF6B35]/30" 
                style={{
                  borderStyle: "dashed",
                  borderDasharray: "15 8",
                } as React.CSSProperties} 
              />
              <div 
                className="absolute inset-6 rounded-full border-2 border-[#FF6B35]/20" 
                style={{
                  borderStyle: "dashed",
                  borderDasharray: "12 6",
                } as React.CSSProperties} 
              />
              <div 
                className="absolute inset-12 rounded-full border border-[#FF6B35]/10" 
                style={{
                  borderStyle: "dashed",
                  borderDasharray: "8 4",
                } as React.CSSProperties} 
              />
              {/* Gear teeth effect */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 360) / 12;
                const rad = (angle * Math.PI) / 180;
                const containerSize = typeof window !== 'undefined' && window.innerWidth < 1024 ? 90 : 100;
                const radius = containerSize;
                const x = containerSize + radius * Math.cos(rad);
                const y = containerSize + radius * Math.sin(rad);
                return (
                  <div
                    key={i}
                    className="absolute h-6 w-1 md:h-7 md:w-1.5 lg:h-8 lg:w-1.5 rounded-full bg-[#FF6B35]/25"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      boxShadow: "0 0 8px rgba(255,107,53,0.4)",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Product bottle image positioned absolutely to match circle center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <img
              src={STEP_BOTTLE_IMAGES[activeStepId]}
              alt={stepData.name}
              className="h-20 sm:h-24 md:h-40 lg:h-48 w-auto object-contain transition-all duration-300"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,107,53,0.6)) drop-shadow(0 0 40px rgba(255,107,53,0.3))",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
