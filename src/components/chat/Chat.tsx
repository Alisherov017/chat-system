import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Link } from "react-router-dom";

import { useStore } from "../../store/useChatStore";
import { getMessages } from "../../firebase/messageService";

interface ChatProps {
  channelId: string;
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const { messages, setMessages, channels, sendMessageStore } = useStore();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = getMessages(channelId, (newMessages) => {
      setMessages(newMessages);
    });
    return () => {
      unsubscribe();
    };
  }, [channelId, setMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessageStore(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="head">
        <h2>
          Channel:{" "}
          {channels.find((item) => item.id === channelId)?.name ||
            "No Channel Selected"}
        </h2>
        <Link to="/ViewParticipants">
          <span className="participants">View participants</span>
        </Link>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderName}</strong>: {msg.message}
          </p>
        ))}
      </div>

      <div className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
