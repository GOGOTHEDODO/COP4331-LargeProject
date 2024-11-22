import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        onLogin(data.token); // Assume backend sends an auth token
        navigate("/planner");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="Username"
            value={credentials.login}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
