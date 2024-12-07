import React, { useState } from "react";

const FilterDropdown = ({ onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleFilterChange = (e) => {
    const filterType = e.target.value;
    setSelectedFilter(filterType);
    onFilter(filterType); // Pass the selected filter type to the parent component
  };

  return (
    <div className="filter-dropdown">
      <label>Filter by Medicinal Use:</label>
      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="painRelief">Pain Relief</option>
        {/* Add more filter options as needed */}
      </select>
    </div>
  );
};

export default FilterDropdown;
