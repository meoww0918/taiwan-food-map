import { motion, useReducedMotion } from 'framer-motion';

const BARS = 14;

/**
 * Fake lofi audio-bar visualizer. Pure visual flavor — does not actually read
 * the iframe's audio. The bars animate on a randomised per-bar loop so it
 * reads as "audio playing" without claiming to be synced.
 */
export default function LofiVisualizer({ height = 22 }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <span
        className="inline-flex items-end gap-[2px]"
        style={{ height }}
      >
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: '40%',
              backgroundColor: '#7A4B22',
              borderRadius: 2,
              opacity: 0.6,
            }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-end gap-[2px]"
      style={{ height }}
      aria-hidden="true"
    >
      {Array.from({ length: BARS }).map((_, i) => {
        const peak = 0.45 + ((i * 13) % 7) / 12; // 0.45..1.0
        const dur = 0.85 + ((i * 7) % 5) / 8; // 0.85..1.5
        const delay = (i * 0.08) % 1.2;
        return (
          <motion.span
            key={i}
            style={{
              width: 3,
              backgroundColor: '#7A4B22',
              borderRadius: 2,
              transformOrigin: 'bottom',
              height,
            }}
            animate={{ scaleY: [0.25, peak, 0.35, peak * 0.85, 0.25] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }}
          />
        );
      })}
    </span>
  );
}
