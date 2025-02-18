import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Properties.module.css';
import Navbar from '../Components/Navbar/Navbar';
import PropertiesCard from '../Components/Card/PropertiesCard';
import { IoIosSearch } from "react-icons/io";
import Map from '../Components/Map/Map';

const Properties = () => {
    const [Properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [filter, setFilter] = useState(false);
    const [city, setCity] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [bedroom, setBedroom] = useState('');

    const handleFilter = () => {
        console.log("handleFilter function executed!");
        console.log("Before filtering:", Properties);
        
        if (Properties.length === 0) {
            console.warn("No properties available to filter!");
            return;
        }
    
        const filtered = Properties.filter(property => {
            console.log("Property:", property);
            return (
                (!city || property.city.toLowerCase().includes(city.toLowerCase())) &&
                (!minPrice || property.price >= (minPrice ? parseFloat(minPrice) : 0)) &&
                (!maxPrice || property.price <= (maxPrice ? parseFloat(maxPrice) : Infinity)) &&
                (!bedroom || property.bedrooms === (bedroom ? parseInt(bedroom) : property.bedrooms))
            );
        });
    
        console.log("Filtered properties:", filtered);
        
        setFilteredProperties(filtered);
        setFilter(true);
    
        console.log("State update triggered!");
    };
    

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                let result = await fetch('http://localhost:3000/properties');
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
        <div className={`${styles.PropertiesParent} animate__animated animate__fadeInRightBig`}>
            <Navbar />
            <div className={styles.Properties}>
                <div>
                    <div className={styles.FilterContainer}>
                        <h1>Search result for London</h1>
                        <div>
                            <label htmlFor="location">City Location</label> <br />
                            <input type="text" id="location" placeholder='City Location' className={styles.cityinput} value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className={styles.Filter}>
                            <div>
                                <label htmlFor="type">Type</label> <br />
                                <select id="type" className={styles.miniinput}>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="condo">Condo</option>
                                </select> <br />
                            </div>

                            <div>
                                <label htmlFor="property">Property</label> <br />
                                <select id="property" className={styles.miniinput}>
                                    <option value="rent">Rent</option>
                                    <option value="sale">Sale</option>
                                </select> <br />
                            </div>
                            <div>
                                <label htmlFor="minPrice">Min Price</label> <br />
                                <input type="number" id="minPrice" placeholder='Min Price' className={styles.miniinput} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /> <br />
                            </div>

                            <div>
                                <label htmlFor="maxPrice">Max Price</label> <br />
                                <input type="number" id="maxPrice" placeholder='Max Price' className={styles.miniinput} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /> <br />
                            </div>

                            <div>
                                <label htmlFor="bedroom">Bedroom</label> <br />
                                <input type="number" id="bedroom" placeholder='Bedroom' className={styles.miniinput} value={bedroom} onChange={(e) => setBedroom(e.target.value)} />
                            </div>
                            <div>
                                <IoIosSearch className={styles.icons} onClick={handleFilter} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.PropertiesCard}>
                        {filter ? filteredProperties.map((property, index) => (
                            <PropertiesCard key={index} property={property} />
                        )) : Properties.map((property, index) => (
                            <PropertiesCard key={index} property={property} />
                        ))}
                    </div>
                </div>
                <div className={styles.MapContainer}>
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default Properties;