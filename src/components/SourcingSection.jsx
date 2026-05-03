import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map, Clock, ShieldCheck, Truck, Leaf, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Noise texture SVG (base64 encoded grain) ---------- */
const NOISE_FILTER = `
  <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
      <feComposite in="blend" in2="SourceGraphic" operator="in"/>
    </filter>
  </svg>
`;

const SourcingSection = () => {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      gsap.fromTo(".sourcing-title",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play reverse play reverse" } }
      );

      // Bento cards staggered reveal
      gsap.fromTo(elementsRef.current.filter(Boolean),
        { y: isMobile ? 40 : 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  const addRef = (index) => (el) => { elementsRef.current[index] = el; };

  return (
    <section id="sourcing" ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--navy-900)', color: 'white', overflow: 'hidden', position: 'relative' }}>

      {/* Noise overlay */}
      <div dangerouslySetInnerHTML={{ __html: NOISE_FILTER }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
      }} />

      {/* Ambient glow orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,67,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div className="sourcing-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1rem' }}>
            Origin &amp; <span style={{ color: 'var(--gold-400)' }}>Sourcing</span>
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            We work closely with trusted processors and supplier networks to ensure consistent quality and reliable supply.
          </p>
        </div>

        {/* ═══ BENTO GRID ═══ */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'auto',
          gap: '1.5rem',
        }}>

          {/* HERO CARD — Bihar origin, spans 7 cols */}
          <div
            ref={addRef(0)}
            style={{
              gridColumn: 'span 7',
              background: 'linear-gradient(135deg, rgba(15,33,64,0.85) 0%, rgba(10,22,40,0.95) 100%)',
              border: '1px solid rgba(212,168,67,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Top-right decorative globe */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.06 }}>
              <Map size={220} />
            </div>
            {/* Gold top accent line */}
            <div style={{ position: 'absolute', top: 0, left: '2.5rem', right: '2.5rem', height: '2px', background: 'linear-gradient(90deg, transparent, var(--gold-500), transparent)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Leaf size={20} color="var(--gold-400)" />
              <span style={{ color: 'var(--gold-400)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Origin Region</span>
            </div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--gold-300)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Bihar, India</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--gray-200)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              Our Makhana is sourced from the finest growing regions of Bihar, globally recognized as the premium hub for Fox Nuts. Unique climatic conditions and traditional cultivation contribute to superior size, texture, and quality.
            </p>

            {/* Shelf life badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '12px' }}>
              <Clock size={18} color="var(--gold-400)" />
              <div>
                <div style={{ color: 'var(--gold-400)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Shelf Life</div>
                <div style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: 500 }}>Up to 12 months in proper storage</div>
              </div>
            </div>
          </div>

          {/* QUALITY CARD — spans 5 cols */}
          <div
            ref={addRef(1)}
            style={{
              gridColumn: 'span 5',
              background: 'rgba(212,168,67,0.05)',
              border: '1px solid rgba(212,168,67,0.15)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={20} color="var(--gold-400)" />
              <span style={{ color: 'var(--gold-400)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Quality Standards</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Quality-Focused Procurement</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {[
                'Consistent sizing and grading (5, 6, 7 Suta)',
                'Clean, well-expanded, and bright appearance',
                'Low breakage and controlled moisture levels',
                'Batch-wise quality verification before dispatch',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--gray-200)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', flexShrink: 0, marginTop: '7px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* STAT CARD 1 — Sourcing Network */}
          <div
            ref={addRef(2)}
            style={{
              gridColumn: 'span 4',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <BarChart3 size={28} color="var(--gold-400)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>Sourcing Network</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                '✓ Established growing regions',
                '✓ Experienced processors',
                '✓ Uniformity & size selection',
              ].map((item, i) => (
                <li key={i} style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* STAT CARD 2 — Global Reach */}
          <div
            ref={addRef(3)}
            style={{
              gridColumn: 'span 4',
              background: 'linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(212,168,67,0.02) 100%)',
              border: '1px solid rgba(212,168,67,0.2)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <Truck size={28} color="var(--gold-400)" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>Global Reach</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Export-ready documentation and logistics support for seamless delivery to any destination worldwide, in compliance with international trade standards.
            </p>
          </div>

          {/* STAT CARD 3 — Key Numbers */}
          <div
            ref={addRef(4)}
            style={{
              gridColumn: 'span 4',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {[
              { value: '12+', label: 'Months shelf life' },
              { value: '4',   label: 'Grades available' },
              { value: '100%', label: 'Food-grade packaging' },
            ].map((stat, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingBottom: i < 2 ? '1.5rem' : 0 }}>
                <div style={{ fontSize: '1.8rem', color: 'var(--gold-400)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ color: 'var(--gray-500)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media(max-width: 900px) {
          /* Stack all Bento cells to single column on tablet/mobile */
          #sourcing .container > div:last-child > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SourcingSection;
