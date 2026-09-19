import React from 'react';
import { ArewaLogo } from './ArewaLogo';

interface EmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  lightMode?: boolean;
  variant?: 'full' | 'icon-only';
}

export const Emblem: React.FC<EmblemProps> = ({
  size = 'md',
  showSubtitle = true,
  lightMode = true,
  variant = 'full',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const logoSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
    xl: 'xl' as const,
  };

  if (variant === 'icon-only') {
    return (
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl bg-white p-1 border border-stone-300 shadow-sm flex items-center justify-center shrink-0 hover:scale-105 transition-transform`}
        title="Official Northern Knot (Dagin Arewa) Community Logo"
      >
        <ArewaLogo size={logoSizes[size]} showShadow={false} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Official Community Emblem / Logo Seal with Northern Arewa royal geometry */}
      <div
        className={`relative ${sizeClasses[size]} rounded-2xl bg-white p-1 border border-stone-300 shadow-md flex items-center justify-center shrink-0 group hover:border-emerald-600 transition-all`}
        title="Unguwar Kanawa Official Community Logo (Dagin Arewa)"
      >
        <div className="w-full h-full rounded-xl flex items-center justify-center bg-white relative overflow-hidden">
          <ArewaLogo size={logoSizes[size]} showShadow={false} />
        </div>
      </div>

      {/* Emblem Text branding */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-cinzel font-extrabold tracking-wide uppercase leading-tight ${
              lightMode ? 'text-stone-900' : 'text-white'
            } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base sm:text-lg'}`}
          >
            UNGUWAR KANAWA
          </span>
          <span
            className={`text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded ${
              lightMode
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-600/30'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
            }`}
          >
            KADUNA
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] sm:text-xs font-semibold tracking-tight ${
              lightMode ? 'text-emerald-900' : 'text-emerald-300'
            }`}
          >
            Traditional Council & Community Palace
          </span>
        )}
      </div>
    </div>
  );
};

