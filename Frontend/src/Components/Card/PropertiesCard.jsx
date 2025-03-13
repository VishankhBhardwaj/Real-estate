import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { IoBedOutline } from 'react-icons/io5';
import { FaBath } from 'react-icons/fa';
import styles from './PropertiesCard.module.css';

function PropertiesCard({property}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={property.image} alt={property.name} />
      </div>
      <div className={styles.cardContent}>
        <div>
          <h2 className={styles.cardTitle}>{property.name}</h2>
          <div className={styles.cardLocation}>
            <IoLocationOutline size={16} />
            <span>{property.location}</span>
          </div>
          <div className={styles.cardDescription}>{property.description}</div>
          <div className={styles.cardPrice}>${property.price}</div>
        </div>
        <div className={styles.cardFeatures}>
          <div className={styles.feature}>
            <IoBedOutline size={20} />
            <span className={styles.featureValue}>{property.bedrooms}</span>
            <span className={styles.featureLabel}>bedroom</span>
          </div>
          <div className={styles.feature}>
            <FaBath size={18} />
            <span className={styles.featureValue}>{property.bathrooms}</span>
            <span className={styles.featureLabel}>bathroom</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;  // ✅ Export it correctly
