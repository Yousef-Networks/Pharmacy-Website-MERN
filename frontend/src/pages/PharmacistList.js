import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling

const PharmacistListPage = () => {
  const [pharmacist, setPharmacist] = useState([]);
  const [loading, setLoading] = useState(true);
  
 

  const fetchPharmacists = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPharmacist`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setPharmacist(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacists();
  }, []);
  const handleDelete = async (patientId) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.delete(`http://localhost:4000/deletePharmacist/${patientId}`,{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching
      fetchPharmacists();
    } catch (error) {
      console.error('Error deleting pharma:', error);
    }
  };

  return (
    <div className="medicine-list-container">
      <h1>All pharmacists</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : pharmacist.length > 0 ? (
        <ul className="medicine-list">
          {pharmacist.map((m) => (
            <li key={m._id} className="medicine-item">
              <div className="medicine-details">
                <strong>Name:</strong> {m.name}<br />
                <strong>Username:</strong> {m.username}<br />
                <strong>email:</strong> {m.email}<br />
                <strong>Educational Background:</strong> {m.educational_background}<br />
                <strong>Afilliation:</strong> {m.affiliation}<br />
                <Link to="#" onClick={() => handleDelete(m._id)}>Delete</Link>
                
                
              </div>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No Pharmacists found.</p>
      )}
    </div>
  );
};

export default PharmacistListPage;
