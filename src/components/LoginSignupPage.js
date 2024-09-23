import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import './Login.css';

const LoginSignupPage = ({setUser}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  // const [user, setUser] = useState(null); // Add user state

  const handleSuccessfulLogin = (userData) => {
    setUser(userData); // Set the user state when login is successful
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Perform login logic
        const response = await axios.post('https://gymlogger-backend-app.onrender.com/auth/login', {
          email,
          password,
        });
        const responseData = response.data;
        // console.log(responseData.user._id)
        

        if (responseData.message === 'Login success') {
          // Handle successful login
          alert('Logged in successfully');
          handleSuccessfulLogin(responseData.user); // Set user data when logged in
          navigate('/allexcercisepage');
        } else {
          alert('Login failed: ' + responseData.message);
        }
      } else {
        // Perform signup logic
        const response = await axios.post('https://gymlogger-backend-app.onrender.com/auth/register', {
          email,
          password,
          username,
        });
        const responseData = response.data;

        if (responseData.message === 'Successfully registered') {
          alert('Registered successfully');
        } else {
          alert('Registration failed: ' + responseData.message);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h1 className="login-head-title">
          <i className="fa-sharp fa-solid fa-heart-circle-bolt"></i>Fitness Logger
        </h1>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {isLogin || (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </p>
        <Link to="/forgot-password">Forgot Password?</Link>

        <div className="google-icon">
          <i className="fab fa-google"></i> <strong>Sign in with Google</strong>
        </div>

        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default LoginSignupPage;
