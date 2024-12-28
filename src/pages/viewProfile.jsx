import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./viewProfile.module.css"; 

const ViewProfile = () => {
  const [emailInput, setEmailInput] = useState(""); 
  const [profile, setProfile] = useState(null); 
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailInput) {
      setError("Please enter an email.");
      return;
    }

    setIsLoading(true);
    fetch(`https://my-elegant-node-mongodb-api.onrender.com/api/profile/${emailInput}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.email) {
          setProfile(data); 
          setError(""); 
        } else {
          setError("No profile found for this email.");
          setProfile(null); 
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching profile. Please try again later.");
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.header}>My Professional Portfolio</h1>

      {!profile ? (
        <div className={styles.emailForm}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.formLabel}>Enter your email to view profile</label>
            <input
              type="email"
              id="email"
              value={emailInput}
              onChange={handleEmailChange}
              className={styles.formInput}
              placeholder="Enter your email"
              required
            />
            <button type="submit" className={styles.formButton} disabled={isLoading}>
              {isLoading ? <div className={styles.loader}></div> : "Fetch Profile"}
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      ) : (
        <div className={styles.profileBox}>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Full Name:</div>
            <div className={styles.value}>{profile.fullName}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Email:</div>
            <div className={styles.value}>{profile.email}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Phone:</div>
            <div className={styles.value}>{profile.phone}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Work Experience:</div>
            <div className={styles.value}>{profile.workExperience}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Professional Summary:</div>
            <div className={styles.value}>{profile.professionalSummary}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Skills:</div>
            <div className={styles.value}>{profile.skill}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Achievements:</div>
            <div className={styles.value}>{profile.achievements}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Certifications:</div>
            <div className={styles.value}>{profile.certifications}</div>
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.label}>Education:</div>
            <div className={styles.education}>
              <div className={styles.educationItem}>
                <h3>Tenth</h3>
                <p>{profile.education.tenth}%</p>
              </div>
              <div className={styles.educationItem}>
                <h3>Inter</h3>
                <p>{profile.education.inter}%</p>
              </div>
              <div className={styles.educationItem}>
                <h3>Graduate</h3>
                <p>{profile.education.graduate}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
