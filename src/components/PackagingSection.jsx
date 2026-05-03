import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Layers, Tag, FlaskConical } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PackagingSection = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(itemsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--navy-900)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1rem' }}>
            Flexible <span className="text-gradient">Packaging</span> Solutions
          </h2>
          <p style={{ color: 'var(--gray-400)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Tailored to international market requirements to ensure protection against moisture, breakage, and quality degradation during transit.
          </p>
        </div>

        <div className="grid-4">
          
          <div ref={el => itemsRef.current[0] = el} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--navy-800)', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(212, 168, 67, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--gold-500)' }}>
              <Layers size={32} />
            </div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '1rem' }}>Bulk Packaging</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
              Available in standard export formats packed using food grade materials.
            </p>
          </div>

          <div ref={el => itemsRef.current[1] = el} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--navy-800)', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(212, 168, 67, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--gold-500)' }}>
              <Tag size={32} />
            </div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '1rem' }}>Retail & Branded</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
              Retail packaging options suitable for private label and branded products.
            </p>
          </div>

          <div ref={el => itemsRef.current[2] = el} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--navy-800)', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(212, 168, 67, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--gold-500)' }}>
              <Box size={32} />
            </div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '1rem' }}>Custom Formats</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
              Packaging sizes and formats can be customized based on buyer specifications.
            </p>
          </div>

          <div ref={el => itemsRef.current[3] = el} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--navy-800)', border: '1px solid rgba(212, 168, 67, 0.2)' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(212, 168, 67, 0.1)', borderRadius: '50%', marginBottom: '1.5rem', color: 'var(--gold-500)' }}>
              <FlaskConical size={32} />
            </div>
            <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '1rem' }}>Nitrogen-Flushed</h4>
            <p style={{ color: 'var(--gray-400)', fontSize: '0.95rem' }}>
              Fully customizable solutions including nitrogen-flushed packs as per international standards.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PackagingSection;
