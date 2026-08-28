import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import registerImg from "../assets/images/register.png";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [society, setSociety] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !society) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await API.post("/register", { name, email, password, society });

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Try a different email.");
    }
  }

  return (
    <div className="register-page">

      <Navbar />

      <div className="register-container">

        <img src={registerImg} alt="Register illustration" className="register-image" />

        <div className="register-form-section">

          <h1>Create Account</h1>

          <p>Join your NeighbourHub community</p>

          <form onSubmit={handleRegister}>

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Society Name</label>

            <input
              type="text"
              placeholder="e.g. Green Valley Society"
              value={society}
              onChange={(e) => setSociety(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;