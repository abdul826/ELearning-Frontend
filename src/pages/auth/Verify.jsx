import React, { useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Verify = () => {
  const {btnLoading,verifyOTP} = UserData();
  const navigate = useNavigate();
  const [otp, setOtp] = useState();

  const submitHandler = async(e)=>{
    e.preventDefault();
    await verifyOTP(Number(otp), navigate);
  }
  
  return (
    <>
      <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Otp</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />      
            <button disabled={btnLoading} type="submit" className="common-btn">
              {btnLoading ? "Please Wait..." : "Verify"}
            </button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
    </>
  )
}

export default Verify