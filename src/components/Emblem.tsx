import React from 'react';

interface EmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  lightMode?: boolean;
}

export const Emblem: React.FC<EmblemProps> = ({ size = 'md', showSubtitle = true, lightMode = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div className="flex items-center gap-3">
      {/* Official Community Emblem / Logo Seal with Northern Arewa royal geometry */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-900 via-slate-900 to-stone-950 p-0.5 border-2 border-amber-400 shadow-md flex items-center justify-center shrink-0 group`}
        title="Unguwar Kanawa Official Community Seal / Emblem"
      >
        <div className="w-full h-full rounded-full border border-amber-300/40 flex items-center justify-center bg-slate-950/90 relative overflow-hidden">
          {/* Subtle Arewa Traditional Knot Vector */}
          <svg
            viewBox="0 0 100 100"
            className="w-4/5 h-4/5 text-amber-400 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Traditional Arewa geometric diamond loop & knot */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
            <path
              d="M50 16 L72 38 L50 60 L28 38 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              d="M50 40 L72 62 L50 84 L28 62 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <circle cx="50" cy="50" r="6.5" fill="#f59e0b" />
            <circle cx="50" cy="20" r="3.5" fill="#f59e0b" />
            <circle cx="50" cy="80" r="3.5" fill="#f59e0b" />
            <circle cx="20" cy="50" r="3.5" fill="#f59e0b" />
            <circle cx="80" cy="50" r="3.5" fill="#f59e0b" />
          </svg>
          {/* Palace Crown Top Accent */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-amber-400 rounded-b-sm"></div>
        </div>
      </div>

      {/* Emblem Text branding */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-cinzel font-extrabold tracking-wide uppercase leading-tight ${
              lightMode ? 'text-stone-900' : 'text-stone-900'
            } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base sm:text-lg'}`}
          >
            UNGUWAR KANAWA
          </span>
          <span className="text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-600/30">
            KADUNA
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-xs text-blue-900 font-semibold tracking-tight">
            Traditional Council & Community Palace
          </span>
        )}
      </div>
    </div>
  );
};
