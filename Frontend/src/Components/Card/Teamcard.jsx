import React from 'react'
import styles from './Teamcard.module.css'
const Teamcard = () => {
  return (
    <div>
        <img className={styles.teamImage} src="https://ssl.cdn-redfin.com/system_files/images/16379/640x460/6_23.jpg" alt="" />
        <div>
            <h1>John Doe</h1>
            <p>CEO</p>
            <p>
            With over 10 years of experience in  real estate , Ashley is helping clients find the perfect property while ensuring  stress-free buying experience.
            
            </p>
        </div>
    </div>
  )
}

export default Teamcard