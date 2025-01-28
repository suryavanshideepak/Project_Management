import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "../services/firebase";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProjectDetails from "../pages/ProjectDetails";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../components/Navbar'
import User from "../pages/Users";
import TaskManagement from "../pages/TaskManagement";
import { setUser } from "../features/auth/authSlice";
import { Context } from "../context/MainContext";


const MyRouter = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const { isAuth, setIsAuth} = useContext(Context)
  const pages = [
    { path:'/dashboard', exact: true, component: Dashboard },
    { path:'/dashboard/:projectId', exact: true, component: ProjectDetails },
    { path:'/user', exact: true, component: User},
    { path:'/taskManagement', exact: true, component: TaskManagement}
];
useEffect(() => {
  const storedUser = localStorage.getItem("userDetails");
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));
  }
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    if (currentUser) {
      dispatch(setUser(currentUser)); 
    } else {
      localStorage.removeItem('userDetails');
      dispatch(setUser(null));
    }
    setLoading(false)
  });

  return () => unsubscribe();
}, [dispatch]);

if (loading) {
  return <div className="w-full h-screen">Loading...</div>; 
}
return(
    <BrowserRouter >
          {isAuth && <Navbar/>}
          <Routes>
              {isAuth ? pages.map(({ component: Component, path, exact, auth }) => {         
                return (
                <Route
                    key={path}
                    element= {<Component/>}
                    path={path}
                />
            );
          }   
          ): <Route  path="/" element={<Login/>}/>}
          </Routes> 
      </BrowserRouter>
  )
}
export default MyRouter
