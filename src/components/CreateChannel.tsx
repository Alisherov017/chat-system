import React, { useState } from "react";
import { createChannel } from "../firebase/channelService";
// import { createChannel } from "../../services/channelService"; // Путь к файлу с функцией создания канала

const CreateChannel = () => {
  const [channelName, setChannelName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (channelName.trim()) {
      await createChannel(channelName); // Создаём канал
      setChannelName(""); // Очищаем поле ввода
      alert("Channel created successfully!");
    } else {
      alert("Please provide a channel name.");
    }
  };

  return (
    <div>
      <h2>Create New Channel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default CreateChannel;
