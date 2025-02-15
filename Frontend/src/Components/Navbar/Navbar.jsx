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
        <h2 className={styles.logo}><NavLink to='/' className={styles.logolink}>LuxuryEstates</NavLink></h2>
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
