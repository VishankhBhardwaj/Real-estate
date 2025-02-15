import React from 'react'
import styles from './AgentCard.module.css'
import {useNavigate} from 'react-router-dom'
const AgentCard = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/Details')
    }
return (
    <div className={styles.agentCard}>
            <div className={styles.agentContainer}>
                    <img className={styles.agentImage} src="https://ssl.cdn-redfin.com/system_files/images/10193/640x460/6_85.jpg" alt="" />
                    <span class={styles.tag}>Luxury Expert</span>
                    <span class={styles.profiletag}>View Profile</span>
            </div>
                <div className={styles.agentText}>
                    <h1>Lilliah Moseley</h1>
                    <p className={styles.paragraph}>Principal agent • South Charlotte
                    lilliah.moseley@redfin.com</p>
                    <div className={styles.agentStats}>
                        <div className=""><p><b>$182.1M</b>
                        Sales volume</p></div>
                        <div className=""><p><b>410</b> Total deals</p>
                        </div>
                        <div className=""><p><b>4.8</b> 
                            Avg rating
                            </p>
                        </div>      
                    </div>
                    <div className={styles.agentButtons}>
                    <button class={styles.button30} role="button" onClick={handleClick}>View Profile</button>
                    </div>
            </div>
    </div>
)
}

export default AgentCard