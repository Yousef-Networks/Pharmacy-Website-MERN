import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddAddress = () => {
  const { username } = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!address) {
      setError('Address cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/addAddress/${username}/${address}`);
      setSuccess('Address added successfully');
      console.log(response.data);
    } catch (error) {
      setError('Error adding address');
      console.error('Error adding address:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <button type="submit">Add Address</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddAddress;