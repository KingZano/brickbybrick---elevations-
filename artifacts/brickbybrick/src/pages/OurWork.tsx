import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { GalleryModal } from '@/components/GalleryModal';
import { ArrowRight, Camera, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = '074 775 6722';
const WHATSAPP_URL = "https://wa.me/27747756722?text=Hi,%20I'd%20like%20a%20free%20quote";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function img(name: string) {
  return `${BASE}/images/${name}`;
}

const CATEGORIES: { name: string; photos: string[] }[] = [
  {
    name: 'Security Gates & Burglar Bars',
    photos: [
      'IMG-20260806-WA0320.jpg',
      'IMG-20260806-WA0321.jpg',
      'IMG-20260806-WA0322.jpg',
      'IMG-20260806-WA0324.jpg',
      'IMG-20260806-WA0326.jpg',
      'IMG-20260806-WA0328.jpg',
      'IMG-20260806-WA0330.jpg',
      'IMG-20260806-WA0332.jpg',
      'IMG-20260806-WA0334.jpg',
      'IMG-20260806-WA0337.jpg',
      'IMG-20260806-WA0338.jpg',
    ].map(img),
  },
  {
    name: 'Wooden Doors Installation',
    photos: [
      'IMG-20260806-WA0323.jpg',
      'IMG-20260806-WA0325.jpg',
      'IMG-20260806-WA0329.jpg',
      'IMG-20260806-WA0333.jpg',
      'IMG-20260806-WA0339.jpg',
    ].map(img),
  },
  {
    name: 'Geyser & Hot Water Pipe Repair',
    photos: [
      'IMG-20260806-WA0327.jpg',
      'IMG-20260806-WA0331.jpg',
      'IMG-20260806-WA0335.jpg',
      'IMG-20260806-WA0341.jpg',
    ].map(img),
  },
  {
    name: 'PVC & Rhino-board Ceilings',
    photos: [
      'IMG-20260806-WA0342.jpg',
      'IMG-20260806-WA0344.jpg',
      'IMG-20260806-WA0345.jpg',
      'IMG-20260806-WA0348.jpg',
      'IMG-20260806-WA0349.jpg',
      'IMG-20260806-WA0350.jpg',
      'IMG-20260806-WA0351.jpg',
      'mo.jpg',
    ].map(img),
  },
];

export default function OurWork() {
  const [selected, setSelected] = useState<typeof CATEGORIES[0] | null>(null);

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
              Real projects. Real results. Browse our completed work across the Vaal Triangle — click any category to view the full gallery.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          {/* Top CTA */}
          <div className="mb-10">
            <WACta />
          </div>

          {/* Category grid with preview thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, index) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelected(cat)}
                className="group relative w-full text-left bg-white border-2 border-gray-100 hover:border-[#F5A200] transition-all duration-200 overflow-hidden rounded-xl shadow-sm hover:shadow-lg"
              >
                {/* Thumbnail strip */}
                <div className="grid grid-cols-4 gap-0.5 h-44 overflow-hidden">
                  {cat.photos.slice(0, 4).map((src, i) => (
                    <div key={i} className="overflow-hidden bg-gray-200">
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Label bar */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <Camera className="w-4 h-4 text-[#F5A200]" />
                      <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">
                        {cat.photos.length} Photos
                      </span>
                    </div>
                    <h3 className="text-xl font-black uppercase text-gray-900 leading-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {cat.name}
                    </h3>
                  </div>
                  <span className="text-[#F5A200] font-bold text-sm tracking-widest uppercase flex items-center gap-1 group-hover:translate-x-1.5 transition-transform" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    View All <ArrowRight className="w-4 h-4" />
                  </span>
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
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        category={selected?.name ?? ''}
        photos={selected?.photos ?? []}
      />
    </Layout>
  );
}
