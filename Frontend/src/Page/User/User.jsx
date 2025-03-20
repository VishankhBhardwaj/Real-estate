import React, { use } from 'react';
import styles from './User.module.css';
import { useState, useEffect } from 'react';
import UserPropertyCard from '../../Components/Card/UserPropertyCard';
function App() {
  const [Properties, setProperties] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect( () => {
    async function fetchUser() {
    let user = await JSON.parse(localStorage.getItem('user-info'));
    if (user) {
      setUserInfo(user.user);
    }
    // Close the if block
  }
  fetchUser();
}, []);
  useEffect(() => {
    const fetchProperties = async () => {
        try {
            if (!userInfo || !userInfo._id) return; 
            let result = await fetch(`http://localhost:3000/api/userProperties/${userInfo._id}`);
            result = await result.json();
            let propertiesList = result.map(item => item.propertyId);
            setProperties(propertiesList);
            console.log(result);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        }
    };
    if (userInfo._id) {
      fetchProperties();
    }
}, [userInfo]);
const handleRemoveProperty = (propertyId) => {
  setProperties((prevProperties) =>
      prevProperties.filter((property) => property._id !== propertyId)
  );
};
  return (
    <div className={`${styles.container} animate__animated animate__fadeInDown`}>
      <div className={styles.PropertiesCard}> 
        {Properties.length > 0 ? Properties.map((property, index) => (
                  <UserPropertyCard key={index} property={property}  onRemove={handleRemoveProperty} />
                )) : <div>No properties found</div>}
        </div>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>User Information</h1>
          <button 
            className={styles.updateButton}
            onClick={() => console.log('Update profile')}
          >
            Update Profile
          </button>
          <button 
            className={styles.updateButton}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Avatar:</span>
            <div className={styles.avatarContainer}>
              <img 
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="User avatar" 
                className={styles.avatar}
              />
            </div>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>Username:</span>
            <span className={styles.value}>{userInfo.name}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>E-mail:</span>
            <span className={styles.value}>{userInfo.email}</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;