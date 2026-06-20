import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!name) {
      alert("Enter your name");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: "candidate",
      }),
    })
      .then((res) => res.text())
      .then(() => {
        alert("Registration Successful ✅");
        navigate("/jobs");
      })
      .catch((err) => {
        console.log(err);
        alert("Backend not running");
      });
  };

  return (
    <div className="register-page">
      <div className="auth-card">
        <h2>Register</h2>

        <p className="register-text">
          Register and start applying for jobs today 🚀
        </p>

        <input
          type="text"
          placeholder="👤 Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="🔒 Password (Min 6 Characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>
          Register
        </button>

        <p className="login-text">
          Find your dream job with top companies.
        </p>
      </div>
    </div>
  );
}

export default Register;