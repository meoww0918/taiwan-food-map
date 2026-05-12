import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * SectionCard wraps an illustrated PNG and layers interactive elements:
 *  - whole-card lift/tilt + soft shadow on hover
 *  - hand-drawn dashed outline that "draws on" via SVG pathLength
 *  - watercolor-splash ripple anchored on the click position
 *  - real CTA button overlay at the drawn pill region (lifts off on hover)
 *  - optional sub-hotspots (separate clickable regions like Apple/Spotify on music.png)
 *
 * coords are 0..1 fractions of the image's width/height.
 */
export default function SectionCard({
  to,
  external = false,
  src,
  alt,
  ctaLabel,
  ctaText,
  ctaRegion = { left: 0.05, top: 0.62, width: 0.32, height: 0.22 },
  hotspots = [],
  floatingFoods = [],
  className = '',
  index = 0,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [splash, setSplash] = useState(null);

  // Cursor-tracking 3D tilt — desktop pointer only; touch leaves the card flat.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 220, damping: 22 });
  const rotY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 220, damping: 22 });

  const handlePointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handlePointerLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handlePointerDown = (e) => {
    if (reduce) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSplash({
      key: Date.now(),
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const cardVariants = {
    rest: { scale: 1, y: 0, rotate: 0, filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))' },
    hover: {
      scale: 1.025,
      rotate: -0.6,
      y: -4,
      filter: 'drop-shadow(0 14px 26px rgba(120, 72, 28, 0.22))',
      transition: { type: 'spring', stiffness: 240, damping: 20 },
    },
  };

  const cardInner = (
    <motion.div
      ref={ref}
      onPointerDown={handlePointerDown}
      className={`relative block w-full overflow-visible rounded-[18px] ${className}`}
      style={{ transformOrigin: '50% 60%' }}
      initial={{ opacity: 0, y: 18, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="relative w-full"
        style={{
          transformOrigin: '50% 60%',
          perspective: 1000,
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformStyle: 'preserve-3d',
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        variants={cardVariants}
        initial="rest"
        whileHover={reduce ? undefined : 'hover'}
        whileTap={
          reduce
            ? undefined
            : {
                scale: 0.97,
                rotate: 0.4,
                transition: { type: 'spring', stiffness: 700, damping: 14, mass: 0.4 },
              }
        }
      >
      <img src={src} alt={alt} className="w-full block rounded-[14px] select-none" draggable={false} />

      {!reduce && floatingFoods.map((food) => (
        <div
          key={food.src}
          className="absolute pointer-events-none"
          style={{
            left: `${food.region.left * 100}%`,
            top: `${food.region.top * 100}%`,
            width: `${food.region.width * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.img
            src={food.src}
            alt={food.alt || ''}
            aria-hidden={!food.alt}
            className="block w-full select-none"
            draggable={false}
            style={{
              filter: 'drop-shadow(0 6px 10px rgba(120,72,28,0.28))',
            }}
            animate={{
              rotate: food.sway?.rotate ?? [-6, 6, -6],
              y: food.sway?.y ?? [-3, 3, -3],
            }}
            transition={{
              duration: food.sway?.duration ?? 2.4,
              delay: food.sway?.delay ?? 0,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      ))}

      {!reduce && (
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          initial="rest"
          whileHover="hover"
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        >
          <motion.rect
            x="1.2"
            y="1.2"
            width="97.6"
            height="97.6"
            rx="3"
            ry="3"
            fill="none"
            stroke="#C4884F"
            strokeWidth="0.45"
            strokeDasharray="2 1.5"
            strokeLinecap="round"
            variants={{
              rest: { pathLength: 0 },
              hover: { pathLength: 1, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          />
        </motion.svg>
      )}


      {splash && !reduce && (
        <motion.span
          key={splash.key}
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${splash.x}%`,
            top: `${splash.y}%`,
            width: 8,
            height: 8,
            translateX: '-50%',
            translateY: '-50%',
            background:
              'radial-gradient(circle, rgba(216,92,59,0.55) 0%, rgba(216,92,59,0.25) 45%, rgba(216,92,59,0) 75%)',
          }}
          initial={{ scale: 0.6, opacity: 0.95 }}
          animate={{ scale: 22, opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onAnimationComplete={() => setSplash(null)}
        />
      )}

      {hotspots.map((hs) => (
        <Hotspot key={hs.label} {...hs} />
      ))}
      </motion.div>
    </motion.div>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" aria-label={alt}>
        {cardInner}
      </a>
    );
  }
  return (
    <Link to={to} aria-label={alt}>
      {cardInner}
    </Link>
  );
}

function Hotspot({ label, href, region, external = true }) {
  const reduce = useReducedMotion();
  const stop = (e) => e.stopPropagation();
  const linkProps = external
    ? { href, target: '_blank', rel: 'noreferrer' }
    : { href };
  return (
    <motion.a
      {...linkProps}
      onClick={stop}
      onPointerDown={stop}
      aria-label={label}
      title={label}
      className="absolute block rounded-full"
      style={{
        left: `${region.left * 100}%`,
        top: `${region.top * 100}%`,
        width: `${region.width * 100}%`,
        height: `${region.height * 100}%`,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.06,
              boxShadow:
                '0 0 0 3px rgba(196, 136, 79, 0.55), 0 10px 22px -8px rgba(120, 72, 28, 0.55)',
              backgroundColor: 'rgba(255, 244, 226, 0.18)',
            }
      }
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 460, damping: 22 }}
    />
  );
}
