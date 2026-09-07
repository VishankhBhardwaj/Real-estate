import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleMyList = () => {
    if (isLoggedin) {
      window.location.href = '/Mylist';
    } else {
      window.location.href = '/Signin';
    }
  };

  const handleSignin = () => {
    window.location.href = '/Signin';
  };

  const GotoUser = () => {
    window.location.href = '/User';
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser).user;
      setIsLoggedin(true);
      setUserData(parsedUser);
      if (parsedUser.profilePic) {
        setProfilePic(parsedUser.profilePic);
      }
    } else {
      setIsLoggedin(false);
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user-info');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser).user;
        setIsLoggedin(true);
        setUserData(parsedUser);
        if (parsedUser.profilePic) {
          setProfilePic(parsedUser.profilePic);
        }
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className={styles.navigation}>
      <div className={styles.leftpart}>
        <div className={styles.logoContainer}>
          <h2 className={styles.logo}><NavLink to='/' className={styles.logolink}>LuxuryEstates</NavLink></h2>
        </div>

        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`${styles.links} ${isOpen ? styles.showMenu : ''}`}>
          <li className={styles.list}><NavLink className={styles.text} to="/">Home</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/About">About</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/Contact">Contact</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/Properties">Properties</NavLink></li>
          <li className={styles.list}><NavLink className={styles.text} to="/Calculator">Calculator</NavLink></li>
          {userData?.role === 'agent' && (
            <li className={styles.list}>
              <NavLink 
                className={styles.text} 
                to="/agent/chat"
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '0.88rem'
                }}
              >
                Agent Portal
              </NavLink>
            </li>
          )}
          <li className={styles.list}>
            <button 
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new Event('open-luxury-ai'));
              }} 
              className={styles.text} 
              style={{
                background: 'rgba(227, 168, 87, 0.12)', 
                border: '1px solid #E3A857', 
                borderRadius: '20px', 
                padding: '4px 12px', 
                cursor: 'pointer', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px', 
                color: '#b87c2b',
                fontWeight: '600'
              }}
            >
              ✨ AI Agent
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.rightpart}>
        <NavLink className={styles.text} onClick={handleMyList}>MyList</NavLink>
        {isLoggedin ? (
          <img onClick={GotoUser} className={styles.dp} src={profilePic || 'https://www.w3schools.com/howto/img_avatar.png'} alt="user" />
        ) : (
          <button className={styles.btn} onClick={handleSignin}>Sign up/LogIn</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
