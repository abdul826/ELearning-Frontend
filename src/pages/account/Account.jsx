import React from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
// import { UserData } from "../../context/UserContext";
// import toast from "react-hot-toast";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({user}) => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        {
          user && (
            <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name - {user.name}</strong>
            </p>

            <p>
              <strong>Email - {user.email}</strong>
            </p>

            <button
              onClick={() => navigate(`/${user._id}/dashboard`)} 
              className="common-btn"
            >
              <MdDashboard />
              Dashboard
            </button>

            <br />

            {user.role === "Admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
             )} 
          </div>
        </div>
          )
        }
    </div>
    </>
  );
};

export default Account;