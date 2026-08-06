import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { GalleryModal } from '@/components/GalleryModal';
import { ArrowRight, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = '074 775 6722';
const WHATSAPP_URL = "https://wa.me/27747756722?text=Hi,%20I'd%20like%20a%20free%20quote";

export default function OurWork() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState<number>(0);

  const categories = [
    { name: 'Kitchen Floor Tiling', count: 4 },
    { name: 'Bathroom Tiling', count: 4 },
    { name: 'Roof Repairs & Installations', count: 4 },
    { name: 'Interior & Exterior Painting', count: 3 },
    { name: 'Boundary Wall Construction', count: 2 },
    { name: 'House Extensions & New Builds', count: 4 },
    { name: 'PVC Ceiling Installations', count: 3 },
    { name: 'Plumbing', count: 2 },
  ];

  const handleOpenGallery = (category: string, count: number) => {
    setSelectedCategory(category);
    setPhotoCount(count);
  };

  const handleCloseGallery = () => setSelectedCategory(null);

  const WACta = () => (
    <div className="bg-gray-900 rounded-xl py-8 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div>
        <p className="text-[#F5A200] font-bold text-xl uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Like what you see?
        </p>
        <p className="text-white text-lg font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Get a FREE Quote on WhatsApp — {PHONE_DISPLAY}
        </p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] text-white font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#20bd5a] transition-colors whitespace-nowrap"
        style={{ fontFamily: 'Oswald, sans-serif' }}
      >
        <MessageCircle className="w-5 h-5" />
        Get Free Quote
      </a>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-14 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Our Work
            </h1>
            <div className="w-20 h-1.5 bg-[#F5A200] mb-6 rounded" />
            <p className="text-xl text-gray-500 max-w-3xl font-medium">
              We let our results do the talking. Browse our completed projects across the Vaal Triangle. Click a category to view the gallery.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Top CTA */}
          <div className="mb-10">
            <WACta />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => handleOpenGallery(cat.name, cat.count)}
                className="group relative w-full text-left bg-white border-2 border-gray-100 hover:border-[#F5A200] transition-all duration-200 overflow-hidden flex flex-col h-60 rounded-lg shadow-sm hover:shadow-md"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#F5A200]/5 rounded-bl-full transition-transform group-hover:scale-150 group-hover:bg-[#F5A200]/10" />

                <div className="flex-1 p-6 flex flex-col justify-between relative z-10">
                  <div>
                    <Camera className="w-7 h-7 text-[#F5A200]/50 mb-3 group-hover:text-[#F5A200] transition-colors" />
                    <h3 className="text-2xl font-bold uppercase text-gray-900 leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {cat.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <span className="text-gray-400 text-sm font-bold tracking-widest uppercase">
                      {cat.count} Photos
                    </span>
                    <span className="text-[#F5A200] font-bold text-sm tracking-widest uppercase flex items-center gap-1 group-hover:translate-x-1.5 transition-transform" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      View Project <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <WACta />
          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={selectedCategory !== null}
        onClose={handleCloseGallery}
        category={selectedCategory || ''}
        photoCount={photoCount}
      />
    </Layout>
  );
}
