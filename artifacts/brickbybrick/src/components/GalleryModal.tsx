import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  photoCount: number;
}

export function GalleryModal({ isOpen, onClose, category, photoCount }: GalleryModalProps) {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-sm p-4 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 text-white hover:text-brand-orange bg-brand-gray/50 rounded-full transition-colors z-50"
          aria-label="Close modal"
        >
          <X className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>

        <div className="w-full max-w-6xl flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center sm:text-left flex-shrink-0 pt-12 sm:pt-0">
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white">
              {category}
            </h2>
            <div className="w-24 h-1 sm:w-32 sm:h-2 bg-brand-orange mt-2 sm:mt-4 mx-auto sm:mx-0"></div>
          </div>

          {/* Grid of placeholders */}
          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar pr-2 sm:pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-8">
              {Array.from({ length: photoCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-[4/3] w-full bg-brand-gray border border-brand-border flex flex-col items-center justify-center relative overflow-hidden group shadow-lg"
                >
                  {/* Subtle diagonal pattern for texture */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #FF6B00 25%, transparent 25%, transparent 75%, #FF6B00 75%, #FF6B00), repeating-linear-gradient(45deg, #FF6B00 25%, #1A1A1A 25%, #1A1A1A 75%, #FF6B00 75%, #FF6B00)',
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  <div className="z-10 text-center px-4">
                    <span className="block font-display text-brand-orange text-lg sm:text-xl font-bold uppercase tracking-wider mb-2">
                      Project Photo {i + 1}
                    </span>
                    <span className="block text-brand-white/50 text-sm font-medium">
                      {category}
                    </span>
                  </div>
                  
                  {/* Hover overlay just to make it feel alive */}
                  <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
