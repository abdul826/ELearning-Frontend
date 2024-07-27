import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header.jsx';
import Loading from './components/loading/Loading.jsx';
import Home from './pages/home/Home.jsx';
import Login from './pages/auth/Login.jsx';
import './App.css';
import Register from './pages/auth/Register.jsx';
import Verify from './pages/auth/Verify.jsx';
import Footer from './components/footer/Footer.jsx';
import About from './pages/about/About.jsx';
import Account from './pages/account/Account.jsx';
import { UserData } from './context/UserContext.jsx';
import { Toaster } from 'react-hot-toast';
import Courses from './pages/course/Courses.jsx';
import CourseDescription from './pages/courseDescription/coursedescription.jsx';
import PaymentSuccess from './pages/paymentSuccess/PaymentSuccess.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import CourseStudy from './pages/courseStudy/courseStudy.jsx';
import Lecture from './pages/lecture/Lecture.jsx';
import AdminDashboard from './admin/Dashboard/AdminDashboard.jsx';
import AdminCourses from './admin/Courses/AdminCourses.jsx';
import AdminUsers from './admin/Users/AdminUsers.jsx';

const App = () => {
  const {isAuth, user, loading} = UserData();
  console.log(user);
  return (
    <>
      {
        loading ? (
        <Loading />
      )
      :
      (
        <BrowserRouter>
        <Header isAuth = {isAuth} />
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/account' element={isAuth ? <Account user = {user} /> : <Login />} />
            <Route path='/login' element={isAuth ? <Home /> : <Login />} />
            <Route path='/register' element={isAuth ? <Home /> :<Register />} />
            <Route path='/verify' element={isAuth ? <Home /> :<Verify />} />
            <Route path='/course/:id' element={isAuth ? <CourseDescription user={user} /> :<Login />} />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      )
      }
    </>
  )
}

export default App