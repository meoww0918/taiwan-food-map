import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PageLayout from '../layouts/PageLayout.jsx';
import HeaderLink from '../components/HeaderLink.jsx';

export default function NotFound() {
  const reduce = useReducedMotion();
  return (
    <PageLayout>
      <HeaderLink />

      <div className="px-4 -mt-[25px] lg:-mt-[90px] flex flex-col items-center text-center gap-4">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            className="px-6 py-5"
            style={{
              background: 'linear-gradient(180deg, #FBE9CC 0%, #F4D6A6 100%)',
              border: '2px dashed #B98452',
              borderRadius: 16,
              boxShadow:
                '0 12px 22px -10px rgba(120,72,28,0.4), inset 0 1px 0 rgba(255,255,255,0.55)',
              maxWidth: 380,
              transformOrigin: 'center',
            }}
            animate={
              reduce
                ? undefined
                : {
                    rotate: [-1.5, 1.5, -1.5],
                    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
          >
            <div
              className="text-5xl mb-2 select-none"
              aria-hidden="true"
              style={{ filter: 'drop-shadow(0 2px 0 rgba(120,72,28,0.18))' }}
            >
              🐱❓
            </div>
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-1"
              style={{ color: '#A06432' }}
            >
              404 — Lost in Taiwan
            </div>
            <div className="text-base font-semibold" style={{ color: '#5A3A1A' }}>
              迷路了 · Coco can't find this page
            </div>
            <div className="text-[12.5px] italic mt-1.5" style={{ color: '#7A5A38' }}>
              Maybe it wandered off to find more dumplings 🥟
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-block text-[13px] font-semibold rounded-full px-5 py-2 transition-transform hover:scale-[1.04] active:scale-[0.97]"
            style={{
              backgroundColor: '#7A4B22',
              color: '#FDF4EA',
              textDecoration: 'none',
            }}
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Paw-print trail leading home */}
        {!reduce && (
          <div className="flex gap-2 opacity-60 mt-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="select-none"
                style={{ fontSize: 14, color: '#A06432' }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.18 }}
              >
                🐾
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
