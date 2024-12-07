import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientOrders = () => {
  const [orders, setOrders] = useState([]);
  const { username } = useParams();
  const fetchOrders = async () => {
    const response = await axios.get(`http://localhost:4000/getPatientOrders/${username}`,{
      withCredentials: true
    });
    setOrders(response.data);
  };


  useEffect(() => {
    
    fetchOrders();
  }, [username]);

  const cancelOrder = async (orderId) => {
    try {
      console.log(orderId )
      const response = await axios.put(`http://localhost:4000/cancelOrder/${orderId}`,{},{
        withCredentials: true
      });
      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== orderId));
        fetchOrders();
      }
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div>
      <h1>Orders for {username}</h1>
      {orders.map((order, index) => (
        <div key={index}>
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.statuss}</p>
          <button onClick={() => cancelOrder(order._id)}>Cancel Order</button>
          {/* Display other order details */}
        </div>
      ))}
    </div>
  );
};

export default PatientOrders;