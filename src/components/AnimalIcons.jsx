import React from 'react';

// Dog Icon (Cute dog face with floppy ears)
export function DogIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 8.5C5 5.5 7.5 3 10.5 3H13.5C16.5 3 19 5.5 19 8.5V11.5C19 12.8 18.5 14 17.5 14.8C16.5 15.6 15 16 13.5 16H10.5C9 16 7.5 15.6 6.5 14.8C5.5 14 5 12.8 5 11.5V8.5Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Floppy Ears */}
      <path 
        d="M5 8.5C5 10.5 4 12.5 3 13C2.2 13.4 1.5 12 2 10.5C2.6 8.5 4.1 6.5 5 5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M19 8.5C19 10.5 20 12.5 21 13C21.8 13.4 22.5 12 22 10.5C21.4 8.5 19.9 6.5 19 5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Eyes */}
      <circle cx="8.5" cy="9.5" r="1.25" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1.25" fill="currentColor" />
      {/* Snout & Nose */}
      <path 
        d="M10 13.5C10 12.2 11 11.5 12 11.5C13 11.5 14 12.2 14 13.5C14 14.8 13 15.5 12 15.5C11 15.5 10 14.8 10 13.5Z" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
      />
      {/* Tongue/Smile */}
      <path 
        d="M11 15.5C11 16.5 11.5 18 12 18C12.5 18 13 16.5 13 15.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
    </svg>
  );
}

// Cat Icon (Minimalist cat face with cute triangular ears and whiskers)
export function CatIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Face circle shape */}
      <path 
        d="M12 20C16.42 20 20 16.42 20 12C20 8.5 17.5 5 15.5 5C13.5 5 13.2 5.5 12 5.5C10.8 5.5 10.5 5 8.5 5C6.5 5 4 8.5 4 12C4 16.42 7.58 20 12 20Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Left Ear */}
      <path 
        d="M4.5 9.5L3.5 3.5L8.5 5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right Ear */}
      <path 
        d="M19.5 9.5L20.5 3.5L15.5 5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Eyes */}
      <circle cx="8.5" cy="11.5" r="1.25" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="1.25" fill="currentColor" />
      {/* Nose & Mouth */}
      <path 
        d="M12 13L11 14H13L12 13Z" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
      />
      <path 
        d="M10 15.5C11 15.5 11.5 15 12 14.5C12.5 15 13 15.5 14 15.5" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      {/* Whiskers */}
      <path d="M6 13.5H2M6.5 15H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 13.5H22M17.5 15H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Rabbit Icon (Rabbit face with signature long ears)
export function RabbitIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face bottom */}
      <path 
        d="M6 14C6 10.68 8.68 8 12 8C15.32 8 18 10.68 18 14C18 17.32 15.32 20 12 20C8.68 20 6 17.32 6 14Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Left long ear */}
      <path 
        d="M8.5 8C8.5 8 7 1.5 8.5 1.5C10 1.5 10.5 8 10.5 8" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right long ear */}
      <path 
        d="M13.5 8C13.5 8 14 1.5 15.5 1.5C17 1.5 15.5 8 15.5 8" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Eyes */}
      <circle cx="9.5" cy="13.5" r="1.2" fill="currentColor" />
      <circle cx="14.5" cy="13.5" r="1.2" fill="currentColor" />
      {/* Cute little nose */}
      <path 
        d="M12 15L11.5 15.7H12.5L12 15Z" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="1" 
      />
    </svg>
  );
}

// Bird Icon (A cute perched bird vector logo)
export function BirdIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Branch */}
      <path 
        d="M3 20H21" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Cute little leaf on branch */}
      <path 
        d="M5 20C5 18.5 6 17.5 7.5 17.5C7.5 19 6.5 20 5 20Z" 
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor" 
        strokeWidth="1.2" 
      />
      {/* Feet */}
      <path d="M11 17V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 17V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Bird body & head profile facing right */}
      <path 
        d="M17.5 7.5C16.8 6.5 15.3 5.5 13.5 5.5C10.5 5.5 8 8 8 11C8 12.5 8.5 13.8 9.5 14.8C7.5 15.5 5 17 3.5 19.5C6.5 19.5 9.5 18.5 11.5 17C12.1 17.3 12.8 17.5 13.5 17.5C16.5 17.5 19 15 19 12C19 10.2 18.4 8.7 17.5 7.5Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Beak */}
      <path 
        d="M19 11L22 12L19 13V11Z" 
        fill="currentColor"
        stroke="currentColor" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Eye */}
      <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor" />
      {/* Wing */}
      <path 
        d="M10 13C10.5 11 12.5 9.5 14.5 10C15.5 10.5 16 12 15 14C14 15.5 11.5 15 10 13Z" 
        stroke="currentColor" 
        strokeWidth="1.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}

