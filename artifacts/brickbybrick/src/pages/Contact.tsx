import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const WHATSAPP_NUMBER = "27000000000"; // Replace with real number
  const WHATSAPP_URL_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
  const CALL_URL = `tel:+${WHATSAPP_NUMBER}`;
  const EMAIL_URL = "mailto:info@brickbybrick.co.za";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message text
    const text = `*New Quote Request*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Needs:* ${formData.message}`;
    
    // Open WhatsApp with prefilled message
    window.open(`${WHATSAPP_URL_BASE}?text=${text}`, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-brand-black pb-24">
        {/* Header */}
        <div className="bg-brand-gray border-b border-brand-border py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-white mb-6">
              Let's Build Together
            </h1>
            <div className="w-24 h-2 bg-brand-orange mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium">
              Ready to start your next project? Get in touch for a free, no-obligation written quote.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {/* Action Buttons Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <a
              href={`${WHATSAPP_URL_BASE}?text=Hi,%20I'd%20like%20a%20free%20quote`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors border-2 border-[#25D366] hover:border-white group"
            >
              <MessageCircle className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl font-bold uppercase tracking-wider">WhatsApp</span>
              <span className="mt-2 opacity-90 text-sm font-medium tracking-widest uppercase">Fastest Response</span>
            </a>

            <a
              href={CALL_URL}
              className="flex flex-col items-center justify-center p-8 bg-brand-gray border border-brand-border hover:border-brand-orange text-white hover:text-brand-orange transition-colors group"
            >
              <Phone className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl font-bold uppercase tracking-wider">Call Us</span>
              <span className="mt-2 text-white/50 text-sm font-medium tracking-widest uppercase">000 000 0000</span>
            </a>

            <a
              href={EMAIL_URL}
              className="flex flex-col items-center justify-center p-8 bg-brand-gray border border-brand-border hover:border-white text-white transition-colors group"
            >
              <Mail className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl font-bold uppercase tracking-wider">Email Us</span>
              <span className="mt-2 text-white/50 text-sm font-medium tracking-widest uppercase">info@brickbybrick.co.za</span>
            </a>
          </div>

          {/* Form Section */}
          <div className="bg-brand-gray border border-brand-border p-8 sm:p-12 shadow-2xl relative">
            {/* Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-brand-orange pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-brand-orange pointer-events-none"></div>

            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white mb-4">
                  Request a Free Quote
                </h2>
                <p className="text-white/60">Fill out the details below and we'll reply on WhatsApp.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-brand-orange">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-brand-black border-2 border-brand-border px-4 py-4 text-white focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-widest text-brand-orange">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-brand-black border-2 border-brand-border px-4 py-4 text-white focus:outline-none focus:border-brand-orange transition-colors"
                      placeholder="082 123 4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-brand-orange">
                    What do you need?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-brand-black border-2 border-brand-border px-4 py-4 text-white focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    placeholder="Describe your project (e.g. I need my kitchen floor retiled...)"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold uppercase tracking-widest text-white/50">
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-brand-border bg-brand-black/50 p-6 text-center cursor-pointer hover:border-brand-orange transition-colors">
                    <input
                      type="file"
                      id="photo"
                      className="hidden"
                      accept="image/*"
                    />
                    <label htmlFor="photo" className="cursor-pointer text-white/60 text-sm">
                      Click to attach a photo of the space
                    </label>
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    Note: Since this sends to WhatsApp, you can also attach photos directly in the chat.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange text-black py-6 px-8 font-display text-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3 mt-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  <Send className="w-6 h-6" />
                  Send My Quote Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
