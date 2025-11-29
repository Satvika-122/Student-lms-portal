import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import HeroSection from "../components/HeroSection";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("BACKEND RESPONSE:", data);

      setMsg(data.message);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page-with-hero">
      {/* HeroSection as Background - hide content */}
      <div className="login-hero-background">
        <HeroSection showContent={false} />
      </div>

      {/* Login Form Overlay */}
      <div className="login-form-overlay">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {msg && (
              <div className={`message ${msg.includes("success") || msg.includes("Welcome") ? "message-success" : "message-error"}`}>
                {msg}
              </div>
            )}

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <FiLogIn className="button-icon" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
