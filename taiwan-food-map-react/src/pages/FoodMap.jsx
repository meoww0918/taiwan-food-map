import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import ConfettiSplash from '../components/ConfettiSplash.jsx';
import MapPreviewModal from '../components/MapPreviewModal.jsx';
import useImageDownload from '../hooks/useImageDownload.js';

const maps = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1;
  return {
    n,
    thumb: `${import.meta.env.BASE_URL}assets/food-maps/food-map-${n}.png`,
    full: `${import.meta.env.BASE_URL}assets/food-maps/CocoCruise-food-map-${n}.png`,
    filename: `CocoCruise-food-map-${n}.png`,
    alt: `美食地圖 ${n}`,
  };
});

const itemVariants = {
  hidden: { opacity: 0, y: 24, rotate: -0.5 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: Math.min(i, 6) * 0.04, duration: 0.4, ease: 'easeOut' },
  }),
};

function SteamWisps() {
  return (
    <svg
      className="pointer-events-none absolute top-1 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      width="42"
      height="60"
      viewBox="0 0 42 60"
      aria-hidden="true"
    >
      {[
        { d: 'M10 55 q 6 -10 0 -22 q -6 -12 0 -22', delay: 0 },
        { d: 'M22 56 q 6 -10 0 -22 q -6 -12 0 -22', delay: 0.4 },
        { d: 'M32 55 q 6 -10 0 -22 q -6 -12 0 -22', delay: 0.8 },
      ].map((w, i) => (
        <motion.path
          key={i}
          d={w.d}
          stroke="rgba(160, 110, 70, 0.55)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0, y: 14 }}
          animate={{ pathLength: 1, opacity: [0, 0.7, 0], y: -8 }}
          transition={{ duration: 2.4, delay: w.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}

const LONG_PRESS_MS = 450;

export default function FoodMap() {
  const download = useImageDownload();
  const reduce = useReducedMotion();
  const [busy, setBusy] = useState(null);
  const [confetti, setConfetti] = useState(null);
  const [preview, setPreview] = useState(null);
  const longPressTimer = useRef(null);

  const handleDownload = async (m, x, y) => {
    setBusy(m.n);
    await download(m.full, m.filename);
    setConfetti({ key: Date.now(), x, y });
    setTimeout(() => setBusy(null), 800);
  };

  const startLongPress = (m, e) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      setPreview(m);
      longPressTimer.current = null;
      // Cancel the click that would otherwise fire on touchend
      e.target?.blur?.();
    }, LONG_PRESS_MS);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <PageLayout bottomPadding="pb-36 lg:pb-32">
      <HeaderLink className="-mt-[25px] lg:-mt-[60px]" />

      <div className="px-2 sm:px-3 mb-2 -mt-[30px] text-center">
        <span
          className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full px-3 py-1"
          style={{
            background: 'rgba(196, 136, 79, 0.14)',
            color: '#7A4B22',
            border: '1px dashed rgba(196,136,79,0.4)',
          }}
        >
          Tap to download · Hold for preview & share ✦
        </span>
      </div>

      <div className="px-2 sm:px-3 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5">
        {maps.map((m, i) => (
          <motion.button
            key={m.n}
            type="button"
            onClick={(e) => {
              if (preview) return; // suppress click that comes from long-press release
              const r = e.currentTarget.getBoundingClientRect();
              handleDownload(
                m,
                ((r.left + r.width / 2) / window.innerWidth) * 100,
                ((r.top + r.height / 2) / window.innerHeight) * 100
              );
            }}
            onPointerDown={(e) => startLongPress(m, e)}
            onPointerUp={cancelLongPress}
            onPointerLeave={cancelLongPress}
            onContextMenu={(e) => {
              e.preventDefault();
              setPreview(m);
            }}
            aria-label={`Download ${m.alt}, long-press to preview`}
            className="block w-full text-left relative group rounded-[14px]"
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            whileHover={
              reduce
                ? undefined
                : {
                    scale: 1.018,
                    rotate: -0.5,
                    y: -3,
                    filter: 'drop-shadow(0 12px 22px rgba(120, 72, 28, 0.18))',
                  }
            }
            whileTap={reduce ? undefined : { scale: 0.985, rotate: 0.3 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <img
              src={m.thumb}
              className="w-full block rounded-[12px] select-none"
              alt={m.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            {!reduce && <SteamWisps />}
            {!reduce && (
              <motion.span
                className="absolute right-3 bottom-3 px-2.5 py-1 text-[11px] font-semibold rounded-full pointer-events-none"
                style={{
                  backgroundColor: 'rgba(125, 75, 35, 0.92)',
                  color: '#FDF4EA',
                  letterSpacing: '0.05em',
                  boxShadow: '0 6px 14px -6px rgba(120,72,28,0.55)',
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={busy === m.n ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {busy === m.n ? '下載中… ✓' : 'Tap ↓ · Hold ✦'}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <ConfettiSplash trigger={confetti?.key} x={confetti?.x} y={confetti?.y} />

      <MapPreviewModal
        open={!!preview}
        map={preview}
        onClose={() => setPreview(null)}
        onDownload={() => preview && handleDownload(preview, 50, 50)}
      />
    </PageLayout>
  );
}
