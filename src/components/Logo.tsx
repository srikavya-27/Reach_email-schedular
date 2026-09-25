interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 36 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mf-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="3" y="8" width="34" height="24" rx="6" stroke="url(#mf-grad)" strokeWidth="2.5" />
      <path d="M6 12L20 22L34 12" stroke="url(#mf-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 24L34 31" stroke="url(#mf-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="34" cy="31" r="3.5" fill="url(#mf-grad)" />
    </svg>
  );
}

export function LogoWordmark({ className = '', size = 36 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={size} />
      <span className="text-lg font-bold tracking-tight text-white">
        Mail<span className="gradient-text">Flow</span>
      </span>
    </div>
  );
}
