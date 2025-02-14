import React from 'react'
import styles from './Card.module.css'

const Card = ({property}) => {
  return (
    <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.cardImage} src={property.image} alt="" />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.priceContainer}>
            <h2 className={styles.cardHeading}>{property.name}</h2>
            <p className={styles.cardPrice}>${property.price}</p>
          </div>
          <div className={styles.locationContainer}>
            <p className={styles.cardLocation}>{property.location}</p>
            <p className={styles.cardParagraph}>{property.description}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btn}>View Property</button>
        </div>
    </div>
  )
}

export default Card