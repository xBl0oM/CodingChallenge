import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import styles from './Navbar.module.css';

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // On mount, read token & role from localStorage
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);

  
  let links = [];
  if (!token) {
    
    links = [
      { href: '/login', label: 'Login' },
      { href: '/register', label: 'Register' },
    ];
  } else {
    
    links = [
      { href: '/protected', label: 'Leads' },
      { href: '/customers', label: 'Customers' },
      { href: '#', label: 'Logout', onClick: handleLogout },
    ];
   
    if (role === 'MANAGER') {
      links.splice(1, 0, { href: '/add-lead', label: 'Add Lead' }); 
     
    }
  }

  // Logout handler
  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    window.location.href = '/login';
  }

  // Toggle navOpen state
  function toggleNav() {
    setNavOpen((prev) => !prev);
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleNav}>
        &#9776;
      </div>

      <div className={`${styles.dropdown} ${navOpen ? styles.open : ''}`}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} onClick={link.onClick ?? null}>
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
