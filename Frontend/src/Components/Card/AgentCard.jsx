import React from 'react'
import styles from './AgentCard.module.css'
import {useNavigate} from 'react-router-dom'
const AgentCard = ({agent}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/Details')
    }
return (
    <div className={styles.agentCard}>
            <div className={styles.agentContainer}>
                    <img className={styles.agentImage} src={agent.profileImage} alt="" />
                    <span class={styles.tag}>Luxury Expert</span>
                    <span class={styles.profiletag}>View Profile</span>
            </div>
                <div className={styles.agentText}>
                    <div className={styles.agentInfo}>
                        <h2>{agent.name}</h2>
                        <p className={styles.paragraph}>{`${agent.role} • ${agent.location}`}</p>
                        <p>{agent.email}</p>
                    </div>
                    <div className={styles.agentStats}>
                        <div className={styles.statsinner}><p><b>{agent.salesVolume}</b>
                        Sales volume</p></div>
                        <div className={styles.statsinner}><p><b>{agent.totalSales}</b> Total deals</p>
                        </div>
                        <div className={styles.statsinner}><p><b>{agent.averageRating}</b> 
                            Avg rating
                            </p>
                        </div>      
                    </div>
                    <div className={styles.agentButtons}>
                    <button className={styles.button30} role="button" onClick={handleClick}>View Profile</button>
                    </div>
            </div>
    </div>
)
}

export default AgentCard