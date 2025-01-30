import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "./firebase";

// Отправка сообщения в канал
export const sendMessage = async (message: string, channelId: string) => {
  try {
    const messagesRef = collection(db, "channels", channelId, "Messages");
    await addDoc(messagesRef, {
      senderId: auth.currentUser?.uid,
      message: message,
      timestamp: serverTimestamp(), // Время отправки сообщения
    });
    console.log("Message sent!");
  } catch (e) {
    console.error("Error sending message: ", e);
  }
};

// Получение сообщений для канала в реальном времени
export const getMessages = (
  channelId: string,
  setMessages: React.Dispatch<React.SetStateAction<any>>
) => {
  const messagesRef = collection(db, "channels", channelId, "Messages");
  const q = query(messagesRef, orderBy("timestamp"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messagesList = snapshot.docs.map((doc) => doc.data());
    setMessages(messagesList); // Обновляем состояние с новыми сообщениями
  });

  return unsubscribe; // Возвращаем функцию для отписки
};
