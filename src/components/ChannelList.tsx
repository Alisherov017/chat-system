import React, { useState } from "react";
import "./ChannelList.css";
import { useStore } from "../store/useChatStore";
import { joinChannel } from "../firebase/channelService";
import { useNavigate } from "react-router-dom";

const ChannelList = () => {
  const { channels, addChannel, user, setCurrentChannelId } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const navigate = useNavigate();

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelName.trim()) {
      await addChannel(channelName);
      setShowModal(false);
      setChannelName("");
    } else {
      alert("Please enter a valid channel name.");
    }
  };

  const handleJoinChannel = async (channelId: string) => {
    if (user?.uid) {
      await joinChannel(channelId, user.uid); // Добавляем участника в канал
      setCurrentChannelId(channelId); // Устанавливаем канал как текущий
      navigate(`/chat/${channelId}`);
    }
  };

  return (
    <div>
      <p>Hello {user?.name}</p>
      <button onClick={() => setShowModal(true)}>Create new Channel</button>

      <h3>Channels</h3>
      <ul>
        {channels
          .sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          ) // Сортировка по времени
          .map((channel) => {
            const isUserInChannel = channel.participants.includes(
              user?.uid || ""
            );

            return (
              <li key={channel.id} className="channel-item">
                <span className="channel-name">{channel.name}</span>
                {!isUserInChannel && (
                  <button
                    onClick={() => handleJoinChannel(channel.id)}
                    className="join-button"
                  >
                    Join Channel
                  </button>
                )}
              </li>
            );
          })}
      </ul>

      {/* Модалка создания канала */}
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
