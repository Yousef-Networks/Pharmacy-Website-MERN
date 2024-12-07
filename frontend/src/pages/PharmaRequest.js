import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PharmaRegistration = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hourly_rate, setHourly_rate] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [educational_background, setEducational_background] = useState('');
  const [date_of_birth, setDateOfBirth] = useState('');
  const [workingLicense, setWorkingLicense] = useState(null);
  const [pharmacistDegree, setPharmacistDegree] = useState(null);
  const [pharmacistId, setPharmacistId] = useState(null);

  const [error, setError] = useState(null);
  const [isPharmacistRegistered] = useState(false);

  const handleWorkingLicenseChange = (e) => {
    setWorkingLicense(e.target.files[0]);
  };

  const handlePharmacistDegreeChange = (e) => {
    setPharmacistDegree(e.target.files[0]);
  };

  const handlePharmacistIdChange = (e) => {
    setPharmacistId(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password); // Added password as a regular form field
    formData.append('hourly_rate', hourly_rate);
    formData.append('affiliation', affiliation);
    formData.append('educational_background', educational_background);
    formData.append('date_of_birth', date_of_birth);
    formData.append('workingLicense', workingLicense);
    formData.append('pharmacistDegree', pharmacistDegree);
    formData.append('pharmacistId', pharmacistId);

    try {
      const response = await axios.post('http://localhost:4000/createRequest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },{
        withCredentials: true
      });

      if (response.status === 201) {
        setSuccessMessage('Registration successful');
        setUsername('');
        setName('');
        setEmail('');
        setPassword('');
        setDateOfBirth('');
        setHourly_rate('');
        setAffiliation('');
        setEducational_background('');
        setWorkingLicense(null);
        setPharmacistDegree(null);
        setPharmacistId(null);
        setError(null);
        navigate('/'); // Redirect to the appropriate page
      }
    } catch (error) {
      console.error('Error registering pharmacist:', error);
      setSuccessMessage(null);
    }
  };



  return (
    <div className="container">
       {successMessage && <p>{successMessage}</p>}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Pharmacist Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e)=>setUsername(e.target.value)}
            value={username}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
            onChange={(e)=>setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
            onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
            onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

               

                

                <div className="form-group">
                  <label htmlFor="hourlyRate">Hourly Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    id="hourlyRate"
                    value={hourly_rate}
            onChange={(e) => setHourly_rate(e.target.value)}
                    placeholder="Enter your hourly rate"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="aff">Affiliation</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactName"
                    value={affiliation}
            onChange={(e) =>
             setAffiliation(e.target.value)
            }
                    placeholder="Enter you Affiliation"
                  />
                </div>

                

                <div className="form-group">
                  <label htmlFor="educational_background">Educational Background</label>
                  <input
                    type="text"
                    className="form-control"
                    id="educational_background"
                    value={educational_background}
            onChange={(e) =>
              setEducational_background(e.target.value)
            }
                    placeholder="Enter your Educational Background"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={date_of_birth}
            onChange={(e) => {
              
              setDateOfBirth(e.target.value);
            }}
                    id="dob"
                  />
                </div>


                {/* Working License PDF */}
                <div className="form-group">
                  <label htmlFor="workingLicense">Working License PDF</label>
                  <input
                    type="file"
                    id="workingLicense"
                    accept=".pdf"
                    onChange={handleWorkingLicenseChange}
                  />
                </div>

                
                  
                 {/* Pharmacist Degree PDF */}
                 <div className="form-group">
                  <label htmlFor="pharmacistDegree">Pharmacist Degree PDF</label>
                  <input
                    type="file"
                    id="pharmacistDegree"
                    accept=".pdf"
                    onChange={handlePharmacistDegreeChange}
                  />
                </div>
               {/* Pharmacist ID PDF */}
               <div className="form-group">
                  <label htmlFor="pharmacistId">Pharmacist ID PDF</label>
                  <input
                    type="file"
                    id="pharmacistId"
                    accept=".pdf"
                    onChange={handlePharmacistIdChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>

              <div className="mt-3">
                <Link to="/" className="btn btn-secondary">
                  Back to Role Selection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaRegistration;
