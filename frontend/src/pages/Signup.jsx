import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSignup() {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setMsg(data.message);
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Sign Up</h2>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignup}>
          Create Account
        </button>

        <p>{msg}</p>

        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  box: {
    background: "#fff",
    padding: 25,
    width: 300,
    borderRadius: 8,
    boxShadow: "0 0 10px #ddd",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "black",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
  },
};
