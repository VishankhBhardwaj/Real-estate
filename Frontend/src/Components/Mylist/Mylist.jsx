import React from 'react'
import styles from './Mylist.module.css'
const Mylist = () => {
  return (
    <div>
        <div className={styles.profile}>
            <div className={styles.profileImage}>
                <img src="" alt="" />
            </div>
            <div className={styles.profileDetails}>
                <h1 className="">User Name</h1>
                <h2>User Email</h2>
                <h3>User Phone number</h3>
            </div>
        </div>
        <div className=""></div>
    </div>
  )
}

export default Mylist