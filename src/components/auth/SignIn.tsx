import React, { useState } from "react";
// import { loginUser } from "./firebase"; // Импортируем функцию для входа
import "./SignIn.css"; // Импортируем стили
import { loginUser } from "../../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginUser(email, password);
    if (user) {
      alert("Login successful!");
    } else {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="switch">
        <p>
          Don't have an account? <Link to="/signup">S ign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
