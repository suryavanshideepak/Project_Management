import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Toaster from "../components/Toaster";
import { Context } from "../context/MainContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuth, setIsAuth } = useContext(Context)
  const [toaster, setToaster] = useState({
    message: '',
    isError: false,
    isVisible: false,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password })).unwrap().then(() => {
        navigate("/dashboard");
        setIsAuth(true)
        setToaster({ message: 'Welcome', isError: false, isVisible: true })
      }).catch((err) => setToaster({ message: 'Failed to login ', isError: true, isVisible: true }))
    } catch (error) {
      setIsAuth(false)
      setToaster({ message: 'Failed to login ', isError: true, isVisible: true })
    }
  };

  const closeToaster = () => {
    setToaster((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-midnight">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="input-group-1" className="block text-sm font-medium text-gray-900">Your Email</label>
            <div className="relative mt-1">
              <input
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-midnight text-white py-2 rounded-lg hover:bg-purple transition-all" type="submit">Login</button>
        </form>
      </div>
      
    </div>
    <Toaster
        message={toaster.message}
        isError={toaster.isError}
        isVisible={toaster.isVisible}
        onClose={closeToaster}
      />
    </>
  );
};

export default Login;

