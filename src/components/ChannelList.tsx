import React, { useState } from "react";
import { useStore } from "../store/useChatStore";
import { joinChannel } from "../firebase/channelService";
import "./ChannelList.css";

interface ChannelListProps {
  setCurrentChannelId: (channelId: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ setCurrentChannelId }) => {
  const { channels, addChannel, user } = useStore();
  console.log(channels, "channels useStore");

  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");

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
      await joinChannel(channelId, user.uid);
      setCurrentChannelId(channelId); // Обновляем канал, который выбран
    }
  };

  return (
    <div className="channel-list">
      <p className="welcome-message">Hello {user?.name}</p>
      <button
        className="create-channel-button"
        onClick={() => setShowModal(true)}
      >
        Create new Channel
      </button>

      <h3>Channels</h3>
      <ul className="channel-items">
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
                <span
                  className="channel-name"
                  onClick={() => setCurrentChannelId(channel.id)}
                >
                  {channel.name}
                </span>
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
                className="channel-name-input"
              />
              <button type="submit" className="submit-channel-button">
                Create Channel
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cancel-button"
              >
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
