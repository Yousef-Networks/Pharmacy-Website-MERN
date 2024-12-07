import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientRegistration = () => {
    const navigate = useNavigate();

    const[username,setUsername]=useState('')
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[date_of_birth,setDateOfBirth]=useState('')
const[gender,setGender]=useState('')
const[mobile_number,setMobileNumber]=useState('')
const [emergency_contact, setEmergencyContact] = useState({
    full_name: '',
    mobile_number: '',
    relation_to_patient:''
  });

  const [error, setError] = useState(null);
  const [isPatientRegistered, setIsPatientRegistered] = useState(false);

  


    const handleSubmit = async (e) => {
        e.preventDefault();
        const p={username,name,email,password,date_of_birth,gender,mobile_number,emergency_contact}
        try {
          // Make a POST request to your backend API endpoint
          const response = await axios.post('http://localhost:4000/register/patient', p,{
            withCredentials: true
          });
      
          if (response.status === 201) {
            console.log('Registration successful:', response.data);
            setUsername('');
            setName('');
            setEmail('');
            setPassword('');
            setDateOfBirth('');
            setGender('Male');
            setMobileNumber('');
            setEmergencyContact({ fullName: '', mobileNumber: '' });
            setError(null);
            setIsPatientRegistered(true);
            navigate(`/getMedicines`);
           
          }
        } catch (error) {
          // Handle errors, e.g., display an error message to the user
          console.error('Error registering patient:', error);
        }
      };


  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Patient Registration</h1>
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

                <div className="form-group">
                  <label>Gender</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="male"
                      name="gender"
                      value={gender}
            onChange={(e) => setGender("male")}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="female"
                      value={gender}
            onChange={(e) => setGender("female")}
                      name="gender"
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={mobile_number}
            onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergencyContactName"
                    value={emergency_contact.full_name}
            onChange={(e) =>
              setEmergencyContact({
                ...emergency_contact,
                full_name: e.target.value,
              })
            }
                    placeholder="Enter emergency contact's name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContactMobile">Emergency Contact Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="emergencyContactMobile"
                    value={emergency_contact.mobile_number}
            onChange={(e) =>
              setEmergencyContact({
                ...emergency_contact,
                mobile_number: e.target.value,
              })
            }
                    placeholder="Enter emergency contact's mobile number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="relationToPatient">Relation to Patient</label>
                  <input
                    type="text"
                    className="form-control"
                    id="relationToPatient"
                    value={emergency_contact.relation_to_patient}
            onChange={(e) =>
              setEmergencyContact({
                ...emergency_contact,
                relation_to_patient: e.target.value,
              })
            }
                    placeholder="Enter relation to the patient"
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

export default PatientRegistration;
