import React, { useState } from "react";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
// import SignIn from "./SignIn"; // Путь к компоненту для входа
// import SignUp from "./SignUp"; // Путь к компоненту для регистрации

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      {isSignUp ? <SignUp /> : <SignIn />}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default App;
