import { motion, useReducedMotion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';
import FloatingNotes from '../components/FloatingNotes.jsx';
import LofiVisualizer from '../components/LofiVisualizer.jsx';

const SPOTIFY_EMBED =
  'https://open.spotify.com/embed/album/2KzchDDaH4IPe2OKY3rowy?utm_source=generator&theme=0';
const SPOTIFY_URL =
  'https://open.spotify.com/album/2KzchDDaH4IPe2OKY3rowy?si=k3n1w4fxTLmhR6EoYBVImg';
// Apple Music doesn't expose a stable URL for this album from what we know,
// so we link to a search that lands the user on the right artist/album.
const APPLE_MUSIC_URL =
  'https://music.apple.com/us/search?term=Coco%20Cruise%20Lofi%20Travel%20House';

// Coordinates of the two pills inside music.png (979x490).
// Apple and Spotify pills sit side-by-side just below the "Chill Beats, Good Vibes" line.
const APPLE_REGION = { left: 0.355, top: 0.69, width: 0.185, height: 0.17 };
const SPOTIFY_REGION = { left: 0.555, top: 0.69, width: 0.205, height: 0.17 };

export default function Music() {
  const reduce = useReducedMotion();
  return (
    <PageLayout bottomPadding="pb-36 lg:pb-32">
      <HeaderLink className="-mt-[25px] lg:-mt-[60px]" />

      <div className="px-2 sm:px-3">
        {/* Hero illustration with Apple/Spotify hotspots */}
        <MusicHero reduce={reduce} />

        {/* Cassette / radio frame with the Spotify embed */}
        <div className="relative mt-3">
          <FloatingNotes />

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: -0.6 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative mx-auto"
            style={{ maxWidth: 620 }}
          >
            <div
              className="rounded-[28px] p-3 sm:p-4 relative"
              style={{
                background:
                  'linear-gradient(180deg, #F4DDB8 0%, #EDC891 60%, #E0B176 100%)',
                boxShadow:
                  '0 18px 30px -16px rgba(120,72,28,0.35), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -3px 8px rgba(120,72,28,0.18)',
                border: '2px solid #B98452',
              }}
            >
              <div
                className="absolute inset-1 rounded-[22px] pointer-events-none"
                style={{ border: '1.5px dashed rgba(120, 72, 28, 0.35)' }}
              />

              <div className="flex items-center justify-between px-2 pt-1 pb-2">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: '#D85C3B' }}
                    animate={reduce ? undefined : { opacity: [1, 0.45, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span
                    className="text-[11px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: '#7A4B22' }}
                  >
                    On Air
                  </span>
                  <span className="ml-2">
                    <LofiVisualizer height={14} />
                  </span>
                </div>
                <span
                  className="text-[11px] tracking-wider font-semibold"
                  style={{ color: '#7A4B22' }}
                >
                  CocoCruise · Lofi
                </span>
              </div>

              <div
                className="rounded-[18px] overflow-hidden relative"
                style={{
                  boxShadow:
                    'inset 0 0 0 2px rgba(120, 72, 28, 0.35), inset 0 6px 14px rgba(120, 72, 28, 0.18)',
                  background: '#2a1f17',
                }}
              >
                <iframe
                  title="Coco Cruise · Lofi Travel House"
                  src={SPOTIFY_EMBED}
                  width="100%"
                  height="380"
                  frameBorder="0"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  style={{ display: 'block', borderRadius: 18 }}
                />
              </div>

              <div className="flex items-center justify-between px-2 pt-2 pb-1 gap-2 flex-wrap">
                <span
                  className="text-[10.5px] tracking-[0.2em] uppercase"
                  style={{ color: '#7A4B22', opacity: 0.8 }}
                >
                  ▷ Tune in · 收聽中
                </span>
                <div className="flex items-center gap-2">
                  <PillLink href={APPLE_MUSIC_URL} label="Apple Music ↗" tone="light" />
                  <PillLink href={SPOTIFY_URL} label="Spotify ↗" tone="dark" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="text-center text-[12.5px] mt-3 italic"
            style={{ color: '#7A5A38' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Made for slow afternoons · 慢慢聽，配杯熱奶茶 ☕
          </motion.p>
        </div>
      </div>
    </PageLayout>
  );
}

function MusicHero({ reduce }) {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: -8, rotate: -0.4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <img
        src="/assets/music.png"
        alt="音樂"
        className="w-full block select-none"
        draggable={false}
      />

      {/* Apple Music hotspot */}
      <HeroHotspot
        href={APPLE_MUSIC_URL}
        label="Open in Apple Music"
        region={APPLE_REGION}
        accent="#FA243C"
        reduce={reduce}
      />
      {/* Spotify hotspot */}
      <HeroHotspot
        href={SPOTIFY_URL}
        label="Open in Spotify"
        region={SPOTIFY_REGION}
        accent="#1DB954"
        reduce={reduce}
      />
    </motion.div>
  );
}

function HeroHotspot({ href, label, region, accent, reduce }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="absolute rounded-full"
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
              scale: 1.05,
              boxShadow: `0 0 0 3px ${accent}66, 0 10px 22px -8px ${accent}80`,
            }
      }
      whileTap={reduce ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 480, damping: 22 }}
    />
  );
}

function PillLink({ href, label, tone }) {
  const styles =
    tone === 'dark'
      ? { backgroundColor: '#7A4B22', color: '#FDF4EA' }
      : { backgroundColor: '#FDF4EA', color: '#7A4B22', border: '1.5px solid #B98452' };
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[11px] font-semibold rounded-full px-3 py-1 transition-transform hover:scale-[1.04] active:scale-[0.97]"
      style={{ ...styles, textDecoration: 'none', whiteSpace: 'nowrap' }}
    >
      {label}
    </a>
  );
}
