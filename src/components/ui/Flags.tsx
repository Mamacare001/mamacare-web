/**
 * Small inline SVG flags for the language switcher. Unicode flag emoji
 * (🇬🇧 🇷🇼) don't render as pictures on every device — Windows in
 * particular falls back to showing the raw letter codes ("GB", "RW").
 * These SVGs look the same everywhere, on every OS and browser.
 */

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id="fgb-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="fgb-t">
        <path d="M30,15 h30v15zv15h-30zh-30v-15zv-15h30z" />
      </clipPath>
      <g clipPath="url(#fgb-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#fgb-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function FlagRW({ className }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#20603D" />
      <rect width="30" height="12.5" fill="#00A1DE" />
      <rect y="12.5" width="30" height="2.5" fill="#FAD201" />
      <g fill="#E5BE01">
        {rays.map((deg) => (
          <rect key={deg} x="21.75" y="0.9" width="0.5" height="2.1" transform={`rotate(${deg} 22 5.5)`} />
        ))}
        <circle cx="22" cy="5.5" r="2.3" />
      </g>
    </svg>
  );
}
