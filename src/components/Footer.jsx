import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--navy-900)', color: 'white', padding: '4rem 0 2rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container grid-4" style={{ gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <img src="/ixelogomain.png" alt="IXE Gateway" style={{ height: '80px', marginBottom: '1.5rem', objectFit: 'contain' }} />
          <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            A dependable global sourcing partner, providing consistent quality and seamless trade solutions to businesses worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-500)', marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#about" style={linkStyle}>About Us</a></li>
            <li><a href="#why-us" style={linkStyle}>Why Choose Us</a></li>
            <li><a href="#sourcing" style={linkStyle}>Sourcing & Origin</a></li>
            <li><a href="#contact" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-500)', marginBottom: '1.5rem' }}>Products</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#products" style={linkStyle}>4 Suta Makhana</a></li>
            <li><a href="#products" style={linkStyle}>5 Suta Makhana</a></li>
            <li><a href="#products" style={linkStyle}>6 Suta Makhana</a></li>
            <li><a href="#products" style={linkStyle}>7 Suta Makhana</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-500)', marginBottom: '1.5rem' }}>Legal</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><a href="#" style={linkStyle}>Privacy Policy</a></li>
            <li><a href="#" style={linkStyle}>Terms & Conditions</a></li>
            <li><a href="#" style={linkStyle}>Export Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'var(--gray-400)', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} IXE Gateway Pvt Ltd. All Rights Reserved.</p>
      </div>

      <style>{`
        @media(max-width: 768px) {
          footer .grid-4 {
            grid-template-columns: 1fr 1fr !important;
          }
          footer .grid-4 > div:first-child {
            grid-column: span 2;
          }
        }
      `}</style>
    </footer>
  );
};

const linkStyle = {
  color: 'var(--gray-200)',
  fontSize: '0.95rem',
  transition: 'color 0.3s',
  textDecoration: 'none'
};

export default Footer;
