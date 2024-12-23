import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${config.baseURL}/users/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Navigate after 2 seconds
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full mx-auto p-10 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-6 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-offset-2 shadow-lg"
          >
            Register
          </button>
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
