import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './Properties.module.css';
import Navbar from '../Components/Navbar/Navbar';
import PropertiesCard from '../Components/Card/PropertiesCard';  // ✅ Correct import
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
    const handleClearFilter = () => {
        setCity('');
        setMinPrice('');
        setMaxPrice('');
        setBedroom('');
        setFilter(false);
    };
    const handleFilter = async () => {
        try {
            let filterData = {
                location: city || undefined,  // ✅ Match backend field name
                minPrice: minPrice ? Number(minPrice) : undefined, // ✅ Ensure it's a number
                maxPrice: maxPrice ? Number(maxPrice) : undefined, 
                bedrooms: bedroom ? Number(bedroom) : undefined
            };
    
            console.log("Filter Data being sent:", filterData); // Debugging log
    
            let filtered = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filterData)
            });
    
            filtered = await filtered.json();
            setFilteredProperties(filtered);
            setFilter(true);
             // Debugging log
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        }
    };
    

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/properties`);
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
                                <button className={styles.btn} onClick={handleClearFilter}>Clear Filter</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.PropertiesCard}>
                        {filter && Array.isArray(filteredProperties)  ? filteredProperties.map((property, index) => (
                            <PropertiesCard key={index} property={property} />
                        )) : Properties.map((property, index) => (
                            <PropertiesCard key={index} property={property} />
                        ))}
                    </div>
                </div>
                <div className={styles.MapContainer}>
                        {filter?<Map property={filteredProperties}/>:<Map property={Properties} />}
                </div>
            </div>
        </div>
    );
};

export default Properties;