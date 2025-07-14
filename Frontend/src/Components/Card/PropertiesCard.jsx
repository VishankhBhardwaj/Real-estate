import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { IoBedOutline } from 'react-icons/io5';
import { FaBath } from 'react-icons/fa';
import styles from './PropertiesCard.module.css';
import { MdAddBox } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
function PropertiesCard({property}) {
  const handleAddToList = async () => {
    try {
      let user = JSON.parse(localStorage.getItem('user-info'));
      let propertyId = property._id;
  
      if (!user) {
        toast.error("User not found. Please log in.");
        return;
      }
  
      let signedUser = user.user;
      let userID = signedUser._id;
  
      let result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/userProperties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userID, propertyId: propertyId }) // ✅ Correctly sending body here
      });
  
      result = await result.json();
      console.log(result);
  
      toast.success("Property added successfully");
    } catch (error) {
      toast.error("Failed to add property to list");
      console.error("Failed to add property to list:", error);
    }
  };
  const handleviewproperty = () => {
    window.location.href = `/ViewProperty/${property._id}`;
  };
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
          <div className={styles.feature} onClick={handleAddToList}>
            <MdAddBox size={18} />
            <span className={styles.featureLabel}>Add to List</span>
          </div>
          <ToastContainer />
          <div className={styles.feature} onClick={() => window.location.href = `/ViewProperty/${property._id}`}>
            <FaEye size={18} />
            <span className={styles.featureLabel} onClick={handleviewproperty}>View Property</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;  // ✅ Export it correctly
