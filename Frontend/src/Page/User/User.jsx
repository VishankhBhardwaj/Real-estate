import React from 'react';
import styles from './User.module.css';

function App() {
  const userInfo = {
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "John Doe",
    email: "john@email.com"
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>User Information</h1>
          <button 
            className={styles.updateButton}
            onClick={() => console.log('Update profile')}
          >
            Update Profile
          </button>
        </div>
        
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Avatar:</span>
            <div className={styles.avatarContainer}>
              <img 
                src={userInfo.avatar} 
                alt="User avatar" 
                className={styles.avatar}
              />
            </div>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>Username:</span>
            <span className={styles.value}>{userInfo.username}</span>
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