import "./Home.css";
import ChannelList from "../ChannelList";
import Chat from "../chat/Chat";
import { useStore } from "../../store/useChatStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setCurrentChannelId, currentChannelId, user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <h1>Chat App</h1>
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <div className="main-container">
        <div className="sidebar">
          <ChannelList setCurrentChannelId={setCurrentChannelId} />
        </div>
        <div className="chat-container">
          {currentChannelId ? (
            <Chat channelId={currentChannelId} />
          ) : (
            <p>Please select a channel to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
