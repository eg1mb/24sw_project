// components/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>sgoi</h1>
      <nav style={styles.nav}>
        <li style={styles.navButton}><Link href="/">Home</Link></li>
        <li style={styles.navButton}><Link href="/test">Test</Link></li>
        <li style={styles.navButton}><Link href="/result">Result</Link></li>
        <li style={styles.navButton}><Link href="/profile">Profile</Link></li>
      </nav>
      <input type="text" placeholder="search" style={styles.searchInput} />
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2f4f90',
  },
  nav: {
    display: 'flex',
    gap: '15px',
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#2f4f90',
    fontSize: '16px',
    cursor: 'pointer',
  },
  searchInput: {
    padding: '5px 10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
};

export default Header;
