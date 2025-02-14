import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
// import { Menu, X, Home } from 'lucide-react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handledingnin = () => {
    window.location.href = '/Signin';
  }

  return (
    <nav className={styles.navigation}>
      {/* Left Part */}
      <div className={styles.leftpart}>
        <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src="https://imgs.search.brave.com/yo7RiQ_TzRzew_vMCovQ__ezQtyi2bIOI1A6jQMIzPc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTMvUmVh/bHRvci1Mb2dvLnBu/Zw"
          alt="logo"
        />
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`${styles.links} ${isOpen ? styles.showMenu : ''}`}>
          <li className={styles.list}><NavLink className={styles.text} to="/">Home</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/About">About</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/Contact">Contact</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/Agents">Properties</NavLink></li>
        </ul>
      </div>

      {/* Right Part */}
      <div className={styles.rightpart}>
        <NavLink className={styles.text}>MyList</NavLink>
        <button className={styles.btn} onClick={handledingnin}>Sign up/LogIn</button>
      </div>
    </nav>
  );
};

export default Navbar;
