import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import loginUser from '../apis/user';

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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your email"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your password"
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
