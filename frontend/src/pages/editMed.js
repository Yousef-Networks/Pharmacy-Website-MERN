// EditMedicinePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';


const EditMedicinePage = () => {
  const { medicineId } = useParams();
  const navigate=useNavigate();
  // Get the medicine ID from the URL parameter
  const [medicine, setMedicine] = useState({});
  const [formData, setFormData] = useState({
    description: '',
    price: '',
  });

  useEffect(() => {
    // Fetch medicine details based on the ID
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getMedicine/${medicineId}`);
        if (response.status === 200) {
          setMedicine(response.data);
          // Pre-fill the form with the current description and price
          setFormData({
            description: response.data.description,
            price: response.data.price,
          });
        }
      } catch (error) {
        console.error('Error fetching medicine details:', error);
      }
    };

    fetchMedicine();
  }, [medicineId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a PUT request to update the medicine with the new description and price
      const response = await axios.put(`http://localhost:4000/updateMed/${medicineId}`, formData);

      // Check if the request was successful
      if (response.status === 200) {
        // Handle success (e.g., show a success message)
        console.log('Medicine updated successfully');
        navigate('/getMedicines/pharmasist')
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  return (
    <div>
      <h2>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Medicine</button>
      </form>
    </div>
  );
};

export default EditMedicinePage;
