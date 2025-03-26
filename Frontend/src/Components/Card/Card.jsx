import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Card.module.css";

const Card = ({ property }) => {
  const handleClick = (id) => {
    window.location.href = `/ViewProperty/${id}`;
};
  const { ref, inView } = useInView({
    triggerOnce: false, // Set to true if you want the animation only once
    threshold: 0.2, // Adjust when the animation should trigger
  });

  return (
    <div ref={ref} className={`${styles.card} ${inView ? styles.fadeIn : styles.fadeOut}`}>
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
        <button onClick={() => handleClick(property._id)} className={styles.btn}>View Property</button>
      </div>
    </div>
  );
};

export default Card;
