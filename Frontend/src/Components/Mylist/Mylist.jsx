import React from 'react'
import styles from './Mylist.module.css'
import Property3DView from '../Property3d/Property3DView'
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
        <div className="">
          <Property3DView />
        </div>
    </div>
  )
}

export default Mylist