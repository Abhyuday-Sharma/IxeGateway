import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ruler, Award, ShieldCheck, Droplet, PackageCheck, Layers, BadgePercent, Truck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualityFactors = [
  { icon: Ruler,        title: 'Consistent Sizing',    desc: 'Carefully sorted and graded by size (5, 6, 7 Suta) with high uniformity.' },
  { icon: Award,        title: 'Superior Quality',     desc: 'Bright white, clean, well-expanded makhana with low breakage.' },
  { icon: ShieldCheck,  title: 'Hygienic Processing',  desc: 'Cleaned and processed under controlled conditions, free from impurities.' },
  { icon: Droplet,      title: 'Moisture Controlled',  desc: 'Proper drying ensures longer shelf life and maintained crunch.' },
  { icon: PackageCheck, title: 'Export Packaging',     desc: 'Food grade materials protecting against moisture and transit damage.' },
  { icon: Layers,       title: 'Flexible Capability',  desc: 'Bulk and retail supply options tailored to buyer requirements.' },
  { icon: BadgePercent, title: 'Quality Assurance',    desc: 'Independent third-party inspection supported for compliance.' },
  { icon: Truck,        title: 'Global Logistics',     desc: 'Efficient shipping and documentation support for seamless international trade across all continents.' },
];

const capabilities = [
  "Flexible Sourcing Capabilities",
  "Strong Supplier Network",
  "Quality-Driven Approach",
  "Export Compliance and Execution",
  "Transparency and Reliability"
];

const WhyUsSection = () => {
  const sectionRef = useRef(null);
  const factorCardsRef = useRef([]);
  const textRef = useRef([]);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;

      gsap.fromTo(textRef.current[0],
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "bottom 20%", toggleActions: "play reverse play reverse" } }
      );

      gsap.fromTo(textRef.current[1],
        { x: isMobile ? -30 : -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 20%", toggleActions: "play reverse play reverse" } }
      );

      gsap.fromTo(textRef.current[2],
        { x: isMobile ? 30 : 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 20%", toggleActions: "play reverse play reverse" } }
      );

      gsap.fromTo(textRef.current[3],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: textRef.current[3], start: "top 85%", end: "bottom 5%", toggleActions: "play reverse play reverse" } }
      );

      gsap.fromTo(factorCardsRef.current,
        { y: 150, x: isMobile ? 20 : 50, opacity: 0, rotation: 10, scale: 0.8 },
        {
          y: 0, x: 0, opacity: 1, rotation: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: textRef.current[3],
            start: "top 70%",
            end: "bottom -20%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="section-padding" style={{ backgroundColor: 'var(--white)', color: 'var(--navy-900)' }}>
      <style>{`
        @media(max-width: 992px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media(max-width: 480px) {
          .factor-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div className="container">

        <div ref={el => textRef.current[0] = el} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', color: 'var(--navy-900)', marginBottom: '1rem' }}>
            What Sets Us <span style={{ color: 'var(--gold-500)' }}>Apart</span>
          </h2>
          <p style={{ color: 'var(--gray-800)', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            "We focus on delivering consistent quality and reliable supply, ensuring our buyers receive the same standard in every shipment."
          </p>
        </div>

        <div className="grid-2" style={{ marginBottom: '4rem', alignItems: 'start' }}>

          <div ref={el => textRef.current[1] = el} style={{ padding: '2rem', backgroundColor: 'var(--off-white)', borderRadius: '16px', border: '1px solid var(--gray-200)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--navy-800)' }}>Our Strengths</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {capabilities.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--navy-700)', fontWeight: 500 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--gold-500)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div ref={el => textRef.current[2] = el}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--navy-800)' }}>The IXE Advantage</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-800)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              We supply premium-grade makhana sourced from the finest growing regions, processed and graded to meet international quality standards.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray-800)', lineHeight: '1.8' }}>
              Our focus is on consistency, quality control, and reliable supply for global buyers. We are not limited to a single product category and can adapt sourcing based on client requirements.
            </p>
          </div>
        </div>

        <h3 ref={el => textRef.current[3] = el} style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--navy-900)' }}>Quality Assurance Factors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {qualityFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div
                key={index}
                ref={el => factorCardsRef.current[index] = el}
                style={{
                  padding: '2rem',
                  backgroundColor: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(212,168,67,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  width: '60px', height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 168, 67, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'var(--gold-500)'
                }}>
                  <Icon size={30} />
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--navy-900)' }}>{factor.title}</h4>
                <p style={{ color: 'var(--gray-800)', fontSize: '0.95rem', lineHeight: '1.6' }}>{factor.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyUsSection;
