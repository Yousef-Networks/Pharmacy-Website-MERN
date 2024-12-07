import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  
 

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getPatients`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setPatients(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  const handleDelete = async (patientId) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.delete(`http://localhost:4000/deletePatient/${patientId}`,{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching
      fetchPatients();
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="medicine-list-container">
      <h1>All patients</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : patients.length > 0 ? (
        <ul className="medicine-list">
          {patients.map((m) => (
            <li key={m._id} className="medicine-item">
              <div className="medicine-details">
                <strong>Name:</strong> {m.name}<br />
                <strong>Username:</strong> {m.username}<br />
                <strong>email:</strong> {m.email}<br />
                <strong>mobile Number:</strong> {m.mobile_number}<br />
                <Link to="#" onClick={() => handleDelete(m._id)}>Delete</Link>
                
                
              </div>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No Patients found.</p>
      )}
    </div>
  );
};

export default PatientListPage;
