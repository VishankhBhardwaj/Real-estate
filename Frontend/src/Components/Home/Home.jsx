import React, { use } from 'react'
import styles from './Home.module.css'
import { useInView } from "react-intersection-observer";
import { FaSearch } from "react-icons/fa";
import Card from '../Card/Card';
import AgentCard from '../Card/AgentCard';
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {motion} from 'framer-motion';
import Contact from '../Contact/Contact';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [toppicks, setToppicks] = useState([])
    const [agents, setAgents] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchToppicks = async () => {

        let result =await  fetch('http://localhost:3000/api/toppicks')
        result = await result.json()
        setToppicks(result);
        }
        fetchToppicks();

    }, [])  
    useEffect(() => {
        const fetchAgents = async () => {
            try{
                let result = await fetch('http://localhost:3000/api/agents')
                result = await result.json()
                setAgents(result);
            }catch(error){
                console.error("Error fetching agent data:", error);
            }
        }
        fetchAgents();
    },[]);
    const scrollContainerRef = useRef(null);
        
      
        const handleNextClick = () => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }
        };
        const handleNextClickprev = () => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
            }
          };
          const { ref, inView } = useInView({
            triggerOnce: false, // Set to true if you want the animation only once
            threshold: 0.2, // Adjust when the animation should trigger
          });
return (
    <>
    <div className={`${styles.home} ${inView ? styles.fadeIn : styles.fadeOut}`} ref={ref} >  
        <div className={styles.ImageContainer}>
            <h1 className={styles.heading}>Find Your Dream Home</h1>
            <p className={styles.paragraph}>Discover the finest luxury properties <br /> in the most desirable locations worldwide.</p>
            <div className={styles.searchContainer}>
                <input className={styles.inputuser} type="text" placeholder='Address, School, City, Zip or Neighbourhood' />
                <FaSearch className={styles.searchIcon} />
            </div>
            <img className={styles.image} src='https://cdn.pixabay.com/photo/2024/04/18/19/01/house-8704811_1280.jpg' alt="" />
        </div>
    </div>
    <h1 className={`${styles.heading2} `}>
        Featured Properties
    </h1>
    <div className={`${styles.cardContainer} `}>
        {toppicks.map((toppick,index) => (
            <Card key={index} property={toppick} />
        ))}
    </div>
    <h1 className={styles.heading3}>
        Our Services
    </h1>
    <motion.div className={`${styles.ourservices} animate__animated animate__flipInX`} animate={{ x: 100 } }
  transition={{ ease: "easeOut", duration: 2 }} initial={false}>
        <div>
        <img className={styles.agentImage} src="https://cdn.pixabay.com/photo/2017/08/02/00/49/people-2569234_1280.jpg" alt="" />

        </div>
        <div className={styles.agentText}>
            <h1 className={styles.agentHeading}>Start touring homes, no strings attached</h1>
            <p className={styles.agentParagraph}>Unlike many other agents, Redfin agents <br /> won't ask you to sign an exclusive commitment before <br /> they'll take you on a first tour.</p>
            <button onClick={()=>{navigate('/Properties')}} class={styles.button29} role="button">Search for homes</button>
        </div>
    </motion.div>
    <div className={styles.agentshowcase}>
        <div className={styles.agentText2}>
        <h1 className={styles.agentHeading}>Connect with a local LuxuryEstate agent</h1>
        <p className={styles.agentParagraph}>More people visit LuxuryEstate than any other brokerage* <br />and our agents have the experience to price,<br /> market, and sell your home for the best price possible.</p>
        </div>
        <div className={styles.agentCard}
        ref={scrollContainerRef} style={{ scrollBehavior: "smooth" }}>
           {
                agents.map((agent,index) => (
                     <AgentCard key={index} agent={agent} />
                ))
           }
           <GrFormPrevious className={styles.navigateprev} onClick={handleNextClickprev} />
           <MdNavigateNext className={styles.navigate} onClick={handleNextClick} />
        </div>
    </div>
    <div className={styles.contactus}>
        <Contact />
    </div>
    </>
)
}

export default Home