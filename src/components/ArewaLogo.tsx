import React from 'react';

interface ArewaLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  showShadow?: boolean;
}

export const ArewaLogo: React.FC<ArewaLogoProps> = ({
  className = '',
  size = 'md',
  showShadow = true,
}) => {
  const sizeMap: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const dimensionClass = typeof size === 'number' ? '' : sizeMap[size] || 'w-11 h-11';
  const customStyle = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div
      style={customStyle}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${dimensionClass} ${
        showShadow ? 'drop-shadow-sm' : ''
      } ${className}`}
      title="Official Northern Knot (Dagin Arewa) Logo - Unguwar Kanawa"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full object-contain"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. The 4-Pointed Concave Green Star (North, East, South, West) */}
        <path
          d="M 100 8
             C 100 68, 132 100, 192 100
             C 132 100, 100 132, 100 192
             C 100 132, 68 100, 8 100
             C 68 100, 100 68, 100 8 Z"
          fill="#088532"
          stroke="#000000"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* 2. Loop A: -45 deg (NW to SE) */}
        <rect
          x="78"
          y="22"
          width="44"
          height="156"
          rx="22"
          ry="22"
          transform="rotate(-45 100 100)"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="7"
        />

        {/* 3. Loop B: +45 deg (NE to SW) */}
        <rect
          x="78"
          y="22"
          width="44"
          height="156"
          rx="22"
          ry="22"
          transform="rotate(45 100 100)"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="7"
        />

        {/* 4. Crossing lines to preserve interlaced weave */}
        <g transform="rotate(-45 100 100)" stroke="#000000" strokeWidth="7" fill="none">
          <line x1="78" y1="78" x2="78" y2="122" />
          <line x1="122" y1="78" x2="122" y2="122" />
        </g>

        {/* 5. Center Green Diamond */}
        <polygon
          points="100,74 126,100 100,126 74,100"
          fill="#088532"
          stroke="#000000"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
