
import React from 'react'
import { useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import axios from 'axios'


function ForgetPassword() {
    const [username, setUsername] = useState('');
  
    const navigate = useNavigate();
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/forgetPassword', {
                username
            });
            console.log(response.data);
            navigate(`/resetPassword/${username}`);
        }
        catch (error) {
            console.log(error);
          }
    };
    return (
        
        <form onSubmit={handleSubmit}>
            <h4>Forget Password</h4>
            <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
         
          <button type="submit">Send OTP</button>
        </form>
      );
}

export default ForgetPassword;
 