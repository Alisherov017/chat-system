import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../store/useChatStore";
import { getMessages, sendMessage } from "../../firebase/messageService";

const Chat = () => {
  const { channelId } = useParams<{ channelId: string }>();
  console.log(channelId, "channek id");

  const { messages, setMessages, user } = useStore();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (channelId) {
      getMessages(channelId, (newMessages) => {
        setMessages(newMessages); // Обновляем состояние сообщений в хранилище
      });
    }
  }, [channelId, setMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message, channelId || ""); // Отправляем сообщение в канал
      setMessage(""); // Очищаем поле ввода
    }
  };

  return (
    <div className="allContainer">
      <h2>Chat for Channel: {channelId}</h2>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.senderId}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
