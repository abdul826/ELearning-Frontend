import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import "./header.css";


const Header = ({isAuth}) => {
  const {setUser, setIsAuth} = UserData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("LogOut Successfully");
    navigate("/login");
  }

  return (
    <>
      <header>
        <div className="logo">E-Learning</div>

        <div className="link">
          <Link to={"/"}>Home</Link>
          <Link to={"/courses"}>Courses</Link>
          <Link to={"/about"}>About</Link>
          {isAuth ? (
            <>
              <Link to={"/account"}>Account</Link>
              <button onClick={logoutHandler}>Logout</button>
            </>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