// Fish Icon (A friendly fish swimming)
export function FishIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fish body */}
      <path 
        d="M2 12C5 8 10 6 15 8C18 9.2 19 11 20 12C19 13 18 14.8 15 16C10 18 5 16 2 12Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Tail fin */}
      <path 
        d="M20 12L23 9V15L20 12Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinejoin="round" 
        fill="currentColor"
      />
      {/* Gills and eye */}
      <path d="M6 10C6.5 11.2 6.5 12.8 6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

// Reptile Icon (Chameleon or stylized gecko/lizard)
export function ReptileIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coiled curly tail at the left, curving beautifully */}
      <path 
        d="M3 14C3 16.5 5 18.5 7.5 18.5C10 18.5 11 17 11 15.5C11 14 9.5 13 8.5 14C7.5 15 7.5 16.5 9 16.5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Upper arch body */}
      <path 
        d="M6.5 14.5C7.5 11.5 10.5 9.5 14 9.5C15.5 9.5 17.2 10.2 18.2 11.2" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Lower arch body */}
      <path 
        d="M7.5 17.5C10 17.5 13 16.5 15.5 14" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Head with big cute chameleon target eye and snout */}
      <path 
        d="M17.5 10.5C18 9 19.2 8.5 20.5 9.2C21.8 10 22 11.8 20.5 13C19.5 14 17.5 14 15.5 14" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Round eye with inner pupil */}
      <circle cx="19.2" cy="11.1" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19.2" cy="11.1" r="0.8" fill="currentColor" />
      
      {/* Tiny smile/mouth */}
      <path d="M21.2 12.5C20.5 13 19.8 13.2 19.2 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Front and back crawling feet */}
      <path d="M15.5 13.5L16.5 17H18M10 15L9.5 18.5H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hamster Icon (Round, chubby cheeks rodent)
export function HamsterIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Round main outer body */}
      <path 
        d="M12 21C16.5 21 19.5 18 19.5 13.5C19.5 9 16.5 6 12 6C7.5 6 4.5 9 4.5 13.5C4.5 18 7.5 21 12 21Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Left cute round ear */}
      <path 
        d="M5 8C5 8 3.5 4.5 5.5 4.5C7.5 4.5 7.5 7.5 7.5 7.5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Right cute round ear */}
      <path 
        d="M19 8C19 8 20.5 4.5 18.5 4.5C16.5 4.5 16.5 7.5 16.5 7.5" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Twinkling eyes */}
      <circle cx="9" cy="11.5" r="1.25" fill="currentColor" />
      <circle cx="15" cy="11.5" r="1.25" fill="currentColor" />
      {/* Cute nose and whiskers */}
      <circle cx="12" cy="13.5" r="1" fill="currentColor" style={{ color: '#ff8a9b' }} />
      <path d="M10.5 14C11.5 14.5 12 14.2 12 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 14C12.5 14.5 12 14.2 12 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Chubby cheeks curves */}
      <path d="M5.5 16C6.5 17 8 17.5 9.5 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18.5 16C17.5 17 16 17.5 14.5 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Other Icon (General sparkling paw badge)
export function OtherIcon({ size = 32, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cute central paw print with general category style */}
      <path 
        d="M12 10C14.2 10 16 11.8 16 14C16 15.5 15 16.5 13.5 17C12.5 17.5 11.5 17.5 10.5 17C9 16.5 8 15.5 8 14C8 11.8 9.8 10 12 10Z" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Paw beans */}
      <circle cx="7" cy="9" r="1.5" fill="currentColor" />
      <circle cx="10" cy="6" r="1.5" fill="currentColor" />
      <circle cx="14" cy="6" r="1.5" fill="currentColor" />
      <circle cx="17" cy="9" r="1.5" fill="currentColor" />
      {/* Sparkle on the side */}
      <path d="M19 16.5L17.5 18L19 19.5L20.5 18L19 16.5Z" fill="currentColor" />
      <path d="M5 16.5L3.5 18L5 19.5L6.5 18L5 16.5Z" fill="currentColor" />
    </svg>
  );
}

// Map key ids to component for high flexibility
export function AnimalLogo({ type, size = 32, className = '' }) {
  switch (type?.toLowerCase()) {
    case 'dog':
    case 'pets':
      return <DogIcon size={size} className={className} />;
    case 'cat':
    case 'cast':
    case 'mèo':
      return <CatIcon size={size} className={className} />;
    case 'rabbit':
    case 'shutter_speed':
    case 'thỏ':
      return <RabbitIcon size={size} className={className} />;
    case 'bird':
    case 'flutter_dash':
    case 'chim':
      return <BirdIcon size={size} className={className} />;
    case 'fish':
    case 'set_meal':
    case 'cá':
      return <FishIcon size={size} className={className} />;
    case 'reptile':
    case 'bug_report':
    case 'bò sát':
    case 'bosat':
      return <ReptileIcon size={size} className={className} />;
    case 'hamster':
    case 'mouse':
      return <HamsterIcon size={size} className={className} />;
    default:
      return <OtherIcon size={size} className={className} />;
  }
}
