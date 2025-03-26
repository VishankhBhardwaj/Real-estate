import React, { useEffect } from 'react';
import styles from './PropertyGallery.module.css';
import PropertyDetails from './PropertyDetails';
import { useParams } from "react-router-dom";
import { useState } from 'react';
function PropertyGallery() {
  const { propertyId } = useParams();
  const [data, setData] = useState({ propertyId: {}, images: [] });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData({
          propertyId: result.propertyId || {}, 
          images: result.images || [] // ✅ Ensure images is always an array
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (propertyId) { // ✅ Prevents fetch when propertyId is undefined
      fetchData();
    }
  }, [propertyId]); 
  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]); 
  return (
    <div className='animate__animated animate__fadeInBottomLeft animate__faster'>
      <div className={styles.gallery}>
        {data?.images?.map((image, index) => (
          <div 
            key={index} 
            className={`${styles.imageContainer} ${index === 0 ? styles.mainImage : ''}`}
          >
            <img src={image} alt={`Property view ${index + 1}`} />
          </div>
        ))}
      </div>
      <PropertyDetails property={data.propertyId} />
    </div>
    
    
  );
}

export default PropertyGallery;