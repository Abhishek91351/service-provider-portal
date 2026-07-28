import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "provider",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert("Registered Successfully");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-5">

          Register

        </h1>

        <input
          className="w-full border p-3 mb-3"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 mb-3"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 mb-3"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4">

          Already have an account?

          <Link
            className="text-blue-600 ml-2"
            to="/login"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

};

export default Register;