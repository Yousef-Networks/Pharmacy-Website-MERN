import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ChangePharmacistPass = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
   
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
  
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    if (newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    }
  
    if (!/[A-Z]/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter';
    }
  
    if (!/[a-z]/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one lowercase letter';
    }
  
    if (!/\d/.test(newPassword)) {
      errors.newPassword = 'Password must contain at least one number';
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/updatePassPharmacist`, {
      username,  
       currentPassword,
        newPassword,
      },{
        withCredentials: true
      });
  
      setSuccess(true);
      setErrors(null);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrors({ server: error.response.data.message });
      setSuccess(false);
    }
  };
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <h2>Change Password</h2>
      {errors && errors.server && (
        <p style={{ color: 'red' }}>{errors.server}</p>
      )}
      {success && (
        <p style={{ color: 'green' }}>Password updated successfully</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          {errors && errors.newPassword && (
            <p style={{ color: 'red' }}>{errors.newPassword}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {errors && errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePharmacistPass;
