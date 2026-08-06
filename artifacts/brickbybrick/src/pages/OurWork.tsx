import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { GalleryModal } from '@/components/GalleryModal';
import { ArrowRight, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const handleCloseGallery = () => {
    setSelectedCategory(null);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-brand-black pb-24">
        {/* Header */}
        <div className="bg-brand-gray border-b border-brand-border py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-white mb-6">
              Our Work
            </h1>
            <div className="w-24 h-2 bg-brand-orange mb-8"></div>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl font-medium">
              We let our results do the talking. Browse our completed projects across the Vaal Triangle. Select a category below to view the gallery.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleOpenGallery(cat.name, cat.count)}
                className="group relative w-full text-left bg-brand-gray border border-brand-border hover:border-brand-orange transition-all duration-300 overflow-hidden flex flex-col h-64 sm:h-72"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full transition-transform group-hover:scale-150 group-hover:bg-brand-orange/10"></div>
                
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <Camera className="w-8 h-8 text-brand-orange/50 mb-4 group-hover:text-brand-orange transition-colors" />
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-brand-border/50">
                    <span className="text-brand-white/50 text-sm font-bold tracking-widest uppercase">
                      {cat.count} Photos
                    </span>
                    <span className="text-brand-orange font-bold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      View Project <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
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
