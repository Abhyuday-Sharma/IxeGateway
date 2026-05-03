import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, ChevronDown, Check, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const productOptions = [
  { value: '4-suta', label: 'Makhana — 4 Suta', sub: 'Industrial / Food Processing' },
  { value: '5-suta', label: 'Makhana — 5 Suta', sub: 'Commercial / Bulk Snacks' },
  { value: '6-suta', label: 'Makhana — 6 Suta', sub: 'Premium / Retail Packs' },
  { value: '7-suta', label: 'Makhana — 7 Suta', sub: 'Gourmet / Luxury Gifting' },
  { value: 'other',  label: 'Other Requirements', sub: 'Custom inquiry' },
];

/** Custom dropdown — styled to match the premium form aesthetic */
const CustomSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = productOptions.find(o => o.value === value) || productOptions[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '1rem 1rem',
          borderRadius: '10px',
          border: open ? '1.5px solid var(--gold-500)' : '1.5px solid var(--gray-200)',
          backgroundColor: 'var(--off-white)',
          fontSize: '1rem',
          fontFamily: 'var(--font-sans)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: open ? '0 0 0 3px rgba(212,168,67,0.12)' : 'none',
          outline: 'none',
          textAlign: 'left',
        }}
      >
        <div>
          <div style={{ color: 'var(--navy-900)', fontWeight: 500 }}>{selected.label}</div>
          <div style={{ color: 'var(--gray-400)', fontSize: '0.8rem', marginTop: '2px' }}>{selected.sub}</div>
        </div>
        <ChevronDown
          size={18}
          color="var(--gold-500)"
          style={{ flexShrink: 0, transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1.5px solid rgba(212,168,67,0.2)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
          zIndex: 100,
          overflow: 'hidden',
          animation: 'dropdownIn 0.18s ease',
        }}>
          {productOptions.map((opt) => {
            const isActive = opt.value === value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isActive ? 'rgba(212,168,67,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--off-white)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div>
                  <div style={{ color: isActive ? 'var(--gold-500)' : 'var(--navy-900)', fontWeight: isActive ? 600 : 400, fontSize: '0.95rem' }}>
                    {opt.label}
                  </div>
                  <div style={{ color: 'var(--gray-400)', fontSize: '0.78rem', marginTop: '1px' }}>{opt.sub}</div>
                </div>
                {isActive && <Check size={16} color="var(--gold-500)" style={{ flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const [productInterest, setProductInterest] = useState('4-suta');
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-elements',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getInputStyle = (name) => ({
    ...inputStyle,
    border: focused === name
      ? '1.5px solid var(--gold-500)'
      : '1.5px solid var(--gray-200)',
    boxShadow: focused === name ? '0 0 0 3px rgba(212,168,67,0.12)' : 'none',
    borderRadius: '10px',
  });

  return (
    <section id="contact" ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--off-white)', position: 'relative' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="contact-elements">
          <h5 style={{ color: 'var(--gold-500)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontSize: '1rem' }}>
            Get In Touch
          </h5>
          <h2 style={{ fontSize: '3rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            Request a Quote
          </h2>
          <p style={{ color: 'var(--gray-800)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Ready to partner with us? Fill out the form below and our team will get back to you with competitive export solutions.
          </p>
        </div>

        <div className="grid-2 contact-elements" style={{ gap: '4rem', alignItems: 'start' }}>

          {/* Contact CTA */}
          <div style={{ backgroundColor: 'white', padding: '4rem 3rem', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', border: '1px solid rgba(212, 168, 67, 0.1)' }}>
            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(212, 168, 67, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
              <Mail size={48} color="var(--gold-500)" />
            </div>
            <h3 style={{ fontSize: '2rem', color: 'var(--navy-900)' }}>Ready to Source?</h3>
            <p style={{ color: 'var(--gray-800)', fontSize: '1.1rem', maxWidth: '400px' }}>
              Connect with our export specialists to get a detailed quote tailored to your business needs.
            </p>
            <a href="/enquiry.html" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              Enquire Now <ChevronRight size={20} />
            </a>
          </div>

          {/* Contact Info Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-900)', marginBottom: '1.5rem' }}>Contact Information</h3>
              <p style={{ color: 'var(--gray-800)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Our team is available to discuss your sourcing needs and provide tailored export solutions.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: <Mail size={20} />, label: 'Email Us', value: 'info@ixegateway.com', href: 'mailto:info@ixegateway.com' },
                  { icon: <Phone size={20} />, label: 'Call Us', value: '+91 9315346713', href: 'tel:+919315346713' },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                    ),
                    label: 'WhatsApp',
                    value: '+91 9315346713',
                    href: 'https://wa.me/919315346713',
                    external: true
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ padding: '0.8rem', backgroundColor: 'var(--navy-900)', color: 'var(--gold-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--navy-800)', fontSize: '1rem', marginBottom: '0.2rem' }}>{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} style={{ color: 'var(--gray-800)', fontSize: '1rem' }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: 'var(--gray-800)', fontSize: '1rem', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media(max-width: 768px) {
          #contact form > div { grid-template-columns: 1fr !important; }
          #contact .grid-2  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  color: 'var(--gray-800)',
  marginBottom: '0.5rem',
  fontWeight: 600,
  letterSpacing: '0.3px',
};

const inputStyle = {
  width: '100%',
  padding: '0.95rem 1rem',
  borderRadius: '10px',
  border: '1.5px solid var(--gray-200)',
  backgroundColor: 'var(--off-white)',
  fontSize: '1rem',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  color: 'var(--navy-900)',
};

export default ContactSection;
