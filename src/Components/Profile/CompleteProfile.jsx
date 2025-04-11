import { FaGithub, FaGlobe } from "react-icons/fa";
import React, {  useEffect, useRef, useState } from "react";
import styles from "./CompleteProfile.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CompleteProfile = () => {
    const fullNameRef=useRef('');
    const photoUrlRef=useRef('');
    const token=useSelector(state=>state.auth.token);

    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({ fullName: '', photoUrl: '' });
    async function profileDataFetch(){
      try{
          const res= await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
          {
            idToken: token // ✅ correct place
          },
          { headers: { 'Content-Type': 'application/json' } }
        )


    const data = res.data;
    if (data.users && data.users.length > 0) {
      setProfileData({
        fullName: data.users[0].displayName || '',
        photoUrl: data.users[0].photoUrl || ''
      });
    }
  setIsLoading(false);
}
    catch(err){
      console.error('Error fetching profile:', err);
      setIsLoading(false);
    };
}

   useEffect(() => {
  if (token && token.trim().length > 0) {
    profileDataFetch();
  } else {
    console.warn("Token not found yet. Skipping profile fetch.");
  }
}, [token]);




    const submitHandler = async (event) => {
  event.preventDefault();

  const EnteredFullname = fullNameRef.current.value;
  const EnteredPhotoUrl = photoUrlRef.current.value;

  try {
    const res = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
      {
        idToken: token,
        displayName: EnteredFullname,
        photoUrl: EnteredPhotoUrl,
        returnSecureToken: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('user update', res.data);
    fullNameRef.current.value = '';
    photoUrlRef.current.value = '';
    setTimeout(() => {
  profileDataFetch();
}, 500); // wait 0.5 second

  } catch (err) {
    const errorMessage = err.response?.data?.error?.message || 'Something went wrong!';
    alert(`Error: ${errorMessage}`);
  }
};

  return (
    <>
      <div className={styles["profile-container"]}>
        <div className={styles["profile-text"]}>Winner never quit, Quitters never win.</div>
        <p className={styles["profile-per"]}>
          Your profile is 64% completed. A complete profile has higher chances of landing a job.{" "}
          <Link to="/complete-profile">Complete Now</Link>
        </p>
      </div>
      
      <div className={styles.form}>
        <div className={styles["form-heading"]}>
          <h3>Contact Details:</h3>
          <button className={styles["cancel-btn"]}>Cancel</button>
        </div>
        
        {isLoading?(<p>Loading...</p>):(<form className={styles["update-form"]} onSubmit={submitHandler}>
          <div className={styles["update-control"]}>
            <span className={styles["input-group"]}>
              <FaGithub className={styles.icon} />  
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" id="fullname" ref={fullNameRef} defaultValue={profileData.fullName} required/>
            </span>

            <span className={styles["input-group"]}>
              <FaGlobe className={styles.icon} />  
              <label htmlFor="photourl">Profile Photo URL</label>
              <input type="url" id="photourl" ref={photoUrlRef} defaultValue={profileData.photoUrl} />
            </span>
          </div>
          <button type="submit" className={styles["update-btn"]} >Update</button>
        </form>)}
      </div>
    </>
  );
};

export default CompleteProfile;
