import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";

// Функция для создания канала
export const createChannel = async (channelName: string) => {
  try {
    const docRef = await addDoc(collection(db, "channels"), {
      name: channelName,
      creatorId: auth.currentUser?.uid, // Создатель канала
      participants: [auth.currentUser?.uid], // Создатель будет первым участником
    });
    console.log("Channel created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error creating channel: ", e);
  }
};

// Функция для получения всех каналов
export const getChannels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "channels"));
    const channels = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    return channels;
  } catch (e) {
    console.error("Error getting channels: ", e);
    return [];
  }
};
