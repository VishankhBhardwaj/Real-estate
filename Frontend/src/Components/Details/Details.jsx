import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css'; // Importing styles from CSS module
import { useNavigate } from 'react-router-dom';
const Details = () => {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const [agent, setAgent] = useState({});
  const handleClick = () => {
    navigate('/');
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/api/agents/${agentId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Agent data:', result);
        setAgent(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    if (agentId) {
      fetchData();
    }
  }, [agentId]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.agent_profile_page} animate__animated animate__fadeIn`}>
    <button className={styles.back_btn} onClick={handleClick}>
      <i className="fas fa-arrow-left"></i> Back to Agents
    </button>
    
    <div className={styles.profile_header}>
      <div className={styles.profile_image}>
        <img src={agent.profileImage} alt={agent.name} />
      </div>
      <div className={styles.profile_basic_info}>
        <h2>{agent.name}</h2>
        <p className={styles.title}>{agent.role}</p>
        <div className={styles.contact_info}>
          <p><i className="fas fa-phone"></i> {agent.phoneNumber}</p>
          <p><i className="fas fa-envelope"></i> {agent.email}</p>
        </div>
      </div>
    </div>

    <div className={styles.profile_stats}>
      <div className={styles.stat_item}>
        <span className={styles.stat_number}>{agent.totalSales}</span>
        <span className={styles.stat_label}>Properties Sold</span>
      </div>
      <div className={styles.stat_item}>
        <span className={styles.stat_number}>{agent.experience}</span>
        <span className={styles.stat_label}>Years Experience</span>
      </div>
      <div className={styles.stat_item}>
        <span className={styles.stat_number}>{agent.averageRating}</span>
        <span className={styles.stat_label}>Average Rating</span>
      </div>
    </div>

    <div className={styles.profile_content}>
      <section className={styles.about_section}>
        <h3>About Me</h3>
        <p>{agent.aboutMe}</p>
      </section>

      <section className={styles.specialization_section}>
        <h3>Specializations</h3>
        <div className={styles.specializations}>
        {agent?.specialization?.length > 0 ? (
    agent.specialization.map((item, index) => (
        <div key={index}>{item}</div>
    ))
) : (
    <p>Loading...</p>
)}

        </div>
      </section>

      <section className={styles.achievements_section}>
        <h3>Achievements</h3>
        <ul>
        {agent?.achievements?.length > 0 ? (
    agent.achievements.map((achievement, index) => (
        <li key={index}>{achievement}</li>
    ))
) : (
    <p>Loading achievements...</p>
)}
        </ul>
      </section>
    </div>
  </div>
  );
};

export default Details;
