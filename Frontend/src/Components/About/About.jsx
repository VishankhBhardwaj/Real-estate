import React from 'react'
import styles from './About.module.css'
import Teamcard from '../Card/Teamcard'
const About = () => {
  return (
    <div className={styles.container}>
        <div className={styles.about}>
            <h1 className={styles.title}>
            Your Trusted Real Estate Partner</h1>
            <p className={styles.description}> 
            Your Trusted Real Estate Partner
            Expert Guidance</p>
        </div>
        <div className={styles.content}>
           <p className={styles.para}>BlueSky Buyer Agency is your dedicated Buyer’s Agent, specializing in <br /> providing expert guidance and support throughout the property purchasing <br /> process. With a focus on your needs and preferences, we ensure a seamless <br /> experience from property search to closing. Our team of experienced <br /> professionals is committed to helping you find your dream home while <br /> negotiating the best terms on your behalf. Trust BlueSky Buyer Agency to <br /> navigate the real estate market and secure your ideal property hassle-free.</p>
        </div>
        <div className={styles.imageContainer}>
            <img className={styles.image} src="https://cdn.pixabay.com/photo/2021/10/06/15/05/bathroom-6686057_1280.jpg" alt="" />
        </div>
        <div className={styles.team}>
            <h1 className={styles.teamTitle}>
            Meet Our Team</h1>
            <p className={styles.para2}>This is your Team section. It's a great place to introduce your team and talk about what makes it special, <br /> such as your culture and work philosophy. Don't be afraid to illustrate personality <br /> and character to help users connect with your team.</p>
        </div>
        <div className={styles.teamContainer}>
            <div className={styles.teamMember}>
                <div className={styles.teamCard}>

                </div>
            </div>        
        </div>
    </div>
  )
}

export default About