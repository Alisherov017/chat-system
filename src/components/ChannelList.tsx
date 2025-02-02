import React, { useState } from "react";
import { useStore } from "../store/useChatStore";
import { joinChannel } from "../firebase/channelService";
import "./ChannelList.css";
import { toast, ToastContainer } from "react-toastify";

interface ChannelListProps {
  setCurrentChannelId: (channelId: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({ setCurrentChannelId }) => {
  const { channels, addChannel, user } = useStore();
  // console.log(user, "user user user user useStore");

  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState("");

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (channelName.trim()) {
      await addChannel(channelName);
      setShowModal(false);
      setChannelName("");
      toast.success("Channel created successfully!");
    } else {
      toast.error("Please provide a channel name  ");
    }
  };

  const handleJoinChannel = async (channelId: string) => {
    if (user?.uid && user?.name) {
      await joinChannel(channelId, user.uid, user.name);

      useStore.setState((state) => ({
        channels: state.channels.map((ch) =>
          ch.id === channelId
            ? { ...ch, participants: [...ch.participants, user.uid] }
            : ch
        ),
      }));
      setCurrentChannelId(channelId);
    }
  };

  return (
    <div className="channel-list">
      <p className="welcome-message">
        Hello <span className="user_1"> {user?.name}</span>
      </p>
      <button
        className="create-channel-button"
        onClick={() => setShowModal(true)}
      >
        Create new Channel
      </button>

      <h3 className="top-channel">Channels</h3>
      <ul className="channel-items">
        {channels
          .sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          ) // sort by time
          .map((channel) => {
            const isUserInChannel = channel.participants.some((p) =>
              typeof p === "string" ? p === user?.uid : p.userId === user?.uid
            );
            // console.log(isUserInChannel, "isUserInChannel isUserInChannel");

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

      {/* modal  */}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ChannelList;
