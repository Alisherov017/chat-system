import React, { useState, useEffect } from "react";
import { useStore } from "../../store/useChatStore";
import { getMessages } from "../../firebase/messageService";
import "./Chat.css";

interface ChatProps {
  channelId: string;
}

const Chat: React.FC<ChatProps> = ({ channelId }) => {
  const { messages, sendMessage } = useStore();
  console.log(messages, "messages useStore");

  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages(channelId, (newMessages) => {});
  }, [channelId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message); // Отправить сообщение в чат
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat for Channel: {channelId}</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.timestamp}>{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
