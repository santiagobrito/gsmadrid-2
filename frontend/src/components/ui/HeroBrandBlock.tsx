interface HeroBrandBlockProps {
  title: string;
  className?: string;
}

export function HeroBrandBlock({ title, className = '' }: HeroBrandBlockProps) {
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #E0F2FE 40%, #CCFBF1 100%)',
      }}
    >
      {/* Geometric SVG background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Concentric circles - top right */}
        <circle cx="330" cy="50" r="130" fill="none" stroke="#2563EB" strokeWidth="0.8" opacity="0.08" />
        <circle cx="330" cy="50" r="85" fill="none" stroke="#2563EB" strokeWidth="0.5" opacity="0.06" />
        <circle cx="330" cy="50" r="40" fill="none" stroke="#2563EB" strokeWidth="0.4" opacity="0.05" />

        {/* Diagonal lines */}
        <line x1="0" y1="250" x2="400" y2="170" stroke="#2563EB" strokeWidth="0.4" opacity="0.06" />
        <line x1="0" y1="270" x2="400" y2="190" stroke="#2563EB" strokeWidth="0.4" opacity="0.05" />

        {/* Rotated rectangle */}
        <rect
          x="280" y="155" width="100" height="100" rx="8"
          fill="none" stroke="#2BD4C7" strokeWidth="0.6" opacity="0.1"
          transform="rotate(18, 330, 205)"
        />

        {/* Accent circle bottom-left */}
        <circle cx="55" cy="245" r="55" fill="none" stroke="#2BD4C7" strokeWidth="0.5" opacity="0.08" />
        <circle cx="55" cy="245" r="28" fill="none" stroke="#2BD4C7" strokeWidth="0.3" opacity="0.06" />

        {/* Dot grid - top left */}
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={28 + col * 16}
              cy={28 + row * 16}
              r="1.5"
              fill="#2563EB"
              opacity="0.1"
            />
          ))
        )}

        {/* Small teal accent dots - bottom right */}
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <circle
              key={`tdot-${row}-${col}`}
              cx={340 + col * 14}
              cy={240 + row * 14}
              r="1.2"
              fill="#2BD4C7"
              opacity="0.12"
            />
          ))
        )}
      </svg>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="text-[10px] font-medium uppercase tracking-[2.5px] text-[#2563EB]/40">
          Colegio Oficial de
        </span>
        <span className="mb-4 text-[10px] font-medium uppercase tracking-[2.5px] text-[#2563EB]/40">
          Graduados Sociales de Madrid
        </span>

        <h2 className="text-[clamp(22px,3vw,32px)] font-semibold leading-tight tracking-[-0.3px] text-[#0E111B]">
          {title}
        </h2>

        {/* Gradient accent line */}
        <div
          className="mt-3.5 h-[3px] w-10 rounded-full"
          style={{ background: 'linear-gradient(90deg, #2F5BEA, #18B7B0)' }}
        />
      </div>
    </div>
  );
}
