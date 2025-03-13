import React from 'react'
import styles from './Map.module.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer} from 'react-leaflet';
import Pin from '../pin/Pin';

const Map = ({property}) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className={styles.map}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {property.map((property) => (
    <Pin key={property._id} property={property} />
  ))}
</MapContainer>
  )
}

export default Map