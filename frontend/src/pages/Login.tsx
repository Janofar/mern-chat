import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../apis/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    try{
      await loginUser(email, password).then(({user})=>{
        navigate('/chat-window');
        dispatch(login(user));
      })
    }catch (err) {
      setError('Login failed, please check your credentials.');
    }
   
  };

  return (
    <div className="max-w-sm mx-auto p-6 text-center bg-white shadow-lg rounded-lg">
    <h1 className="mb-6 text-2xl font-bold text-gray-800">Login</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-600"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your password"
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Login
      </button>
    </form>
    <p className="mt-4 text-sm text-gray-600">
      Not registered?{' '}
      <a
        href="/user-register"
        className="text-blue-600 hover:underline"
      >
        Register here
      </a>
    </p>
  </div>
  
  );
};

export default Login;
