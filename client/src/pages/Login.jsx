import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

      const res = await API.post(
        "/auth/login",
        form
      );

      login(res.data);

      if (res.data.user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/provider");

      }

    } catch (err) {

      alert(err.response?.data?.message || "Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-5">

          Login

        </h1>

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
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

        <p className="mt-4">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  );

};

export default Login;