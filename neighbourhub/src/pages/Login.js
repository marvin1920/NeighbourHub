import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api"; // adjust this path if your api.js file lives somewhere else
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please enter email and password.");
      return;
    }

    try {
      const response = await API.post("/login", { email, password });
      // adjust "/login" to match your actual Spring Boot endpoint if it's different

      console.log("Login response:", response.data);
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check your email and password.");
    }
  }

  return (
    <div className="login-page">

      <Navbar />

      <div className="login-container">

        <h1>Welcome Back</h1>

        <p>Login to your NeighbourHub account</p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;