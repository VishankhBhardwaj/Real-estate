import React from 'react'
import styles from './PropertyDetails.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
const PropertyDetails = ({property}) => {
     const [Properties, setProperties] = useState([]);
     const handleClick = (id) => {
        window.location.href = `/ViewProperty/${id}`;
    };
     useEffect(() => {
            const fetchProperties = async () => {
                try {
                    let result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/properties`);
                    result = await result.json();
                    setProperties(result);
                    console.log(result);
                } catch (error) {
                    console.error("Failed to fetch properties:", error);
                }
            };
            fetchProperties();
        }, []);
  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <h1 className={styles.address}>{property.location}</h1>
        <h2 className={styles.location}>Goodyear, AZ 85338</h2>
        
        <div className={styles.pricing}>
          <div className={styles.price}>
            <span className={styles.currentPrice}>${property?.price || "N/A"}</span>
            <span className={styles.originalPrice}>$430,000</span>
          </div>
          <div className={styles.priceDetails}>
            <div>Buy directly from Opendoor</div>
            <div className={styles.publicPrice}>Public list price</div>
          </div>
        </div>

        <div className={styles.features}>
          <span>{property.bedrooms} beds</span>
          <span>•</span>
          <span>{property.bathrooms} bathrooms</span>
          <span>•</span>
          <span>2149 sqft</span>
          <span>•</span>
          <span>$2,129/month est.</span>
        </div>

        <div className={styles.similarProperties}>
        <h3>Similar properties</h3>
        <div className={styles.propertiesGrid}>
    {Properties.map((property, index) => (
      <div key={index} className={styles.propertyCard}>
        <div onClick={() => handleClick(property._id)} className={styles.propertyImage}>
          <img  src={property?.image || "default-image.jpg"} alt={`Property in ${property?.location || "Unknown"}`} />
          <button className={styles.favoriteButton}>♡</button>
        </div>
        <div className={styles.propertyInfo}>
          <div className={styles.propertyPrice}>
            <span className={styles.price}>${property?.price?.toLocaleString() || "N/A"}</span>
            <span className={styles.monthlyEst}>${property?.monthlyEst || "N/A"}/month est.</span>
          </div>
          <div className={styles.propertyDetails}>
            <span>{property?.bedrooms || 0} bds</span>
            <span>•</span>
            <span>{property?.bathrooms || 0} ba</span>
            <span>•</span>
            <span>{property?.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</span>
            <span>•</span>
            <span>{property?.type || "Unknown"}</span>
          </div>
          <div className={styles.propertyLocation}>{property?.location || "Location not available"}</div>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  )
}

export default PropertyDetails