interface LogoProps {
  className?: string;
}

/**
 * Theme-Aware FinFlow Logo Component.
 * The 'F' is set to `currentColor` to inherit text color (black/white).
 * The upward swoops retain their vibrant professional colors.
 */
export const Logo = ({ className = "w-10 h-10" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* This is the main 'F' shape. By setting fill to 'currentColor', 
        we make the logo adapt to the surrounding text color.
      */}
      <path
        d="M20 10H80V25H35V45H75V60H35V90H20V10Z"
        fill="currentColor" // The "Magic" property for theme handling
      />

      {/* These abstract upward lines stay in vibrant colors to keep 
        the FinFlow branding consistent, regardless of the theme.
      */}
      <path
        d="M50 45L75 15L85 25L60 55H50Z"
        fill="#10B981" // Vivid Emerald (Safe on black or white)
      />
      <path
        d="M70 15H85V30L70 15Z"
        fill="#0EA5E9" // Cool Sky Blue (Safe on black or white)
      />
    </svg>
  );
};
