import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [state] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Backend Api for JWT token generate process
   
    
     const response = await axios.post(`https://gymlogger-backend-app.onrender.com/auth/reset-password?id=${state.get("id")}&token=${state.get("token")}`, {
      password,
    });

    if (response.data.message === 'Password reset successfully') {
      navigate('/allexcercisepage', { replace: true });
    } else {
      // console.log('Password reset failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              name="password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              className="form-control rounded-0"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
