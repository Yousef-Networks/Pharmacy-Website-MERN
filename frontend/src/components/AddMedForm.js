import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link,useParams } from 'react-router-dom';

const AddMedicineForm = ({ onMedicineAdded }) => {
    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[available_quantity,setAvailable_quantity]=useState('')
    const[price,setPrice]=useState('')
    const {username}=useParams();
    const[medicalUse,setMedicalUse]=useState('')
    const [picture, setPicture] = useState(null); // Store the selected image file
    const navigate = useNavigate();


  

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('available_quantity', available_quantity);
      formData.append('price', price);
      formData.append('medicalUse', medicalUse);
      formData.append('picture', picture); // Append the selected image file
  
      try {
        // Make a POST request to add the medicine
        const response = await axios.post('http://localhost:4000/addMedicine', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for file upload
          },
        },{
          withCredentials: true
        });
  
        // Check if the request was successful
        if (response.status === 201) {
          // Clear the form data or reset the state as needed
          setName('');
          setDescription('');
          setAvailable_quantity('');
          setPrice('');
          setMedicalUse('');
          setPicture(null); // Reset the selected image file
          navigate('/getMedicines/pharmasist');
        }
      } catch (error) {
        console.error('Error adding medicine:', error);
      }
    };
  
    // Handle file input change
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
    
      if (selectedFile) {
        setPicture(selectedFile); // Store the selected image file as a Blob
      } else {
        // Handle the case where the user canceled the file selection
        console.log('File selection canceled');
      }
    };
  return (
    <div>
      <h2>Add Medicine</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            id="desc"
            name="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableQuantity">Available Quantity:</label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={available_quantity}
            onChange={(e)=>setAvailable_quantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalUse">Medical Use:</label>
          <input
            type="text"
            id="medicalUse"
            name="medicalUse"
            value={medicalUse}
            onChange={(e)=>setMedicalUse(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="picture">Medicine Image:</label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicineForm;
