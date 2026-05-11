/**
 * Subtle paper-grain texture overlay rendered as fixed full-screen SVG.
 * Sits behind everything (z: 0) and uses pointer-events: none so it's purely
 * decorative. The noise pattern adds tactile depth to the cream background.
 */
export default function PaperGrain() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.45, mixBlendMode: 'multiply' }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="paperGrain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.78
                    0 0 0 0 0.65
                    0 0 0 0 0.45
                    0 0 0 0.06 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#paperGrain)" />
      </svg>
    </div>
  );
}
