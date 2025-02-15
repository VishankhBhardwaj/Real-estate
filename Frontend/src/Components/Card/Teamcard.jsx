import React from 'react'
import styles from './Teamcard.module.css'
const Teamcard = () => {
  return (
    <div className={styles.teamCard}>
        
        <div className={styles.cardContainer}>
      <img 
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop" 
        alt="Profile" 
        className={styles.profileImage}
      />
      <div className={styles.infoOverlay}>
        <h2 className={styles.name}>Ashley Jones</h2>
        <p className={styles.title}>Lead Buyer Specialist</p>
        <p className={styles.description}>
          With over 10 years of experience in real estate, Ashley is helping clients find 
          the perfect property while ensuring stress-free buying experience.
        </p>
        <a href="https://linkedin.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          <img 
            src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linkedin.svg" 
            alt="LinkedIn"
          />
        </a>
      </div>
    </div>
    </div>
  )
}

export default Teamcard