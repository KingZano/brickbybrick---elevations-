import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  photoCount: number;
}

export function GalleryModal({ isOpen, onClose, category, photoCount }: GalleryModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/95 backdrop-blur-sm p-4 sm:p-8"
      >
        {/* Close Button */}
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
            <div className="w-20 h-1 bg-[#F5A200] mt-3 mx-auto sm:mx-0 rounded" />
          </div>

          {/* Grid of photo placeholders */}
          <div className="flex-1 overflow-y-auto min-h-0 pr-1 sm:pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-8">
              {Array.from({ length: photoCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="aspect-[4/3] w-full bg-gray-800 border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden group rounded-lg"
                >
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #F5A200 25%, transparent 25%, transparent 75%, #F5A200 75%, #F5A200), repeating-linear-gradient(45deg, #F5A200 25%, #1A1A1A 25%, #1A1A1A 75%, #F5A200 75%, #F5A200)',
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundSize: '20px 20px'
                  }} />
                  <div className="z-10 text-center px-4">
                    <span className="block font-bold text-[#F5A200] text-base sm:text-lg uppercase tracking-wider mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Photo {i + 1}
                    </span>
                    <span className="block text-gray-400 text-sm">
                      {category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
