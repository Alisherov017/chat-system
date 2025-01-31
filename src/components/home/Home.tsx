import React, { useState } from "react";
import ChannelList from "../ChannelList";
import Chat from "../chat/Chat";
import "./Home.css"; // Подключаем стили

const Home = () => {
  const [currentChannelId, setCurrentChannelId] = useState<string | null>(null);

  return (
    <div className="home-container">
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
  );
};

export default Home;
