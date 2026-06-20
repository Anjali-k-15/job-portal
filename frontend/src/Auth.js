import { useState } from "react";
import "./App.css";

function Auth({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "User",
        email,
        password,
        role: "candidate",
      }),
    })
      .then((res) => res.text())
      .then(() => {
        alert("Registered Successfully");
        onSuccess();
      });
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Auth;