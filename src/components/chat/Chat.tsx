// import React, { useState, useEffect } from "react";
// import { useStore } from "../../store/useChatStore";
// // import { useStore } from "../store/useStore";

// const Chat = () => {
//   const { messages, sendMessage, subscribeToMessages } = useStore();
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     const unsubscribe = subscribeToMessages();
//     return () => unsubscribe && unsubscribe();
//   }, [subscribeToMessages]);

//   const handleSend = () => {
//     if (newMessage.trim() !== "") {
//       sendMessage(newMessage);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="chat">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className="message">
//             <strong>{msg.senderId}: </strong> {msg.message}
//           </div>
//         ))}
//       </div>
//       <div className="input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React from "react";

const Chat = () => {
  return <div>Chat</div>;
};

export default Chat;
