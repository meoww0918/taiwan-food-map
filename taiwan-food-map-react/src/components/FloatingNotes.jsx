import { motion, useReducedMotion } from 'framer-motion';

const NOTES = ['♪', '♫', '♩', '♬'];
const POSITIONS = [
  { left: '8%', size: 22, color: '#C4884F', delay: 0, duration: 7, drift: 18 },
  { left: '22%', size: 16, color: '#8FA467', delay: 1.4, duration: 8, drift: -14 },
  { left: '38%', size: 26, color: '#D08A5C', delay: 2.6, duration: 9, drift: 10 },
  { left: '58%', size: 18, color: '#A07B4F', delay: 0.8, duration: 7.5, drift: -20 },
  { left: '74%', size: 22, color: '#7E9461', delay: 3.2, duration: 8.5, drift: 16 },
  { left: '88%', size: 16, color: '#B5743D', delay: 1.9, duration: 7, drift: -10 },
];

export default function FloatingNotes() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {POSITIONS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 select-none"
          style={{
            left: p.left,
            color: p.color,
            fontSize: p.size,
            fontWeight: 600,
            textShadow: '0 1px 0 rgba(255,255,255,0.6)',
          }}
          initial={{ y: 20, x: 0, opacity: 0, rotate: -8 }}
          animate={{
            y: [-20, -260],
            x: [0, p.drift, p.drift * 0.4, 0],
            opacity: [0, 0.65, 0.65, 0],
            rotate: [-8, 6, -4, 2],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {NOTES[i % NOTES.length]}
        </motion.div>
      ))}
    </div>
  );
}
