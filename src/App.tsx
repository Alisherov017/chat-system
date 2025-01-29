import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Home from "./components/home/Home";
// import Home from "./components/Home";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/home", element: <Home /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
