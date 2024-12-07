import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

const AdminRegistrationForm = ({ onRegistrationSuccess }) => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to register the doctor
      const response = await axios.post('http://localhost:4000/addAdmin', values,{
        withCredentials: true
      });

      // Assuming the response contains the doctor's ID upon successful registration
      const adminusername = response.data.username;

      // Call a callback function to handle registration success
      onRegistrationSuccess(adminusername);
    } catch (error) {
      console.error('Error registering Admin:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',

      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="username">Username</label>
          <Field type="text" id="username" name="username" />


          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminRegistrationForm;