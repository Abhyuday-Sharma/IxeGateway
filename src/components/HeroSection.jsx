import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe as GlobeIcon, ArrowUpRight } from 'lucide-react';
import Globe from '../EarthGlobe';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation on load
      gsap.fromTo(textRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(globeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
      );

      // Scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      tl.to(textRef.current, { y: -100, opacity: 0, duration: 1 }, 0)
        .to(globeRef.current, { scale: 1.2, y: 150, duration: 1 }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100dvh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px', // Header height
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, var(--navy-800) 0%, var(--navy-900) 100%)'
      }}
    >
      {/* Background Dots */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.5
      }} />

      <div className="container hero-grid" style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 1fr', gap: '4rem', alignItems: 'center' }}>

        {/* Text Content */}
        <div ref={textRef} className="hero-text" style={{ maxWidth: '600px' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(212, 168, 67, 0.1)', border: '1px solid var(--gold-500)', borderRadius: '30px', color: 'var(--gold-500)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            International Trade & Export
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--white)', marginBottom: '1.5rem' }}>
            Connecting <span className="text-gradient">India</span> to the World
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--gray-200)', marginBottom: '2.5rem', maxWidth: '500px' }}>
            We specialize in facilitating seamless international trade by connecting global buyers with reliable sourcing solutions across multiple product categories.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }} className="hero-btns">
            <a href="#products" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
              Explore Products <ArrowUpRight size={20} style={{ marginLeft: '8px' }} />
            </a>
            <a href="#about" className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              Who We Are
            </a>
          </div>

          {/* Stats below hero */}
          <div className="hero-stats" style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-400)', fontWeight: 700 }}>Premium</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Quality Sourcing</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--gold-400)', fontWeight: 700 }}>Global</div>
              <div style={{ color: 'var(--gray-400)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Export Network</div>
            </div>
          </div>
        </div>

        {/* Visual Content - Globe SVG */}
        <div
          ref={globeRef}
          className="hero-globe"
          style={{
            position: 'relative',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <Globe />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-400)' }}>Scroll to Explore</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold-500), transparent)' }}></div>
      </div>

      <style>{`
        @media(max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding-top: 2rem;
            gap: 2rem !important;
          }
          .hero-text {
            max-width: 100% !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            order: 1;
          }
          .hero-btns {
            justify-content: center;
          }
          .hero-stats {
            justify-content: center;
            gap: 2rem !important;
            margin-top: 3rem !important;
          }
          .hero-globe {
            height: 300px !important;
            order: 2;
            margin-bottom: 2rem;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
        @media(max-width: 480px) {
          .hero-stats {
            flex-direction: column;
            gap: 1.5rem !important;
            border-top: none !important;
            padding-top: 0 !important;
          }
          .hero-stats > div {
            padding: 1rem;
            background: rgba(255,255,255,0.03);
            width: 100%;
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
