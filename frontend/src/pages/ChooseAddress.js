import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChooseAddress = () => {
  const { username } = useParams();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [username]);

  return (
    <div>
      <h1>Choose Address</h1>
      {addresses.map((address, index) => (
        <button key={index} onClick={() => setSelectedAddress(address)}>
          {address}
        </button>
      ))}
      {selectedAddress && <p>Selected Address: {selectedAddress}</p>}
    </div>
  );
};

export default ChooseAddress;