import React from 'react'
import styles from './Pin.module.css'
import { Marker, Popup } from 'react-leaflet';
import { NavLink } from 'react-router-dom';
const Pin = ({property}) => {
  return (
    <>
      {property.latitude && property.longitude ? (
        <div className={styles.popup}>
            <Marker position={[property.latitude, property.longitude]}>
          <Popup>
            <div className={styles.popup}>
              <img src={property.image} alt={property.name} className={styles.image} />
              <div>
              <NavLink to={`/property/${property._id}`} className={styles.heading}>{property.name}</NavLink>
              <p className={styles.para}>{property.bedrooms} Beds | {property.bathrooms} Baths</p>
              <p className={styles.price}>${property.price}</p>
              </div>
            </div>
          </Popup>
        </Marker>
        </div>
      ) : console.warn(`Invalid lat/lng for property:`, property)}
    </>
  )
}

export default Pin