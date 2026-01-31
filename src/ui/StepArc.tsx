import type { Step, StepId } from "../pages/Home";

export function StepArc({
  steps,
  activeId,
  onStepClick,
}: {
  steps: Step[];
  activeId: StepId;
  onStepClick?: (id: StepId) => void;
}) {
  // Virtual canvas for arc layout (increased height to show more of the image)
  const width = 1100;
  const height = 480;

  // Normalized arch parameters (0–1 space), tuned to follow the background curve
  const leftX = 0.08; // how far from left edge
  const rightX = 0.92; // how far from right edge
  const baseY = 0.80; // baseline slightly lower to hug the glow
  const curveHeight = 0.36; // even higher center for more pronounced curve

  const points = steps.map((step, index) => {
    const t = steps.length === 1 ? 0 : index / (steps.length - 1); // 0 → 1
    const xNorm = leftX + (rightX - leftX) * t;
    const arch = 1 - (2 * t - 1) * (2 * t - 1); // 0 at ends, 1 at center (parabola)
    const yNorm = baseY - curveHeight * arch;

    return {
      step,
      x: xNorm * width,
      y: yNorm * height,
    };
  });

  const arcPath = (() => {
    if (!points.length) return "";
    const [first, ...rest] = points;
    return [
      `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`,
      ...rest.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`),
    ].join(" ");
  })();

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[#333333] bg-black/60"
      style={{
        height,
        backgroundImage: "url(/Banner-Product2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay to match cinematic look but keep image visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />

      {/* Arc line behind the circles - Moderate brightness with glow */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full"
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.5))' }}
      >
        {/* Outer glow */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,107,53,0.4)"
          strokeWidth={16}
          strokeLinecap="round"
          style={{ filter: 'blur(6px)' }}
        />
        {/* Middle glow */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,140,90,0.5)"
          strokeWidth={10}
          strokeLinecap="round"
          style={{ filter: 'blur(3px)' }}
        />
        {/* Inner core */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,107,53,0.7)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        {/* Center line */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(255,184,107,0.8)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>

      {/* Step circles positioned along the arc */}
      <div className="pointer-events-none absolute inset-0">
        {points.map((p) => {
          const isActive = p.step.id === activeId;
          return (
            <button
              key={p.step.id}
              type="button"
              onClick={() => onStepClick?.(p.step.id)}
              className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus:outline-none"
              style={{
                left: `${(p.x / width) * 100}%`,
                top: `${(p.y / height) * 100}%`,
              }}
            >
              <span
                className={`text-[10px] font-semibold tracking-[0.2em] uppercase mb-2 ${
                  isActive ? "text-[#FF6B35]/90" : "text-white/60"
                }`}
              >
                {p.step.category}
              </span>
              <div
                className={`mb-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-[2px] transition-all ${
                  isActive
                    ? "border-[#FF6B35] bg-[#FF6B35]/25 shadow-[0_0_30px_rgba(255,107,53,0.8),0_0_45px_rgba(255,140,90,0.5)]"
                    : "border-[#FF6B35]/50 bg-black/70 shadow-[0_0_12px_rgba(255,107,53,0.4)]"
                }`}
                style={{
                  filter: isActive ? 'drop-shadow(0 0 15px rgba(255,107,53,0.7))' : 'drop-shadow(0 0 6px rgba(255,107,53,0.3))'
                }}
              >
                <span
                  className={`text-[10px] font-bold tracking-[0.15em] uppercase leading-tight ${
                    isActive ? "text-[#FF6B35]" : "text-white/70"
                  }`}
                >
                  Step
                </span>
                <span
                  className={`text-xl font-black tracking-[0.24em] leading-tight ${
                    isActive ? "text-[#FF6B35]" : "text-white/80"
                  }`}
                >
                  {p.step.number}
                </span>
              </div>
              <span
                className={`text-sm font-semibold tracking-[0.24em] ${
                  isActive ? "text-[#FF6B35]" : "text-white/75"
                }`}
              >
                {p.step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
