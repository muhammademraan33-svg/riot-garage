import type { StepId } from "../pages/Home";
import { STEPS } from "../pages/Home";

// Map step numbers to step IDs
const STEP_NUMBER_TO_ID: Record<string, StepId> = {
  "01": "grip",
  "02": "purge",
  "03": "assault",
  "04": "clarity",
  "05": "cockpit",
  "06": "revive",
  "07": "lustre",
  "08": "shield",
};

export function CompassWheel({
  activeStepId,
  onStepClick,
}: {
  activeStepId: StepId;
  onStepClick?: (id: StepId) => void;
}) {
  const activeStep = STEPS.find((s) => s.id === activeStepId);
  const activeStepNumber = activeStep?.number || null;

  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-bold tracking-[0.2em] text-[#D4A574] uppercase mb-1 text-center">
        THE RIOT LINE™
      </div>
      <div className="text-[9px] font-bold tracking-[0.15em] text-white uppercase mb-3 text-center">
        8 STEP SYSTEM
      </div>
      
      {/* Compass SVG */}
      <div className="relative w-[140px] h-[140px] mb-2">
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
      
      {/* Step label below compass */}
      {activeStepNumber && (
        <div className="text-center">
          <div className="text-[10px] font-bold tracking-[0.1em] text-white uppercase mb-0.5">
            STEP {activeStepNumber}
          </div>
          <div className="text-[14px] font-black tracking-[0.1em] text-[#D4A574] uppercase">
            {activeStep?.label || "GRIP"}
          </div>
        </div>
      )}
    </div>
  );
}
