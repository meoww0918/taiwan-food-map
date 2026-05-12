import { motion, useReducedMotion } from 'framer-motion';

export default function ComingSoon({ heroSrc, heroAlt, heroClassName = '-mt-[25px] lg:-mt-[130px]', tagline }) {
  const reduce = useReducedMotion();
  return (
    <div className="px-2 sm:px-3">
      <motion.img
        src={heroSrc}
        alt={heroAlt}
        className={`w-full block ${heroClassName}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        draggable={false}
      />

      <div className="mt-5 mb-6 flex flex-col items-center">
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <motion.div
            animate={
              reduce
                ? undefined
                : {
                    rotate: [-1.5, 1.5, -1.5],
                    transition: { duration: 4.4, repeat: Infinity, ease: 'easeInOut' },
                  }
            }
            className="px-5 py-3 text-center"
            style={{
              background:
                'linear-gradient(180deg, #FBE9CC 0%, #F4D6A6 100%)',
              border: '2px dashed #B98452',
              borderRadius: 14,
              boxShadow:
                '0 8px 18px -10px rgba(120,72,28,0.35), inset 0 1px 0 rgba(255,255,255,0.55)',
              maxWidth: 360,
              transformOrigin: 'top center',
            }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-1"
              style={{ color: '#A06432' }}
            >
              Coming Soon
            </div>
            <div className="text-base font-semibold" style={{ color: '#5A3A1A' }}>
              還在路上 ✦ 敬請期待
            </div>
            {tagline && (
              <div className="text-[12.5px] italic mt-1.5" style={{ color: '#7A5A38' }}>
                {tagline}
              </div>
            )}
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              backgroundColor: '#D85C3B',
              boxShadow: '0 1px 0 rgba(0,0,0,0.15), 0 0 0 2px #FDF4EA',
            }}
            animate={
              reduce ? undefined : { scale: [1, 1.08, 1], transition: { duration: 2.4, repeat: Infinity } }
            }
          />
        </motion.div>

        <motion.p
          className="text-center text-[12px] mt-4 px-4"
          style={{ color: '#8A6A48' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          這頁還在繪製中，先逛逛美食地圖吧 🍜
        </motion.p>
      </div>
    </div>
  );
}
