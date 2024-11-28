import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../apis/user";
import Swal from "sweetalert2";


const UserRegister : React.FC= () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSwitchToLogin = ()=>{
    navigate("/");
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      await createUser(formData).then(()=>{
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You have been registered successfully.',
            confirmButtonText: 'Okay',
          });
      })
      
    } catch (err: any) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response?.data?.message || 'Something went wrong!',
            confirmButtonText: 'Try Again',
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your username"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirm your password"
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
            onChange={(e) => setAvatar(e.target.files ? e.target.files[0] : null)}
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
          onClick={onSwitchToLogin}
          className="text-blue-600 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};

export default UserRegister;
