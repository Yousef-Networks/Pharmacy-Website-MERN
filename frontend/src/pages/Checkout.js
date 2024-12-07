import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js'; 
import PaymentForm from '../components/Stripe'; 
import {loadStripe} from '@stripe/stripe-js'; 
const stripePromise = loadStripe('pk_test');

const Checkout = () => {
  const { username,totalprice} = useParams();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentmethod1, setpaymentmethod1] = useState(null);
  const [items, setItems] = useState([]);
  const [orderId, setOrderId]= useState(null);
  const [wallet, setWallet]= useState(null); 
  const [patientcart, setPatientCart]= useState(null); 
  const [totalprice1, setTotalPrice1]= useState(0);
  const [walletError, setWalletError] = useState(null);
  const navigate=useNavigate();
  
  

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getAddresses/${username}`,{
        withCredentials: true
      });
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getAddresses/${username}`,{
          withCredentials: true
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    const fetchWallet = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getWallet/${username}`,{
          withCredentials: true
        });
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPatientCart/${username}`,{
          withCredentials: true
        });
        if (response.status === 200) {
          let p = 0;
          const itemsFromResponse = response.data;
          itemsFromResponse.forEach(item => {
            p += item.price * item.quantity;
          });
          setItems(itemsFromResponse);
          setTotalPrice1(p);
        }
      } catch (error) {
        console.error('Error fetching Cart:', error);
      }
    };
    
  
    
    fetchCart();
    fetchWallet();
    fetchAddresses();
  }, [username]);
  const handlePayment = () => {
    if (paymentmethod1 === 'Wallet') {
      handleWalletPayment(username, totalprice1);
      
      

    } else {
      handleCreateOrder('Pending', items, selectedAddress, paymentmethod1);
    }
    // Add more else if statements for other payment methods if needed
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!address) {
      setError('Address cannot be empty');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/addAddress/${username}/${address}`,{},{
        withCredentials: true
      });
      setSuccess('Address added successfully');
      console.log(response.data);
      fetchAddresses();
    } catch (error) {
      setError('Error adding address');
      console.error('Error adding address:', error);
    }
  };
  const handleCancelOrder = async (ordid) => {
    try {
      // Make a DELETE request to the backend to delete the patient
      await axios.put(`http://localhost:4000/cancelOrder/${ordid}`,{},{
        withCredentials: true
      });

      // After successful deletion, refresh the patient list by re-fetching

    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleCreateOrder = async (statuss,cart,shippingAddress,paymentMethod) => {
    try {
      const response = await axios.post(`http://localhost:4000/createOrder/${username}/${statuss}/${shippingAddress}/${paymentMethod}`,{},{
        withCredentials: true
      });
     // do something with the orderId
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  const handleWalletPayment = async (username,totalprice) => {
    try {
     
      const response = await axios.put(`http://localhost:4000/updatewallet/${username}/${totalprice}`,{},{
        withCredentials: true
      });
     
      const response1 = await axios.get(`http://localhost:4000/getWallet/${username}`,{
        withCredentials: true
      });
      setWallet(response1.data);
      
  
      if (response.status === 400) {
        setWalletError('An error occurred while updating the wallet');
        console.log('An error occurred while updating the wallet')
        
      } else {
        console.log(response.data.message);
        handleCreateOrder('Pending', items, selectedAddress, paymentmethod1);
        setWalletError(null);
      }
    } catch (error) {
      console.error('An error occurred while making the payment:', error);
      setWalletError('An error occurred while updating the wallet');
    }
  };
const handleCreditCardPayment = async () => {


};





  return (
    
    <div style={{ padding: '20px', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <h2>Wallet: ${wallet}</h2>
    </div>

{walletError && <p>{walletError}</p>}
      <h1 style={{ textAlign: 'center' }}>Your Cart</h1>
      {items.map((item, index) => (
        <p key={index}>{item.medicineName} - ${item.price} - Quantity: {item.quantity}</p>
        
      ))}
      <h2>Total Price: ${totalprice1}</h2>
  
      <h1 style={{ marginTop: '20px' }}>Choose Address</h1>
      {addresses.map((address, index) => (
        <button key={index} style={{ margin: '5px' }} onClick={() => setSelectedAddress(address)}>
          {address}
        </button>
      ))}
      {selectedAddress && <p>Selected Address: {selectedAddress}</p>}
  
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <button type="submit">Add Address</button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </form>
  
      <h2 style={{ marginTop: '20px' }}>Choose Payment Method</h2>
      <label>
  <input type="radio" value="Wallet" checked={paymentmethod1 === 'Wallet'} onChange={(e) => setpaymentmethod1(e.target.value)} />
  Wallet
</label>
<label>
  <input type="radio" value="Credit Card" checked={paymentmethod1 === 'Credit Card'} onChange={(e) => setpaymentmethod1(e.target.value)} />
  Credit Card
</label>
<label>
  <input type="radio" value="Cash on Delivery" checked={paymentmethod1 === 'Cash on Delivery'} onChange={(e) => setpaymentmethod1(e.target.value)} />
  Cash on Delivery
</label>
      <div style={{ marginTop: '20px' }}>
      <button onClick={() => handlePayment()}>Submit Order</button>
      </div>
    
      {paymentmethod1 === 'Credit Card' && (
 <div>
 <h2>Payment Information</h2>
 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
   <div style={{ flex: 1 }}>
     <Elements stripe={stripePromise}>
       <div className="stripe-container">
         <PaymentForm />
       </div>
     </Elements>
   </div>
   <div style={{ flex: 1 }}>
     {/* Add the Wallet form or content here */}
   </div>
 </div>
</div>
)}
    </div>
  );
};

export default Checkout;