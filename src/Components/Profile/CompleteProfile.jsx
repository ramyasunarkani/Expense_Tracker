import { FaGithub, FaGlobe } from "react-icons/fa";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./CompleteProfile.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const CompleteProfile = () => {
    const fullNameRef=useRef('');
    const photoUrlRef=useRef('');
    const authCtx=useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({ fullName: '', photoUrl: '' });

    useEffect(() => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI', {
            method: 'POST',
            body: JSON.stringify({ idToken: authCtx.token }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => {
            if (data.users && data.users.length > 0) {
                setProfileData({
                    fullName: data.users[0].displayName || '',
                    photoUrl: data.users[0].photoUrl || ''
                });
            }
            setIsLoading(false);
        })
        .catch(err => {
            console.error('Error fetching profile:', err);
            setIsLoading(false);
        });
    }, [authCtx.token]);



    function submitHandler(event){
        event.preventDefault();
        const EnteredFullname=fullNameRef.current.value;
        const EnteredPhotoUrl=photoUrlRef.current.value;
        
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
            {
                method: 'POST',
                body: JSON.stringify({
                     idToken:authCtx.token,
                    displayName:EnteredFullname,
                    photoUrl:EnteredPhotoUrl,
                    returnSecureToken:true
                }),
                headers: { 'Content-Type': 'application/json' },

            }
        ).then((res) => {
            if (!res.ok) {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log('user update', data);
            fullNameRef.current.value='';
            photoUrlRef.current.value='';
        })
        .catch((err) => {
            alert(`Error: ${err.message}`);
        });
        


    }


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
