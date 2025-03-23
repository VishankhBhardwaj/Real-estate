import React from 'react'
import styles from './Teamcard.module.css'
const Teamcard = ({property}) => {
  return (
    <div className={styles.teamCard}>
        
        <div className={styles.cardContainer}>
      <img 
        src={property.image} 
        alt="Profile" 
        className={styles.profileImage}
      />
      <div className={styles.infoOverlay}>
        <h2 className={styles.name}>{property.name}</h2>
        <p className={styles.title}>{property.specialization}</p>
        <p className={styles.description}>
          {property.details}
        </p>
        <a href="https://linkedin.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          <img 
            src="https://imgs.search.brave.com/SQsaFNKXL9x2pacICOrPpnY5c1-Eee1Vf0jOmntInaM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2NhL0xpbmtlZElu/X2xvZ29faW5pdGlh/bHMucG5n" 
            alt="LinkedIn"
          />
        </a>
      </div>
    </div>
    </div>
  )
}

export default Teamcard