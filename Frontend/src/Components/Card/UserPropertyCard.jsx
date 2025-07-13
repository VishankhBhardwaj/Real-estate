import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { IoBedOutline } from 'react-icons/io5';
import { FaBath } from 'react-icons/fa';
import styles from './PropertiesCard.module.css';
import { MdAddBox } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
function PropertiesCard({property,onRemove}) {
    const handleRemoveFromList = async () => {
        try{
            let user=await JSON.parse(localStorage.getItem('user-info'));
            let propertyId=property._id;
            console.log(user);
            if(user){
                    let result=await fetch(`${process.env.REACT_APP_BACKEND_URL}http://localhost:3000/api/userProperties/remove`,{
                    method:"DELETE",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({userId:user.user._id,propertyId:propertyId}),
                    
                });
                result=await result.json();
                    if(result){
                        toast.success("Property removed successfully");
                        onRemove(propertyId);
                    }
                    else{
                        toast.error("Failed to remove property from list");
                        console.error("Failed to remove property from list:", error);
                    }
            }
        }catch(error){
            toast.error("Failed to remove property from list");
            console.error("Failed to remove property from list:", error);
        }
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
          <div className={styles.feature} onClick={handleRemoveFromList}>
            <MdAddBox size={18} />
            <span className={styles.featureLabel}>Remove from List</span>
          </div>
          <ToastContainer />
          <div className={styles.feature}>
            <FaEye size={18} />
            <span className={styles.featureLabel}>View Property</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;  // ✅ Export it correctly
