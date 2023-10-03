import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from './firebase'; 
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
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

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="left-half">
          <div className='logo'>
            <img src={require('./assets/login_logo.png')} alt="Logo" />
          </div>
        </div>
        <div className="right-half">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User ID"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage('');
              }}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage('');
              }}
            />
            <label className='forgot-password'>
              <a href='#'>Forgot password</a>
            </label>
            <button type="submit">Login</button>
          </form>

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

export default Login;
