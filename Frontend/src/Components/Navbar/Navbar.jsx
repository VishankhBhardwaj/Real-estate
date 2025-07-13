import React, { use, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
// import { Menu, X, Home } from 'lucide-react';
import photo from '../../assets/Images/dp.jpg';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data
  const [profilePic, setProfilePic] = useState(null); // Store profile picture
  const [userInfo, setUserInfo] = useState(null); // Store user info
  // Handle MyList Click
  const handleMyList = () => {
    if (isLoggedin) {
      window.location.href = '/Mylist';
    } else {
      window.location.href = '/Signin';
    }
  };

  // Handle Signin Click
  const handleSignin = () => {
    window.location.href = '/Signin';
  };
  // Navigate to User Profile
  const GotoUser = () => {
    window.location.href = '/User';
  };

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser).user; // Extract user details
      setIsLoggedin(true);
      setUserData(parsedUser);
    } else {
      setIsLoggedin(false);
      setUserData(null);
    }
  }, []); // Runs once on mount

  // Listen for `localStorage` changes dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user-info');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser).user;
        setIsLoggedin(true);
        setUserData(parsedUser);
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
    
  }, []);
  useEffect(() => {
    async function fetchUser() {
      let user = await JSON.parse(localStorage.getItem('user-info'));
      if (user) {
        // setUserInfo(user.user);  ////////FIx this line
      }
      // Close the if block
    }
    fetchUser();
    const fetchAvatar = async () => {
      try {
          if (!userInfo || !userInfo._id) return;
          let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}http://localhost:3000/api/auth/${userInfo._id}`);
          result = await result.json();
          setProfilePic(result.profilePic);
      } catch (error) {
          console.error("Failed to fetch avatar:", error);
      }
    }
    if (userInfo && userInfo._id) {
      fetchAvatar();
    }
  },[userInfo]);

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
          <li className={styles.list}><NavLink className={styles.text} to="/Properties">Properties</NavLink></li>
        </ul>
      </div>

      {/* Right Part */}
      <div className={styles.rightpart}>
        <NavLink className={styles.text} onClick={handleMyList} >MyList</NavLink>
        {isLoggedin ? <img onClick={GotoUser} className={styles.dp} src={profilePic} alt="user" />: <button className={styles.btn} onClick={handleSignin}>Sign up/LogIn</button>}
      </div>
    </nav>
  );
};

export default Navbar;
