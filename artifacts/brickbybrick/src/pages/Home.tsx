import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'wouter';
import {
  ShieldCheck, HardHat, FileText, CheckCircle2, ChevronRight,
  Hammer, Paintbrush, Square, Droplets, Home as HomeIcon, PanelTop,
  BadgeCheck, Wrench, MessageCircle, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = '074 775 6722';
const PHONE_HREF = 'tel:+27747756722';
const WHATSAPP_URL = "https://wa.me/27747756722?text=Hi,%20I'd%20like%20a%20free%20quote";
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const FEATURED_PROJECTS = [
  {
    label: 'Project 1',
    name: 'Custom-Fitted Security',
    image: `${BASE}/images/project-1-security.jpg`,
  },
  {
    label: 'Project 2',
    name: 'Modern LED Ceiling',
    image: `${BASE}/images/project-2-ceiling.jpg`,
  },
  {
    label: 'Project 3',
    name: 'Plumbing Installation',
    image: `${BASE}/images/project-3-plumbing.jpg`,
  },
];

export default function Home() {
  const services = [
    { name: 'New Builds', icon: HardHat },
    { name: 'Painting', icon: Paintbrush },
    { name: 'Tiling', icon: Square },
    { name: 'Plumbing', icon: Droplets },
    { name: 'Roofing', icon: HomeIcon },
    { name: 'PVC Ceilings', icon: PanelTop },
  ];

  return (
    <Layout>
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-16 pb-24 md:pt-28 md:pb-36 px-4 flex flex-col items-center justify-center min-h-[90vh] bg-gray-900 overflow-hidden border-b-4 border-[#F5A200]">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F5A200 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="text-[#F5A200] font-bold tracking-[0.22em] text-sm md:text-base mb-4 uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Building & Renovation Services
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tight text-white mb-4 leading-none" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <span className="text-[#F5A200]">BRICK</span>BY<span className="text-[#F5A200]">BRICK</span>
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-white/80 uppercase tracking-wide mb-10" style={{ fontFamily: 'Oswald, sans-serif' }}>
              We Build. We Fix. We Finish.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10"
          >
            {[
              { text: 'CIPC Registered', icon: ShieldCheck },
              { text: 'Registered & Insured', icon: BadgeCheck },
              { text: 'Free Written Quotes', icon: FileText },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded">
                <badge.icon className="w-5 h-5 text-[#F5A200]" />
                <span className="font-bold text-sm tracking-wider uppercase text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>{badge.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 text-lg font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors rounded shadow-xl"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              <MessageCircle className="w-6 h-6" />
              <span>Get FREE Quote — {PHONE_DISPLAY}</span>
            </a>
            <Link
              href="/our-work"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 text-white px-8 py-5 text-lg font-bold uppercase tracking-widest hover:border-[#F5A200] hover:text-[#F5A200] transition-colors rounded"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Featured Project Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {FEATURED_PROJECTS.map((project, i) => (
              <motion.div
                key={project.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.12 }}
                className="aspect-[4/3] bg-gray-800 border border-gray-700 relative overflow-hidden rounded group"
              >
                <img
                  src={project.image}
                  alt={`${project.label}: ${project.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-16 pb-4 px-5">
                  <span className="block text-[#F5A200] font-bold text-sm uppercase tracking-widest" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {project.label}
                  </span>
                  <span className="block text-white text-lg font-bold uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    {project.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Wrench className="w-12 h-12 text-[#F5A200] mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black uppercase text-gray-900 mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Your Trusted Local Builders
          </h2>
          <div className="w-20 h-1.5 bg-[#F5A200] mx-auto mb-8 rounded" />
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            BrickByBrick Elevations PTY LTD is a CIPC Registered and insured building company serving Vereeniging, Vanderbijlpark, Sasolburg and surrounding areas. We build homes, renovate properties and complete projects with quality workmanship from start to finish.
          </p>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-20 px-4 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Our Services
            </h2>
            <div className="w-20 h-1.5 bg-[#F5A200] mt-4 rounded mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group bg-white border-2 border-gray-100 hover:border-[#F5A200] p-8 rounded transition-all duration-200 cursor-default shadow-sm hover:shadow-md"
              >
                <service.icon className="w-10 h-10 text-[#F5A200] mb-5 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold uppercase text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {service.name}
                </h3>
                <p className="text-[#F5A200] text-sm font-bold tracking-widest uppercase flex items-center gap-1 mt-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Available <ChevronRight className="w-4 h-4" />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-center text-gray-900 mb-14" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Written Quotes', desc: 'No hidden fees. You know exactly what you pay for before we start.' },
              { title: 'We Finish What We Start', desc: "We don't juggle 20 sites at once. Your project gets our full attention." },
              { title: 'Registered & Insured', desc: 'CIPC registered. Professional. Accountable for every brick laid.' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 border-2 border-gray-100 hover:border-[#F5A200] p-8 rounded flex flex-col items-center text-center transition-colors"
              >
                <CheckCircle2 className="w-14 h-14 text-[#F5A200] mb-5" />
                <h3 className="text-xl font-bold uppercase text-gray-900 mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMO BANNER */}
      <section className="bg-[#F5A200] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase text-gray-900 mb-2 leading-none" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Free Quote
          </h2>
          <p className="text-2xl md:text-4xl font-bold uppercase text-white mb-8 tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
            10% Off Your First Job
          </p>
          <div className="mb-10 text-center">
            <span className="block text-gray-900 font-bold uppercase tracking-widest text-sm mb-3">Use Code</span>
            <div className="border-4 border-dashed border-gray-900/40 px-10 py-4 bg-white/30 inline-block rounded -rotate-1">
              <span className="text-4xl md:text-6xl font-black text-gray-900 tracking-widest uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                BRICK10
              </span>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-900 text-white px-8 py-5 text-xl font-bold uppercase tracking-widest hover:bg-black transition-colors rounded shadow-lg"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            <MessageCircle className="w-6 h-6" />
            Claim Your Discount on WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
