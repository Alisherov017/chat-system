import React, { useState } from "react";
import { createChannel, getChannels } from "../firebase/channelService";
import "./ChannelList.css";
// import { createChannel } from "../../services/channelService"; // Путь к функции создания канала

const ChannelList = () => {
  const [channels, setChannels] = useState<any[]>([]); // Состояние для каналов
  const [showModal, setShowModal] = useState(false); // Состояние для отображения модалки
  const [channelName, setChannelName] = useState(""); // Состояние для названия канала

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelName.trim()) {
      await createChannel(channelName); // Создаём канал
      setShowModal(false); // Закрываем модалку
      setChannelName(""); // Очищаем поле ввода
    } else {
      alert("Please enter a valid channel name.");
    }
  };

  // Получение каналов (сделать это по необходимости)
  const loadChannels = async () => {
    // Каналы будут загружаться из Firestore
    const fetchedChannels = await getChannels();
    setChannels(fetchedChannels);
  };

  React.useEffect(() => {
    loadChannels();
  }, []);

  return (
    <div>
      <h3>Channels</h3>
      <button onClick={() => setShowModal(true)}>Create new Channel</button>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <button>{channel.name}</button>
          </li>
        ))}
      </ul>

      {/* Модалка для создания канала */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a New Channel</h2>
            <form onSubmit={handleCreateChannel}>
              <input
                type="text"
                placeholder="Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              <button type="submit">Create Channel</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelList;
