import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Home from "./components/home/Home";
import CreateChannel from "./components/CreateChannel";
import Chat from "./components/chat/Chat";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/SignIn" /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/home", element: <Home /> },
  { path: "/CreateChannel", element: <CreateChannel /> },
  { path: "/chat/:channelId", element: <Chat /> },
  // <Route path="/chat/:channelId" element={<Chat />} />
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
