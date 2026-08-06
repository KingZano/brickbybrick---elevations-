import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'wouter';
import { ShieldCheck, HardHat, FileText, CheckCircle2, ChevronRight, Hammer, Paintbrush, Square, Droplets, Home as HomeIcon, PanelTop, BadgeCheck, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const WHATSAPP_URL = "https://wa.me/27000000000?text=Hi,%20I'd%20like%20a%20free%20quote";

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
      <section className="relative w-full pt-16 pb-24 md:pt-32 md:pb-40 px-4 flex flex-col items-center justify-center min-h-[90vh] bg-brand-black overflow-hidden border-b border-brand-border">
        {/* Subtle grid background to look industrial */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-brand-orange font-bold tracking-[0.2em] text-sm md:text-lg mb-4 uppercase">
              Building & Renovation Services
            </h2>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-white mb-6 leading-none">
              <span className="block text-brand-orange">Brick</span>By<span className="text-brand-orange">Brick</span>
            </h1>
            <p className="text-2xl md:text-4xl font-display font-medium text-white/90 uppercase tracking-wide mb-12">
              We Build. We Fix. We Finish.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          >
            {[
              { text: 'CIPC Registered', icon: ShieldCheck },
              { text: 'Registered & Insured', icon: BadgeCheck },
              { text: 'Free Written Quotes', icon: FileText }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 bg-brand-gray px-4 py-2 border border-brand-border">
                <badge.icon className="w-5 h-5 text-brand-orange" />
                <span className="font-bold text-sm tracking-wider uppercase text-white/90">{badge.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-brand-orange text-black px-8 py-5 text-lg font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0"
            >
              Get Free Quote on WhatsApp
            </a>
            <Link
              href="/our-work"
              className="w-full sm:w-auto bg-transparent border-2 border-brand-border text-white px-8 py-5 text-lg font-bold uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Hero Project Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="aspect-[4/3] bg-brand-gray border border-brand-border flex items-center justify-center relative overflow-hidden"
              >
                {/* Construction striped background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #FF6B00 25%, #FF6B00 75%, #000 75%, #000)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }}></div>
                <div className="z-10 flex flex-col items-center">
                  <Hammer className="w-8 h-8 text-brand-orange/50 mb-2" />
                  <span className="font-display text-xl font-bold uppercase tracking-wider text-white/50">
                    Project Photo
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 px-4 bg-brand-gray border-b border-brand-border relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Wrench className="w-16 h-16 text-brand-orange mx-auto mb-8 opacity-20" />
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-white mb-8">
            Your Trusted Local Builders
          </h2>
          <div className="w-24 h-2 bg-brand-orange mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium">
            BrickByBrick Elevations PTY LTD is a CIPC Registered and insured building company serving Vereeniging, Vanderbijlpark, Sasolburg and surrounding areas. We build homes, renovate properties and complete projects with quality workmanship from start to finish.
          </p>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-24 px-4 bg-brand-black border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-white">
                Our Services
              </h2>
              <div className="w-24 h-2 bg-brand-orange mt-4"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-brand-gray p-8 sm:p-10 border border-brand-border hover:border-brand-orange transition-colors cursor-default"
              >
                <service.icon className="w-12 h-12 text-brand-orange mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-3xl font-bold uppercase text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-brand-orange text-sm font-bold tracking-widest uppercase flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  Available <ChevronRight className="w-4 h-4" />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-24 px-4 bg-brand-gray border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-center text-white mb-16">
            Why Choose Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Written Quotes", desc: "No hidden fees. You know exactly what you pay for before we start." },
              { title: "We Finish What We Start", desc: "We don't juggle 20 sites at once. Your project gets our full attention." },
              { title: "Registered & Insured", desc: "CIPC registered. Professional. Accountable for every brick laid." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-brand-black p-8 border border-brand-border flex flex-col items-center text-center shadow-lg"
              >
                <CheckCircle2 className="w-16 h-16 text-brand-orange mb-6" />
                <h3 className="font-display text-2xl font-bold uppercase text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROMO BANNER */}
      <section className="bg-brand-orange py-20 px-4 text-center border-y-8 border-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase text-black mb-2 leading-none">
            Free Quote
          </h2>
          <p className="font-display text-3xl md:text-5xl font-bold uppercase text-white mb-10 tracking-wide drop-shadow-md">
            10% Off Your First Job
          </p>
          
          <div className="mb-12 text-center">
            <span className="block text-black font-bold uppercase tracking-widest text-sm mb-2">Use Code</span>
            <div className="border-4 border-dashed border-black px-10 py-4 bg-white/20 inline-block transform -rotate-2">
              <span className="font-display text-4xl md:text-6xl font-black text-black tracking-widest uppercase">
                BRICK10
              </span>
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-6 text-xl md:text-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]"
          >
            Claim Your Discount on WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
