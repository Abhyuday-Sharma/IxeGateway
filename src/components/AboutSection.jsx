import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Box, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Fade In
      gsap.fromTo(textRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Cards Stagger
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.about-cards',
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--white)', color: 'var(--navy-900)' }}>
      <div className="container">
        
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div ref={textRef} style={{ maxWidth: '600px' }}>
            <h5 style={{ color: 'var(--gold-500)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Who We Are
            </h5>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginBottom: '2rem', color: 'var(--navy-900)' }}>
              Globally Oriented Trading Company
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-800)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              IXE Gateway Pvt Ltd is engaged in sourcing, supplying, and exporting products from India to international markets. We collaborate with established supplier networks and processing units to ensure every product meets required quality standards.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-800)', marginBottom: '2rem', lineHeight: '1.8' }}>
              Our strength lies in our ability to manage sourcing, quality control, and logistics in a streamlined and reliable manner.
            </p>
            
            <div style={{ borderLeft: '4px solid var(--gold-500)', paddingLeft: '1.5rem', marginTop: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--navy-800)' }}>Our Business Approach</h4>
              <p style={{ color: 'var(--gray-800)', fontSize: '1rem' }}>
                We operate with a flexible and client-focused model. While we currently specialize in Makhana (Fox Nuts), our sourcing capabilities extend beyond a single category, easily adapting to evolving market demands.
              </p>
            </div>
          </div>

          <div className="about-cards" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            
            {/* Mission Card */}
            <div ref={el => cardsRef.current[0] = el} className="glass-panel" style={{ backgroundColor: 'var(--navy-900)', color: 'white', padding: '2.5rem', border: '1px solid var(--gold-500)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1 }}>
                <Navigation size={120} color="var(--gold-500)" />
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--gold-400)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Navigation size={24} /> Our Mission
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--gray-200)' }}>
                To simplify global sourcing by delivering consistent quality, reliable supply, and efficient export solutions to our international clients.
              </p>
            </div>

            {/* Vision Card */}
            <div ref={el => cardsRef.current[1] = el} className="glass-panel" style={{ backgroundColor: 'var(--off-white)', padding: '2.5rem', border: '1px solid var(--gray-200)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.05 }}>
                <MapPin size={120} color="var(--navy-900)" />
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--navy-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={24} color="var(--navy-800)" /> Our Vision
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--gray-800)' }}>
                To establish IXE Gateway Pvt Ltd as a trusted global trade partner known for professionalism, adaptability, and long-term client relationships.
              </p>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media(max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
