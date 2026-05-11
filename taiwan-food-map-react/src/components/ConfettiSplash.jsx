import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const COLORS = ['#D85C3B', '#C4884F', '#7E9461', '#E7B14E', '#A06432', '#1DB954'];

/**
 * Watercolor splash + paint-fleck confetti burst. Renders as a fixed full-screen
 * overlay anchored at the click point. Triggered by passing a fresh `trigger` key.
 */
export default function ConfettiSplash({ trigger, x = 50, y = 50 }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!trigger) return;
    setActive({ key: trigger, x, y });
    const t = setTimeout(() => setActive(null), 1100);
    return () => clearTimeout(t);
  }, [trigger, x, y]);

  if (reduce) return null;

  const pieces = Array.from({ length: 22 }).map((_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const dist = 80 + ((i * 13) % 60);
    return {
      id: i,
      color: COLORS[i % COLORS.length],
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist - 20,
      rot: ((i * 31) % 360),
      size: 6 + (i % 4) * 2,
      delay: (i % 5) * 0.02,
    };
  });

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.key}
          className="fixed pointer-events-none"
          style={{
            left: `${active.x}%`,
            top: `${active.y}%`,
            width: 0,
            height: 0,
            zIndex: 60,
          }}
        >
          {/* Big watercolor splotch behind the flecks */}
          <motion.span
            className="absolute rounded-full"
            style={{
              left: -90,
              top: -90,
              width: 180,
              height: 180,
              background:
                'radial-gradient(circle, rgba(216,92,59,0.55) 0%, rgba(216,92,59,0.2) 50%, rgba(216,92,59,0) 75%)',
              mixBlendMode: 'multiply',
            }}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Paint flecks bursting outward */}
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: 0,
                top: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                marginLeft: -p.size / 2,
                marginTop: -p.size / 2,
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: p.tx,
                y: p.ty + 60, // gravity tail
                opacity: 0,
                rotate: p.rot,
              }}
              transition={{ duration: 0.95, delay: p.delay, ease: 'easeOut' }}
            />
          ))}

          {/* Center sparkle */}
          <motion.span
            className="absolute font-bold select-none"
            style={{
              left: 0,
              top: 0,
              transform: 'translate(-50%, -50%)',
              fontSize: 22,
              color: '#7A4B22',
              textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            ✦
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
