import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setNavOpen(false);
    window.location.href = '/login';
  };

  
  const handleLinkClick = (e, customOnClick) => {
    if (customOnClick) {
      customOnClick(e);
    }
    setNavOpen(false);
  };

  let links = [];
  if (!token) {
    links = [
      { href: '/login', label: 'Login' },
      { href: '/register', label: 'Register' },
    ];
  } else {
    // Default links when logged in
    links = [
      { href: '/protected', label: 'Leads' },
      { href: '/customer', label: 'Customers' },
      { href: '#', label: 'Logout', onClick: handleLogout },
    ];
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.hamburger} onClick={() => setNavOpen(!navOpen)}>
        &#9776;
      </div>

      <div className={`${styles.dropdown} ${navOpen ? styles.open : ''}`}>
        {links.map((link) => (
          <Link legacyBehavior key={link.label} href={link.href}>
            <a onClick={(e) => handleLinkClick(e, link.onClick)}>{link.label}</a>
          </Link>
        ))}
      </div>
    </header>
  );
}
