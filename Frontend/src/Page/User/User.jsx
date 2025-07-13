import React, { use } from 'react';
import styles from './User.module.css';
import { useState, useEffect } from 'react';
import UserPropertyCard from '../../Components/Card/UserPropertyCard';
import { toast, ToastContainer } from 'react-toastify';
function App() {
  const [Properties, setProperties] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [changedname, setChangedName] = useState('');
  const [changedemail, setChangedEmail] = useState('');
  const [file, setFile] = useState(null);
  const [edit,setEdit]=useState(true);
  const [profilePic, setProfilePic] = useState(null);
  
  
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  /**
   * Updates the `name` property of the `userInfo` state object with the value from the input event.
   * 
   * @param {Object} e - The event object from the input field.
   * @param {Object} e.target - The target element of the event.
   * @param {string} e.target.value - The value of the input field.
   * 
   * Note: `...userInfo` is used to preserve the existing properties of the `userInfo` state object 
   * while updating only the `name` property.
   */
  const handlename = (e) => {
    setChangedName(e.target.value);
  };
  const handlemail = (e) => {
    setChangedEmail(e.target.value);
  };

  const handleEditProfile = () => {
    setEdit(!edit);
  }

  const handleConfirmProfile = async () => {
    setUserInfo({
      ...userInfo,
      name: changedname,
      email: changedemail,
    });
    console.log("file:",file);
    try{
      const updatedData = new FormData();
      updatedData.append("userInfo", JSON.stringify(userInfo)); // Convert JSON to string
      updatedData.append("file", file); // Append file
      const formData= await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/update`, {
        method: 'POST',
        body: updatedData,
      });
      const result=await formData.json();
      if(result){
        toast.success("Profile updated successfully!");
        setEdit(!edit);
        localStorage.setItem('user-info', JSON.stringify({ user: { ...userInfo, name: changedname, email: changedemail,profilePic:file } }));
      }
      else{
        toast.error("Failed to update profile.");
      }
    }catch(error){
      console.error("Error updating profile:", error);
    }
  }
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  useEffect( () => {
    async function fetchUser() {
    let user = await JSON.parse(localStorage.getItem('user-info'));
    if (user) {
      setUserInfo(user.user);
      setChangedName(user.user.name);
      setChangedEmail(user.user.email);
    }
    // Close the if block
  }
  fetchUser();
}, []);
  useEffect(() => {
    const fetchProperties = async () => {
        try {
            if (!userInfo || !userInfo._id) return; 
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userProperties/${userInfo._id}`);
            result = await result.json();
            let propertiesList = result.map(item => item.propertyId);
            setProperties(propertiesList);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
        }
    };
    const fetchAvatar = async () => {
        try {
            if (!userInfo || !userInfo._id) return;
            let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/${userInfo._id}`);
            result = await result.json();
            setProfilePic(result.profilePic);
        } catch (error) {
            console.error("Failed to fetch avatar:", error);
        }
      }
    if (userInfo._id) {
      fetchProperties();
      fetchAvatar();  
    }
}, [userInfo]);
const handleRemoveProperty = (propertyId) => {
  setProperties((prevProperties) =>
      prevProperties.filter((property) => property._id !== propertyId)
  );
};
  return (
    <div className={`${styles.container} animate__animated animate__fadeInDown`}>
      <div className={styles.PropertiesCard}> 
        {Properties.length > 0 ? Properties.map((property, index) => (
                  <UserPropertyCard key={index} property={property}  onRemove={handleRemoveProperty} />
                )) : <div>No properties found</div>}
        </div>
        <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.header}>
          <h1 className={styles.title}>User Information</h1>
          <div className={styles.buttonGroup}>
            {edit ? (
              <button className={styles.updateButton} onClick={handleEditProfile}>
                Update Profile
              </button>
            ) : (
              <button className={styles.confirmButton} onClick={handleConfirmProfile}>
                Confirm Update
              </button>
            )}
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <ToastContainer />

        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Avatar:</span>
            <div className={styles.avatarContainer}>
              {edit ? (
                <img
                  src={profilePic}
                  alt="User avatar"
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.fileInputWrapper}>
                  <div className={styles.currentAvatar}>
                    <img
                      src={profilePic}
                      alt="Current avatar"
                      className={styles.currentAvatarImg}
                    />
                  </div>
                  <label htmlFor="avatarUpload" className={styles.fileInputLabel}>
                  Choose new avatar
                </label>
              <input
                    id="avatarUpload"
                    type="file"
                    className={styles.fileInput}
                    onChange={handleChange}
                    accept="image/*"
                  />
              </div>
              )}
            </div>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>Username:</span>
            {edit ? (
              <span className={styles.value}>{userInfo.name}</span>
            ) : (
              <input
                type="text"
                className={styles.input}
                value={changedname}
                onChange={handlename}
                placeholder="Enter new username"
              />
            )}
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.label}>E-mail:</span>
            {edit ? (
              <span className={styles.value}>{userInfo.email}</span>
            ) : (
              <input
                type="text"
                className={styles.input}
                value={changedemail}
                onChange={handlemail}
                placeholder="Enter new email"
              />
            )}
          </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}

export default App;