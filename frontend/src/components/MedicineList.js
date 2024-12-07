import React, { useState, useEffect } from "react";
import MedicineItem from "./MedicineItem";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import axios from "axios";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    // Fetch medicines from your backend API
    axios.get("your_backend_api_url/medicines").then((response) => {
      setMedicines(response.data);
      setFilteredMedicines(response.data);
    });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  const handleFilter = (filterType) => {
    if (filterType === "all") {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(
        (medicine) => medicine.medicinalUse === filterType
      );
      setFilteredMedicines(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <FilterDropdown onFilter={handleFilter} />
      <div className="medicine-list">
        {filteredMedicines.map((medicine) => (
          <MedicineItem key={medicine._id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
};

export default MedicineList;
