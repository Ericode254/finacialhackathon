import React from 'react';

const Header = () => {
  return (
    <div>
      <header style={{ padding: '0 1rem', height: '3.5rem', display: 'flex', alignItems: 'center' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          {/* Replace `TrendingUp` with an icon or SVG as needed */}
          <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#34D399' }}></div>
          <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>FinanceAI</span>
        </a>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#9CA3AF', textDecoration: 'none', cursor: 'pointer' }}>Features</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#9CA3AF', textDecoration: 'none', cursor: 'pointer' }}>Pricing</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#9CA3AF', textDecoration: 'none', cursor: 'pointer' }}>About</a>
          <a href="#" style={{ fontSize: '0.875rem', fontWeight: '500', color: '#9CA3AF', textDecoration: 'none', cursor: 'pointer' }}>Contact</a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
