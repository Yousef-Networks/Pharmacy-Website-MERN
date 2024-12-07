import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

import './MedicineList.css'; // Import your CSS file for styling


const MedicineListPagep = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [medicalUseFilter, setMedicalUseFilter] = useState('');
  const { username } = useParams();

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getMedicines`,{
        withCredentials: true
      });

      if (response.status === 200) {
        setMedicines(response.data);
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSearch = () => {
    if (searchName === '' && medicalUseFilter === '') {
      fetchMedicines();
      return;
    }

    const filtered = medicines.filter((medicine) => {
      const nameMatch = searchName
        ? medicine.name && medicine.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const medicalUseMatch = medicalUseFilter
        ? medicine.medicalUse && medicine.medicalUse.toLowerCase().includes(medicalUseFilter.toLowerCase())
        : true;
      return nameMatch && medicalUseMatch;
    });

    setMedicines(filtered);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    handleSearch();
  };

  const handleMedicalUseFilterChange = (e) => {
    setMedicalUseFilter(e.target.value);
    handleSearch();
  };

  const resetFilters = () => {
    setSearchName('');
    setMedicalUseFilter('');
    fetchMedicines();
  };

  return (
    <div className="medicine-list-container">
       <Link to={`/changePharmacistPassword/${username}`}>Change My password</Link>
      <h1>All Medicines</h1>

     
      <div className="filter-container">
        <input
          type="text"
          placeholder="Enter medicine's name"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <input
          type="text"
          placeholder="Filter by medical use"
          value={medicalUseFilter}
          onChange={handleMedicalUseFilterChange}
        />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : medicines.length > 0 ? (
        <ul className="medicine-list">
          {medicines.map((m) => (
            <li key={m._id} className="medicine-item">
              <div className="medicine-details">
                <strong>Name:</strong> {m.name}<br />
                <strong>Price:</strong> {m.price}<br />
                <strong>Description:</strong> {m.description}<br />
                <strong>Medical Use:</strong> {m.medicalUse}<br />
                <strong>Quantity:</strong> {m.available_quantity}<br />
                <strong>Sales:</strong> {m.sales}<br />
                <div>
                <strong>Image: </strong>
                <img src={m.pictureUrl} alt={m.name} />
              </div>
                <Link to={`/edit/${m._id}`}>Edit</Link>
              </div>
              <div className="medicine-image">
                <img src={m.picture} alt={m.name} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Medicines found.</p>
      )}
      <Link to="/addMed">Add a new Medicine</Link>
      
    </div>
  );
};

export default MedicineListPagep;
