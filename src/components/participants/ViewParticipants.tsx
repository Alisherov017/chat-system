import { useState } from "react";
import { useStore } from "../../store/useChatStore";
import { Link } from "react-router-dom";
import "./ViewParticipants.css";

const ViewParticipants = () => {
  const { channels, currentChannelId } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const channel = channels.find((ch) => ch.id === currentChannelId);

  const filteredParticipants = channel?.participants.filter((participant) =>
    typeof participant === "string"
      ? participant.toLowerCase().includes(searchTerm.toLowerCase())
      : participant.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="participants-container">
      <h2 className="participants-title">Participants in {channel?.name}</h2>

      <input
        type="text"
        placeholder="Search participants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <ul className="participants-list">
        {filteredParticipants?.length ? (
          filteredParticipants.map((participant, index) => (
            <li key={index} className="participant-item">
              {typeof participant === "string"
                ? participant
                : participant.userName}
            </li>
          ))
        ) : (
          <li className="no-results">No participants found</li>
        )}
      </ul>

      <Link to="/home" className="back-button">
        Back to Chat
      </Link>
    </div>
  );
};

export default ViewParticipants;
