import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createUser } from "../apis/user"; // Replace with your actual service

const UserRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null as File | null,
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, avatar } = formData;
    if(!email){
      setError("Email is not provided");
      return;
    }

    if(!username){
      setError("User name is not provided");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');

    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    if (avatar) {
      data.append("avatar", avatar);
    }

    try {
      await createUser(data);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have been registered successfully.",
        confirmButtonText: "Okay",
      });
      navigate("/");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Something went wrong!",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 text-center bg-white shadow-lg rounded-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
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
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Avatar:
          </label>
          <input
            type="file"
            id="avatar"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already registered?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default UserRegister;
