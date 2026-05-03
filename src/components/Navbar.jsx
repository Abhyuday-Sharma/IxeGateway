import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Sourcing', href: '#sourcing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backgroundColor: isScrolled ? 'rgba(10, 22, 40, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      padding: isScrolled ? '1rem 0' : '1.5rem 0'
    }}>
      <div className="container flex-between">
        <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/ixelogomain.png" alt="IXE Gateway Logo" style={{ height: '65px', objectFit: 'contain' }} />
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Magnetic key={link.name} strength={20} threshold={60}>
              <a 
                href={link.href}
                style={{
                  color: 'var(--white)',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  position: 'relative',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--gold-400)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--white)'}
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={25} threshold={70}>
            <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
              Get Quote
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100dvh',
          backgroundColor: 'rgba(10, 22, 40, 0.98)',
          backdropFilter: 'blur(15px)',
          padding: '8rem 2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                color: 'var(--white)', 
                fontSize: '1.8rem',
                fontFamily: 'var(--font-serif)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '0.8rem'
              }}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ marginTop: '1rem', padding: '1rem' }}>
            Get Quote
          </a>
        </div>
      )}

      {/* Adding a quick inline style for mobile media query */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media(max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
