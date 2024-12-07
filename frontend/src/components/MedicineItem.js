import React from "react";

const MedicineItem = ({ Medicine }) => {
  return (
    <div className="Medicine-item">
      <img
        src={`data:${Medicine.picture.contentType};base64,${Medicine.picture.data}`}
        alt={Medicine.name}
      />
      <h2>{Medicine.name}</h2>
      <p>Price: {Medicine.price}</p>
      <p>{Medicine.description}</p>
      <p>Medicinal Use: {Medicine.medicinalUse}</p>
    </div>
  );
};

export default MedicineItem;



