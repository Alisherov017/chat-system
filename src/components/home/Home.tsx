import ChannelList from "../ChannelList";
import Chat from "../chat/Chat";
import "./Home.css"; // Подключаем стили

const Home = () => {
  return (
    <div className="home-container">
      <div className="sidebar">
        <ChannelList />
      </div>
      <div className="chat-container">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
