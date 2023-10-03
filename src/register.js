import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import auth from './firebase';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);

      navigate('/home'); // Use navigate directly from useNavigate
    } catch (error) {
      // Set the error message if the credentials are invalid
      setErrorMessage('Invalid credentials.');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firebase Realtime Database
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        name: e.target.name.value, // Assuming 'name' is the id of the name input field
        phoneNumber: e.target.phoneNumber.value, // Assuming 'phoneNumber' is the id of the phoneNumber input field
      });

      console.log('User registered and signed in:', user);

      // Redirect to the login page
      navigate('/login');
    } catch (error) {
      // Set the error message based on the specific error code
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email is already registered. Please use a different email.');
          break;
        case 'auth/phone-number-already-in-use':
          setErrorMessage('Phone number is already registered. Please use a different phone number.');
          break;
        case 'auth/weak-password':
          setErrorMessage('Password is too weak. Please use a stronger password.');
          break;
        default:
          setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="left-half">
          <div className='logo'>
            <img src={require('./assets/login_logo.png')} alt="Logo" />
          </div>
        </div>
        <div className="right-half">
          <div className="registration-container">
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
              />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
              />
              <input
                type="email"
                id="registrationEmail"
                name="registrationEmail"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="registrationPassword"
                name="registrationPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <button type="submit">Register</button>
            </form>
          </div>

          <div className="error-message fade">{errorMessage}</div>
        </div>
        <div className='help-container'>
          <h2>
            <a href='#'>Help?</a>
          </h2>
          <p>Contact Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
