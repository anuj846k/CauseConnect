// https://causeconnect-dgu1.onrender.com/api/users/login
// route for login

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from '../shared/Button';
import { useAuth } from '@/components/hooks/authContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://causeconnect-dgu1.onrender.com/api/users/login',
        { username, password },
        { withCredentials: true }
      );

      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true); // Update the global login state
      navigate('/events');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Login failed');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/world-charity-day-backgrounds_1198941-10278.jpg?w=740')`,
      }}
    >
      {/* Overlay to create a faded effect */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md z-10">
        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6">
          Login to Your Account
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button text="Log In" type="submit" />
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-900 hover:text-blue-800"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

