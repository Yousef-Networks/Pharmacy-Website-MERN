import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { username } = useParams();
  const navigate=useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  let totalprice=0;
  useEffect(() => {
    const fetchCart = async () => {
      try {
       
        const response = await axios.get(`http://localhost:4000/getPatientCart/${username}`,{
          withCredentials: true
        });
        console.log(response.data);

        if (response.status === 200) {
            setItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [username]);
  const deleteFromCart = async (medicineId) => {
    try {
        console.log(medicineId);
      const response = await axios.delete(`http://localhost:4000/deleteFromCart/${username}/${medicineId}`,{
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log('Item deleted from cart successfully');
        // Remove the deleted item from the cart state
        setItems(response.data);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
  const updateAmount = async (medicineId, newAmount) => {
    try {
      const response = await axios.put(`http://localhost:4000/updateCart/${username}/${medicineId}/${newAmount}`,{},{
        withCredentials: true
      });
  
      if (response.status === 200) {
        console.log('Item amount updated successfully');
        // Update the amount of the updated item in the cart state
        setItems(response.data);
      }
    } catch (error) {
      console.error('Error updating item amount:', error);
    }
  };
  

  return (
    <div>
      <h1>Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        <ul>
          {items.map((item) => (
            
            <li key={item.medicine_id}>
            <p>Name: {item.medicineName}</p>
              <p>Amount: {item.quantity}</p>
              <p>Price: {item.price}</p>
              <button onClick={() => updateAmount(item.medicine_id, item.quantity + 1)}>Increment</button>
            <button onClick={() => updateAmount(item.medicine_id, item.quantity - 1)}>Decrement</button>
              <button onClick={() => deleteFromCart(item.medicine_id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Items.</p>
      )}
     <button onClick={() => navigate(`/checkout/${username}`)}>Checkout</button>
    <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default CartPage;