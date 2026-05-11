import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Long-press preview modal for a food map. Shows the high-resolution image
 * in a lightbox with two actions: download and share-as-postcard.
 *
 * Postcard generation uses canvas API only — no extra dependencies. The
 * postcard adds a cream margin + signature ribbon under the map, then
 * shares via Web Share API (mobile) or downloads (desktop fallback).
 */
export default function MapPreviewModal({ open, map, onClose, onDownload }) {
  const reduce = useReducedMotion();
  const [sharing, setSharing] = useState(false);
  const [shareNote, setShareNote] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!map) return null;

  const sharePostcard = async () => {
    setSharing(true);
    setShareNote('');
    try {
      const blob = await buildPostcardBlob(map);
      const file = new File([blob], `${map.filename.replace('.png', '')}-postcard.png`, {
        type: 'image/png',
      });
      if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share({
          title: map.alt,
          text: 'Made with Coco Cruise · Taiwan Food Map',
          files: [file],
        });
        setShareNote('Shared!');
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setShareNote('Saved postcard ✓');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        console.error('share failed', err);
        setShareNote('Share failed — try download instead');
      }
    } finally {
      setSharing(false);
      setTimeout(() => setShareNote(''), 2200);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center px-3 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(40, 26, 14, 0.62)', backdropFilter: 'blur(2px)' }}
          />

          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full rounded-[20px] flex flex-col"
            style={{
              maxWidth: 820,
              maxHeight: '92vh',
              background: 'linear-gradient(180deg, #FBF1DA 0%, #F0DAA4 100%)',
              border: '2px solid #B98452',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
            }}
            initial={{ scale: 0.85, y: 20, rotate: -1 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="absolute top-2 right-2 z-10 rounded-full w-8 h-8 flex items-center justify-center font-bold cursor-pointer"
              style={{ background: '#7A4B22', color: '#FDF4EA' }}
            >
              ✕
            </button>

            <div
              className="px-4 pt-3 pb-2 text-[11px] uppercase tracking-[0.2em] font-semibold flex-shrink-0"
              style={{ color: '#A06432' }}
            >
              Preview · 預覽
            </div>

            {/* Scrollable image area — image is contained so it always fits the modal */}
            <div className="px-3 flex-1 min-h-0 overflow-y-auto">
              <img
                src={map.full}
                alt={map.alt}
                className="w-full block rounded-[14px]"
                style={{
                  background: '#FCF4EA',
                  maxHeight: '70vh',
                  width: 'auto',
                  maxWidth: '100%',
                  margin: '0 auto',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Footer — buttons stack on small screens, side-by-side on sm+ */}
            <div className="flex-shrink-0 px-3 pt-2 pb-3">
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center sm:justify-between">
                <span
                  className="text-[12.5px] font-semibold italic text-center sm:text-left order-2 sm:order-1"
                  style={{ color: '#7A5A38' }}
                >
                  {shareNote || `${map.alt} · CocoCruise`}
                </span>
                <div className="flex gap-2 order-1 sm:order-2 justify-stretch">
                  <button
                    type="button"
                    onClick={sharePostcard}
                    disabled={sharing}
                    className="flex-1 sm:flex-none text-[13px] font-semibold rounded-full px-3 py-2 transition-transform hover:scale-[1.04] active:scale-[0.97] disabled:opacity-60 whitespace-nowrap"
                    style={{
                      background: '#FDF4EA',
                      color: '#7A4B22',
                      border: '1.5px solid #B98452',
                    }}
                  >
                    {sharing ? 'Saving…' : '✦ Share'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDownload?.();
                      onClose();
                    }}
                    className="flex-1 sm:flex-none text-[13px] font-semibold rounded-full px-3 py-2 transition-transform hover:scale-[1.04] active:scale-[0.97] whitespace-nowrap"
                    style={{ background: '#7A4B22', color: '#FDF4EA' }}
                  >
                    ↓ Download
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

async function buildPostcardBlob(map) {
  const img = await loadImage(map.full);
  const margin = 36;
  const ribbon = 96;
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth + margin * 2;
  canvas.height = img.naturalHeight + margin + ribbon;
  const ctx = canvas.getContext('2d');

  // Cream paper
  ctx.fillStyle = '#FCF4EA';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle dashed inner border
  ctx.strokeStyle = '#B98452';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);
  ctx.setLineDash([]);

  // Map image
  ctx.drawImage(img, margin, margin);

  // Signature ribbon
  const ribbonY = img.naturalHeight + margin + 14;
  ctx.fillStyle = '#5A3A1A';
  ctx.font = 'bold 28px "Segoe UI", "Helvetica Neue", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(map.alt, canvas.width / 2, ribbonY + 22);

  ctx.fillStyle = '#7A5A38';
  ctx.font = 'italic 18px "Segoe UI", "Helvetica Neue", system-ui, sans-serif';
  ctx.fillText('Made with 🍜 by Coco Cruise', canvas.width / 2, ribbonY + 50);

  return await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png', 0.95)
  );
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
