import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

// Per-icon: size, idle motion, transformOrigin. Crop is wide so the illustration
// has breathing room and isn't visually cut off.
const items = [
  {
    to: '/food-map',
    src: '/assets/icons/nav-food-map.png',
    label: 'Food',
    alt: '美食',
    cropPct: 72,
    sizeClass: 'h-[46px] sm:h-[54px] lg:h-[62px]',
    origin: '50% 100%',
    idle: { scale: [1, 1.05, 1], rotate: [0, -1.5, 0, 1.5, 0] },
    duration: 3.2,
  },
  {
    to: '/street-map',
    src: '/assets/icons/nav-street-map.png',
    label: 'Map',
    alt: '地圖',
    cropPct: 72,
    sizeClass: 'h-[44px] sm:h-[52px] lg:h-[60px]',
    origin: '20% 60%',
    idle: { rotate: [-3, 3, -3] },
    duration: 3.6,
  },
  {
    to: '/challenge',
    src: '/assets/icons/nav-challenges.png',
    label: 'Challenges',
    alt: '挑戰',
    cropPct: 72,
    sizeClass: 'h-[48px] sm:h-[56px] lg:h-[64px]',
    origin: '50% 100%',
    idle: { scale: [1, 1.06, 1], rotate: [-1, 1, -1] },
    duration: 2.6,
  },
  {
    to: '/survival-tools',
    src: '/assets/icons/nav-survival-tools.png',
    label: 'Tools',
    alt: '工具',
    cropPct: 72,
    sizeClass: 'h-[44px] sm:h-[52px] lg:h-[60px]',
    origin: '50% 90%',
    idle: { rotate: [-3.5, 3.5, -3.5] },
    duration: 3.2,
  },
  {
    to: '/music',
    src: '/assets/icons/nav-music.png',
    label: 'Music',
    alt: '音樂',
    cropPct: 72,
    sizeClass: 'h-[48px] sm:h-[56px] lg:h-[64px]',
    origin: '50% 90%',
    idle: { rotate: [-2.5, 2.5, -2.5], scale: [1, 1.04, 1] },
    duration: 2.8,
  },
];

const tap = { scale: 0.9, rotate: -3 };
const hover = { scale: 1.1, rotate: 2 };
const transition = { type: 'spring', stiffness: 380, damping: 16 };

export default function BottomNav() {
  const reduce = useReducedMotion();
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[874px] lg:max-w-[1180px] flex items-end justify-around px-1 sm:px-3 z-50"
      style={{
        // Match the icon PNG's exact cream background (#FCF4EA) so the
        // icons blend in seamlessly with no visible rectangular box.
        backgroundColor: '#FCF4EA',
        paddingTop: 14,
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
        boxShadow: '0 -10px 22px -10px rgba(120, 72, 28, 0.18)',
      }}
    >
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className="flex-1 min-w-0 max-w-[120px]">
          {({ isActive }) => (
            <motion.div
              className="flex flex-col items-center gap-1 relative cursor-pointer"
              whileHover={reduce ? undefined : hover}
              whileTap={reduce ? undefined : tap}
              transition={transition}
              animate={isActive ? { scale: 1.08 } : { scale: 1 }}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className={`block w-auto ${item.sizeClass}`}
                style={{
                  // Crop with object-fit on the img so animations aren't clipped by a parent
                  aspectRatio: `1 / ${item.cropPct / 100}`,
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transformOrigin: item.origin,
                  opacity: isActive ? 1 : 0.85,
                }}
                animate={
                  isActive && !reduce
                    ? {
                        ...item.idle,
                        transition: {
                          duration: item.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                    : { scale: 1, rotate: 0 }
                }
              />

              <span
                className="text-[10px] sm:text-[11px] font-semibold tracking-wide select-none"
                style={{
                  color: isActive ? '#7A4B22' : '#9C7A52',
                  fontFamily:
                    '"Segoe UI", "Helvetica Neue", system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                {item.label}
              </span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
