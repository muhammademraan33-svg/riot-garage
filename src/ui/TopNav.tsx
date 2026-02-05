export function TopNav() {
  return (
    <header className="relative border-b border-[#333333]/50 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-sm overflow-visible z-10">
      {/* Metallic texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(255,255,255,0.03) 2px,
          rgba(255,255,255,0.03) 4px
        )`
      }} />
      
      <div className="relative mx-auto max-w-[1920px] px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3">
        {/* Mobile Layout: Logo + Text side by side */}
        <div className="flex lg:hidden items-center justify-between">
          {/* Left: Logo Image - Overlapping and hanging down */}
          <div className="relative flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {/* Logo positioned to overlap header and extend below - larger and on top layer */}
            <div className="absolute -top-2 sm:-top-6 md:-top-8 -left-1 sm:-left-3 md:-left-4 z-50" style={{ pointerEvents: 'auto' }}>
              <img
                src="/riot-logo.png"
                alt="RIOT GARAGE Logo"
                className="h-20 w-20 sm:h-36 sm:w-36 md:h-44 md:w-44 object-contain flex-shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,1)]"
              />
            </div>
            {/* Spacer to push text to the right of overlapping logo */}
            <div className="w-16 sm:w-28 md:w-36" />
            {/* Center: Riot Garage Detail System Text */}
            <div className="relative z-10 flex-1 min-w-0 ml-2 sm:ml-0">
              <h1 
                className="text-[10px] sm:text-xl md:text-2xl font-black tracking-[0.16em] uppercase"
                style={{
                  color: '#FFFFFF',
                  textShadow: `
                    0 0 15px rgba(255,107,53,0.9),
                    0 0 30px rgba(255,107,53,0.7),
                    0 0 45px rgba(255,107,53,0.5),
                    0 0 60px rgba(255,140,90,0.3),
                    0 2px 4px rgba(0,0,0,0.8)
                  `,
                  filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.8))'
                }}
              >
                Riot Garage Detail System
              </h1>
            </div>
          </div>

        </div>

        {/* Desktop Layout (≥1024px): Logo (left), Centered Text, Empty space (right) */}
        <div className="hidden lg:grid grid-cols-3 items-center relative">
          {/* Left: Logo Image - Overlapping and hanging down */}
          <div className="relative flex items-center justify-start">
            {/* Logo positioned to overlap header and extend below - larger and on top layer */}
            <div className="absolute -top-8 -left-4 z-50" style={{ pointerEvents: 'auto' }}>
              <img
                src="/riot-logo.png"
                alt="RIOT GARAGE Logo"
                className="h-52 w-52 object-contain flex-shrink-0 drop-shadow-[0_10px_24px_rgba(0,0,0,1)]"
              />
            </div>
            {/* Spacer to account for logo width */}
            <div className="w-44" />
          </div>

          {/* Center: Riot Garage Detail System Text - Centered */}
          <div className="flex items-center justify-center z-10">
            <h1 
              className="text-3xl font-black tracking-[0.16em] uppercase whitespace-nowrap"
              style={{
                color: '#FFFFFF',
                textShadow: `
                  0 0 15px rgba(255,107,53,0.9),
                  0 0 30px rgba(255,107,53,0.7),
                  0 0 45px rgba(255,107,53,0.5),
                  0 0 60px rgba(255,140,90,0.3),
                  0 2px 4px rgba(0,0,0,0.8)
                `,
                filter: 'drop-shadow(0 0 12px rgba(255,107,53,0.8))'
              }}
            >
              Riot Garage Detail System
            </h1>
          </div>

          {/* Right: Empty spacer to maintain layout balance (icons removed) */}
          <div className="flex items-center justify-end">
            <div className="w-60"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
