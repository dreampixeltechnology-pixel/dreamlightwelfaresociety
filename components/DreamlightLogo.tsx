import React from 'react';

interface DreamlightLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function DreamlightLogo({
  className = '',
  size = 48,
  showText = false,
}: DreamlightLogoProps) {
  return (
    <div className={`relative inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Circular Medallion Emblem matching Dreamlight Welfare Society Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md"
      >
        <defs>
          {/* Gold metallic gradients */}
          <linearGradient id="goldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d77f" />
            <stop offset="25%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#fff3b0" />
            <stop offset="75%" stopColor="#aa7c11" />
            <stop offset="100%" stopColor="#7a5505" />
          </linearGradient>

          <linearGradient id="goldInner" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8a6108" />
            <stop offset="35%" stopColor="#f1cf68" />
            <stop offset="70%" stopColor="#d8ab34" />
            <stop offset="100%" stopColor="#fff6c4" />
          </linearGradient>

          {/* Deep teal / night sky background */}
          <radialGradient id="skyGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#0f4c5c" />
            <stop offset="60%" stopColor="#082b35" />
            <stop offset="100%" stopColor="#03161c" />
          </radialGradient>

          {/* Mountain gradients */}
          <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#d1e0e8" />
            <stop offset="100%" stopColor="#8ba4b3" />
          </linearGradient>

          <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a4036" />
            <stop offset="100%" stopColor="#1f1814" />
          </linearGradient>

          {/* Green valley gradient */}
          <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e5c38" />
            <stop offset="50%" stopColor="#124024" />
            <stop offset="100%" stopColor="#092414" />
          </linearGradient>

          {/* Flame gradient */}
          <linearGradient id="flameGrad" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#d91a1a" />
            <stop offset="25%" stopColor="#ff4500" />
            <stop offset="60%" stopColor="#ff9900" />
            <stop offset="90%" stopColor="#ffe600" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient id="torchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#634505" />
          </linearGradient>

          {/* Text paths */}
          {/* Top text path arched clockwise: start angle around 170deg to 10deg */}
          <path
            id="textPathTop"
            d="M 68 250 A 182 182 0 1 1 432 250"
            fill="none"
          />

          {/* Bottom text path: along lower semi-circle */}
          <path
            id="textPathBottom"
            d="M 72 250 A 178 178 0 0 0 428 250"
            fill="none"
          />
        </defs>

        {/* 1. Outer rim with gold bevel */}
        <circle cx="250" cy="250" r="244" fill="url(#goldOuter)" stroke="#5c3f03" strokeWidth="3" />
        <circle cx="250" cy="250" r="236" fill="#141c1f" stroke="url(#goldInner)" strokeWidth="4" />

        {/* 2. Text Ring track */}
        <circle cx="250" cy="250" r="226" fill="#082026" stroke="#223a40" strokeWidth="2" />
        
        {/* Inner gold border separating ring from center artwork */}
        <circle cx="250" cy="250" r="148" fill="url(#skyGrad)" stroke="url(#goldOuter)" strokeWidth="6" />

        {/* 3. Text on ring */}
        {/* Top Arc: DREAMLIGHT WELFARE SOCIETY */}
        <text
          fill="#fce182"
          fontSize="21"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          letterSpacing="2"
        >
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            DREAMLIGHT WELFARE SOCIETY
          </textPath>
        </text>

        {/* Bottom Arc: Serving All Communities */}
        <text
          fill="#fce182"
          fontSize="17"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          letterSpacing="1.8"
        >
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            Serving All Communities
          </textPath>
        </text>

        {/* Laurel foliage accents on the left and right border of the ring */}
        {/* Left Laurel */}
        <g fill="#d4af37" opacity="0.9">
          <circle cx="58" cy="245" r="3" />
          <path d="M 62 235 Q 52 238 56 248 Q 63 243 62 235 Z" />
          <path d="M 64 255 Q 53 253 55 264 Q 63 260 64 255 Z" />
          <circle cx="59" cy="250" r="2.5" />
        </g>
        {/* Right Laurel */}
        <g fill="#d4af37" opacity="0.9">
          <circle cx="442" cy="245" r="3" />
          <path d="M 438 235 Q 448 238 444 248 Q 437 243 438 235 Z" />
          <path d="M 436 255 Q 447 253 445 264 Q 437 260 436 255 Z" />
          <circle cx="441" cy="250" r="2.5" />
        </g>

        {/* 4. Center Artwork Mask to fit in circle of radius 145 */}
        <g clipPath="url(#centerClip)">
          <clipPath id="centerClip">
            <circle cx="250" cy="250" r="145" />
          </clipPath>

          {/* Background: Sky */}
          <rect x="100" y="100" width="300" height="300" fill="url(#skyGrad)" />

          {/* Circuit board traces in sky (representing modern digital technology) */}
          <g stroke="#38bdf8" strokeWidth="2" opacity="0.75" fill="none">
            {/* Left circuits */}
            <path d="M 140 180 H 180 L 195 195 V 225" />
            <circle cx="140" cy="180" r="3" fill="#38bdf8" />
            <path d="M 155 155 H 200 L 210 170" />
            <circle cx="155" cy="155" r="3" fill="#38bdf8" />
            <path d="M 190 135 V 155 L 205 170" />
            <circle cx="190" cy="135" r="3" fill="#38bdf8" />

            {/* Right circuits (gold/cyan) */}
            <path d="M 360 180 H 320 L 305 195 V 225" stroke="#f59e0b" />
            <circle cx="360" cy="180" r="3" fill="#f59e0b" />
            <path d="M 345 155 H 300 L 290 170" stroke="#f59e0b" />
            <circle cx="345" cy="155" r="3" fill="#f59e0b" />
            <path d="M 310 135 V 155 L 295 170" stroke="#38bdf8" />
            <circle cx="310" cy="135" r="3" fill="#38bdf8" />
          </g>

          {/* Himalayan Mountains */}
          {/* Back peak Left */}
          <polygon points="120,330 185,200 250,330" fill="url(#rockGrad)" />
          <polygon points="185,200 160,245 185,240 195,255 210,240" fill="url(#snowGrad)" />

          {/* Back peak Right */}
          <polygon points="250,330 315,190 380,330" fill="url(#rockGrad)" />
          <polygon points="315,190 290,235 315,230 325,248 345,235" fill="url(#snowGrad)" />

          {/* Center Mid-peaks */}
          <polygon points="160,340 230,225 300,340" fill="#302821" />
          <polygon points="230,225 210,260 230,255 240,270 260,255" fill="url(#snowGrad)" />

          {/* Lush Green Foothills & Forests */}
          <ellipse cx="250" cy="355" rx="145" ry="55" fill="url(#forestGrad)" />
          <ellipse cx="190" cy="345" rx="90" ry="40" fill="#1b4d2e" />
          <ellipse cx="310" cy="345" rx="90" ry="40" fill="#174428" />

          {/* Wildflower/foliage specks */}
          <circle cx="160" cy="330" r="2.5" fill="#f59e0b" />
          <circle cx="180" cy="340" r="2" fill="#ef4444" />
          <circle cx="210" cy="335" r="2.5" fill="#f59e0b" />
          <circle cx="320" cy="335" r="2.5" fill="#ef4444" />
          <circle cx="340" cy="340" r="2" fill="#f59e0b" />

          {/* Golden Torch & Blazing Flame */}
          {/* Flame */}
          <g>
            {/* Outer flame */}
            <path
              d="M 250 120 
                 C 275 145, 295 180, 275 220 
                 C 265 240, 255 245, 250 248 
                 C 245 245, 235 240, 225 220 
                 C 205 180, 225 145, 250 120 Z"
              fill="url(#flameGrad)"
              filter="drop-shadow(0px 0px 8px rgba(255,160,0,0.8))"
            />
            {/* Inner bright yellow-white core flame */}
            <path
              d="M 250 145 
                 C 264 162, 276 188, 264 216 
                 C 257 230, 253 234, 250 236 
                 C 247 234, 243 230, 236 216 
                 C 224 188, 236 162, 250 145 Z"
              fill="#fffde6"
            />
            {/* Flame tongue curls */}
            <path
              d="M 245 130 Q 235 155 250 175 Q 260 160 250 140 Z"
              fill="#ffeb3b"
            />
            <path
              d="M 255 160 Q 268 180 258 200 Q 272 185 265 170 Z"
              fill="#ff5722"
            />
          </g>

          {/* Torch Bowl & Handle */}
          {/* Torch Top Bowl / Cup */}
          <path
            d="M 222 245 Q 250 248 278 245 L 268 280 Q 250 286 232 280 Z"
            fill="url(#torchGrad)"
            stroke="#7a5505"
            strokeWidth="1.5"
          />
          {/* Bowl rim detail */}
          <ellipse cx="250" cy="246" rx="28" ry="5" fill="#fef08a" stroke="#a16207" strokeWidth="1" />
          <ellipse cx="250" cy="280" rx="18" ry="4" fill="#a16207" />

          {/* Fluted Torch Shaft */}
          <path
            d="M 240 280 L 238 340 Q 250 344 262 340 L 260 280 Z"
            fill="url(#torchGrad)"
            stroke="#5c3f03"
            strokeWidth="1.5"
          />
          <line x1="246" y1="280" x2="245" y2="340" stroke="#fef08a" strokeWidth="1.2" />
          <line x1="254" y1="280" x2="255" y2="340" stroke="#713f12" strokeWidth="1.2" />

          {/* Golden Hand grasping torch */}
          <g fill="url(#goldInner)" stroke="#5c3f03" strokeWidth="1.5">
            {/* Wrist & Forearm entering from bottom right */}
            <path d="M 250 380 L 290 410 L 320 380 L 268 345 Z" />
            
            {/* Fingers curled around the shaft */}
            {/* Index */}
            <rect x="230" y="300" width="40" height="11" rx="5.5" fill="#d4af37" />
            <path d="M 233 301 Q 250 300 268 301" stroke="#fef08a" strokeWidth="1.5" />

            {/* Middle */}
            <rect x="228" y="312" width="44" height="11" rx="5.5" fill="#c99f2c" />
            <path d="M 231 313 Q 250 312 269 313" stroke="#fef08a" strokeWidth="1.5" />

            {/* Ring */}
            <rect x="230" y="324" width="42" height="11" rx="5.5" fill="#b88e23" />
            <path d="M 233 325 Q 250 324 268 325" stroke="#fef08a" strokeWidth="1.5" />

            {/* Little */}
            <rect x="234" y="336" width="36" height="10" rx="5" fill="#a67e1a" />

            {/* Thumb base knuckle */}
            <ellipse cx="270" cy="318" rx="8" ry="12" fill="#d4af37" />
          </g>
        </g>

        {/* Inner gold highlight ring */}
        <circle cx="250" cy="250" r="145" fill="none" stroke="url(#goldOuter)" strokeWidth="2" opacity="0.6" />
      </svg>

      {/* Brand Title block */}
      {showText && (
        <div className="flex flex-col justify-center text-left">
          {/* Top Line: DREAMLIGHT WELFARE SOCIETY in a single line */}
          <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors uppercase whitespace-nowrap leading-tight">
            DREAMLIGHT WELFARE SOCIETY
          </span>

          {/* Bottom Line: NGO written directly underneath */}
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md border border-emerald-300 shadow-2xs">
              NGO
            </span>
            <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
              Registered Welfare Society
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
