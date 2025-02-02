import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "./firebase";

// Sending a message to the channel
export const sendMessage = async (
  message: string,
  channelId: string,
  senderName: string
) => {
  try {
    const messagesRef = collection(db, "channels", channelId, "Messages");
    await addDoc(messagesRef, {
      senderId: auth.currentUser?.uid,
      senderName: senderName,
      message: message,
      timestamp: serverTimestamp(),
    });
    console.log("Message sent!");
  } catch (e) {
    console.error("Error sending message: ", e);
  }
};

// getting messages
export const getMessages = (
  channelId: string,
  setMessages: React.Dispatch<React.SetStateAction<any>>
) => {
  const messagesRef = collection(db, "channels", channelId, "Messages");
  const q = query(messagesRef, orderBy("timestamp"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messagesList = snapshot.docs.map((doc) => doc.data());
    setMessages(messagesList);
  });

  return unsubscribe;
};
