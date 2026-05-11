import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const reduce = useReducedMotion();
  return (
    <motion.footer
      className="text-center pb-2 pt-1 select-none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.06em] italic"
        style={{ color: 'var(--text-muted, #8A6A48)' }}
      >
        <PawPrint reduce={reduce} delay={0} />
        <span>Made with 🍜 by Coco Cruise</span>
        <PawPrint reduce={reduce} delay={0.4} mirror />
      </div>
    </motion.footer>
  );
}

function PawPrint({ reduce, delay = 0, mirror = false }) {
  return (
    <motion.svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      style={{ transform: mirror ? 'scaleX(-1)' : 'none' }}
      animate={
        reduce
          ? undefined
          : { y: [0, -2, 0], rotate: [0, mirror ? -6 : 6, 0] }
      }
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <g fill="currentColor" opacity="0.6">
        <ellipse cx="3" cy="6" rx="1.4" ry="2" />
        <ellipse cx="7" cy="3" rx="1.4" ry="2" />
        <ellipse cx="11" cy="3" rx="1.4" ry="2" />
        <ellipse cx="15" cy="6" rx="1.4" ry="2" />
        <ellipse cx="9" cy="10" rx="3" ry="2.4" />
      </g>
    </motion.svg>
  );
}
