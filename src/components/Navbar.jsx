import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { Context } from "../context/MainContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth , setIsAuth } = useContext(Context)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsAuth(false)
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-light shadow-lg">
      <h1 className="text-2xl font-semibold">Project Management</h1>

      <button 
        className="md:hidden p-2 text-2xl"
        onClick={toggleMenu}
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      <div className="hidden md:flex space-x-6">
        <Link to="/dashboard" className="p-3">Dashboard</Link>
        <Link to="/user" className="p-3">Users</Link>
        <Link to="/taskManagement" className="p-3">Task Management</Link>
        <button 
          className="bg-midnight text-white py-2 px-4 rounded-lg hover:bg-purple" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-light md:hidden shadow-lg">
          <div className="flex flex-col items-center py-4">
            <Link to="/dashboard" className="p-3" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/user" className="p-3" onClick={toggleMenu}>Users</Link>
            <Link to="/taskManagement" className="p-3" onClick={toggleMenu}>Task Management</Link>
            <button 
              className="bg-midnight text-white py-2 px-4 rounded-lg hover:bg-purple" 
              onClick={() => { toggleMenu(); handleLogout(); }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
