import React, { useState } from "react";
import "./SignUp.css"; // Импортируем стили
import { registerUser } from "../../firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await registerUser(email, password);
    if (user) {
      alert("Registration successful!");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
      <div className="switch">
        <p>
          Already have an account? <Link to="/signup">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
