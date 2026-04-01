interface HeroBrandBlockProps {
  title: string;
  className?: string;
}

export function HeroBrandBlock({ title, className = '' }: HeroBrandBlockProps) {
  return (
    <div
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-[#0D1B3E] ${className}`}
    >
      {/* Geometric SVG background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.06 }}
      >
        {/* Concentric circles */}
        <circle cx="320" cy="55" r="130" fill="none" stroke="white" strokeWidth="1.2" />
        <circle cx="320" cy="55" r="85" fill="none" stroke="white" strokeWidth="0.7" />
        <circle cx="320" cy="55" r="40" fill="none" stroke="white" strokeWidth="0.4" />

        {/* Diagonal lines */}
        <line x1="0" y1="250" x2="400" y2="170" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="270" x2="400" y2="190" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="290" x2="400" y2="210" stroke="white" strokeWidth="0.3" />

        {/* Rotated rectangle */}
        <rect
          x="280" y="155" width="105" height="105" rx="6"
          fill="none" stroke="white" strokeWidth="0.6"
          transform="rotate(18, 332, 208)"
        />

        {/* Small accent circle bottom-left */}
        <circle cx="60" cy="240" r="50" fill="none" stroke="white" strokeWidth="0.5" />
        <circle cx="60" cy="240" r="25" fill="none" stroke="white" strokeWidth="0.3" />

        {/* Dot grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={30 + col * 18}
              cy={30 + row * 18}
              r="1.2"
              fill="white"
            />
          ))
        )}
      </svg>

      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(0,180,166,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          className="text-[11px] uppercase tracking-[2px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Colegio Oficial de
        </span>
        <span
          className="mb-3.5 text-[11px] uppercase tracking-[2px]"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Graduados Sociales de Madrid
        </span>

        <h2 className="text-[clamp(24px,3vw,34px)] font-medium leading-tight tracking-[-0.5px] text-white">
          {title}
        </h2>

        {/* Teal accent line */}
        <div
          className="mt-3.5 h-[3px] w-10 rounded-full"
          style={{ background: '#00B4A6' }}
        />
      </div>
    </div>
  );
}
