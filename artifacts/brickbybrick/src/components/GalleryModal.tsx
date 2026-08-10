import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  photos: string[]; // array of image src URLs
}

export function GalleryModal({ isOpen, onClose, category, photos }: GalleryModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setLightboxIndex(null);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = useCallback(() => setLightboxIndex(i => (i === null ? 0 : (i - 1 + photos.length) % photos.length)), [photos.length]);
  const next = useCallback(() => setLightboxIndex(i => (i === null ? 0 : (i + 1) % photos.length)), [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/95 backdrop-blur-sm p-4 sm:p-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-white hover:text-[#F5A200] bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
          aria-label="Close modal"
        >
          <X className="w-7 h-7 sm:w-9 sm:h-9" />
        </button>

        <div className="w-full max-w-6xl flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="mb-6 text-center sm:text-left flex-shrink-0 pt-12 sm:pt-0">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-wide text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
              {category}
            </h2>
            <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
              <div className="w-20 h-1 bg-[#F5A200] rounded" />
              <span className="text-gray-400 text-sm">{photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 sm:pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-8">
              {photos.map((src, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.6) }}
                  onClick={() => openLightbox(i)}
                  className="aspect-square w-full overflow-hidden rounded-lg group relative bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F5A200]"
                >
                  <img
                    src={src}
                    alt={`${category} — photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      View
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                className="absolute top-4 right-4 p-2.5 text-white hover:text-[#F5A200] bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              >
                <X className="w-7 h-7" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 p-3 text-white hover:text-[#F5A200] bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                src={photos[lightboxIndex]}
                alt={`${category} — photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 p-3 text-white hover:text-[#F5A200] bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
