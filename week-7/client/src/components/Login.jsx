import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault(); // prevent form submission reload

    try {
      const response = await axios.post('http://localhost:3000/admin/login', {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token); // Save token for future requests
      alert('Logged in successfully!');
      // Navigate to dashboard or admin page here
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Check credentials.');
    }
  }

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>

        <form autoComplete="off" onSubmit={handleLogin}>
          <div className="space-y-2">
            <div>
              <label htmlFor="username" className="text-gray-600 mb-2 block">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                placeholder="username"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                placeholder="***********"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500"
            >
              Login
            </button>
            <div className="flex gap-2 pt-5">
              <p className="text-gray-600 text-sm">Don't have an account?</p>
              <a className="text-gray-600 text-sm underline" href="/register">Register here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
