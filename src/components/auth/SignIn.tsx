import React, { useState } from "react";
import "./SignIn.css";
import { loginUser } from "../../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginUser(email, password);
    if (user) {
      toast.success("Login successful!");
      navigate("/home");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
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
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
