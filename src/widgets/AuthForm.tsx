'use client';

import { useState } from 'react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login with:', { email: formData.email, password: formData.password });
      // TODO: call login API
    } else {
      console.log('Register with:', formData);
      // TODO: call register API
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-md rounded-lg border border-[#ff5202]">
      <h1 className="text-3xl font-bold text-center text-[#ff5202] mb-6">
        {isLogin ? 'Login' : 'Create Account'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <>
            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
                required={!isLogin}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
              />
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full text-lg font-semibold bg-[#ff5202] text-white px-6 py-3 rounded hover:bg-[#e04800] transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </form>

      <p className="text-center text-gray-600 mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <span
          className="text-[#ff5202] font-semibold cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </span>
      </p>
    </div>
  );
}
