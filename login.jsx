import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError('');
    try {
      const response = await ApiLogin(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token); 
        navigate('/'); 
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };
  const ApiLogin = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password123') {
          resolve({ success: true, token: 'dummyToken123' });
        } else {
          resolve({ success: false, message: 'Invalid email or password' });
        }
      }, 1000);
    });
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div
        className="hidden md:flex w-full md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}
      >
        {/* Optional overlay for text or branding */}
        <div className="bg-black bg-opacity-40 flex items-center justify-center w-full">
          <h2 className="text-white text-4xl font-bold">Welcome to MyApp</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full md:w-1/2 px-8 py-10 md:px-16 bg-white shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-2 p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mt-2 p-3 rounded-lg border-gray-300 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account? <a href="/register" className="text-blue-500 font-medium hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};
export default Login;