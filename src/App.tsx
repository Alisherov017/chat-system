import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Home from "./components/home/Home";
import ViewParticipants from "./components/participants/ViewParticipants";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/SignIn" /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/home", element: <Home /> },
  { path: "/ViewParticipants", element: <ViewParticipants /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
