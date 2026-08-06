import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Phone, Mail, MessageCircle, Send, MapPin } from 'lucide-react';

const PHONE_DISPLAY = '074 775 6722';
const PHONE_HREF = 'tel:+27747756722';
const WHATSAPP_URL = "https://wa.me/27747756722?text=Hi,%20I'd%20like%20a%20free%20quote";
const EMAIL = 'brickbybrick.elevations@gmail.com';

const AREAS = ['Vereeniging', 'Vanderbijlpark', 'Sasolburg', 'Meyerton', 'Three Rivers', 'Surrounding Areas'];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Quote Request from BrickByBrick Website*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A%0A*What they need:*%0A${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/27747756722?text=${text}`, '_blank');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-14 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Let's Build Together
            </h1>
            <div className="w-20 h-1.5 bg-[#F5A200] mx-auto mb-6 rounded" />
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
              Ready to start? Get in touch for a free, no-obligation written quote.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          {/* Three Contact Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors rounded-xl group shadow-lg"
            >
              <MessageCircle className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>WhatsApp</span>
              <span className="text-white/90 font-bold text-lg">{PHONE_DISPLAY}</span>
              <span className="mt-1 text-white/70 text-xs uppercase tracking-widest">Fastest Response</span>
            </a>

            <a
              href={PHONE_HREF}
              className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-200 hover:border-[#F5A200] text-gray-800 transition-colors rounded-xl group shadow-sm"
            >
              <Phone className="w-12 h-12 mb-3 text-[#F5A200] group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold uppercase tracking-wider text-gray-900 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>Call Us</span>
              <span className="text-[#F5A200] font-bold text-lg">{PHONE_DISPLAY}</span>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-200 hover:border-[#F5A200] text-gray-800 transition-colors rounded-xl group shadow-sm"
            >
              <Mail className="w-12 h-12 mb-3 text-[#F5A200] group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold uppercase tracking-wider text-gray-900 mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>Email Us</span>
              <span className="text-gray-500 text-sm text-center break-all">{EMAIL}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quote Form */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 sm:p-10 shadow-sm">
              <h2 className="text-3xl font-black uppercase text-gray-900 mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Request a Free Quote
              </h2>
              <div className="w-14 h-1 bg-[#F5A200] mb-8 rounded" />

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-widest text-[#F5A200] mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-[#F5A200] px-4 py-3 text-gray-900 rounded outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-widest text-[#F5A200] mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-[#F5A200] px-4 py-3 text-gray-900 rounded outline-none transition-colors"
                      placeholder="082 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-widest text-[#F5A200] mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    What do you need?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-[#F5A200] px-4 py-3 text-gray-900 rounded outline-none transition-colors resize-none"
                    placeholder="Describe your project (e.g. I need my kitchen floor retiled...)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-200 bg-gray-50 p-5 text-center rounded hover:border-[#F5A200] transition-colors">
                    <input type="file" id="photo" className="hidden" accept="image/*" />
                    <label htmlFor="photo" className="cursor-pointer text-gray-400 text-sm">
                      Click to attach a photo of the space
                    </label>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">You can also attach photos directly in WhatsApp after submitting.</p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 px-8 text-xl font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors rounded shadow-lg mt-2"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  <Send className="w-5 h-5" />
                  Send My Quote Request
                </button>
              </form>
            </div>

            {/* Areas We Serve sidebar */}
            <div className="space-y-5">
              <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#F5A200]" />
                  <h3 className="font-bold uppercase tracking-wider text-gray-900" style={{ fontFamily: 'Oswald, sans-serif' }}>Areas We Serve</h3>
                </div>
                <ul className="space-y-2">
                  {AREAS.map((area) => (
                    <li key={area} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A200] flex-shrink-0" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 rounded-xl p-7 text-center">
                <p className="text-[#F5A200] font-bold uppercase tracking-wide text-sm mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Fastest way to reach us
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold uppercase tracking-widest px-5 py-4 rounded hover:bg-[#20bd5a] transition-colors w-full"
                  style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
