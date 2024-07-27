/* 
    To create a context
    1. Create createContext from react
    2. store create context in a variable
    3. create a Procide Function and return Provider
*/

import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import {server} from '../main';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Login User
    const loginUser = async(email, password, navigate, fetchMyCourse)=> {
        setBtnLoading(true);
        try {
          const { data } = await axios.post(`${server}/api/user/login`, {
            email,
            password,
          });
   
          if(data){
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
            fetchMyCourse();
          }
        } catch (error) {
          setBtnLoading(false);
          setIsAuth(false);
          toast.error(error.response.data.message);
        }
    }

    // Register User
    const registerUser = async(name, email, password, navigate)=> {
        setBtnLoading(true);
        try {
          const { data } = await axios.post(`${server}/api/user/register`, {
            name,
            email,
            password,
          });
   
          if(data){
            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify");  
          }
        //   fetchMyCourse();
        } catch (error) {
          setBtnLoading(false);
          setIsAuth(false);
          toast.error(error.response.data.message);
        }
    }

    // Verify OTP
    const verifyOTP = async(OTP, navigate)=> {
        setBtnLoading(true);
        const activationToken = localStorage.getItem("activationToken");
        try {
          const { data } = await axios.post(`${server}/api/user/verifyuser`, {
            OTP,
            activationToken
          });
   
          if(data){
            toast.success(data.message);
            setBtnLoading(false);
            localStorage.clear();
            navigate("/login");  
          }
        } catch (error) {
          setBtnLoading(false);
          toast.error(error.response.data.message);
        }
    }

    // Fetch User
    const fetchUser = async()=>{
        try {
            const {data} = await axios.get(`${server}/api/user/me`,{
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            // console.log(data);
            if(data){
                setIsAuth(true);
                setUser(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return(
        <UserContext.Provider value={{
            user,
            setUser,
            setIsAuth,
            isAuth,
            loginUser,
            registerUser,
            verifyOTP,
            btnLoading,
            fetchUser,
            loading
        }}>
            {children}
            <Toaster />
        </UserContext.Provider>
    ) 
} 

export const UserData = () => useContext(UserContext);