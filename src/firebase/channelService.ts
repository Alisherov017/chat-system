import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { Channel } from "../store/useChatStore";
// import { useStore } from "zustand";

// Функция для создания канала
export const createChannel = async (channelName: string) => {
  try {
    const docRef = await addDoc(collection(db, "channels"), {
      name: channelName,
      creatorId: auth.currentUser?.uid, // Создатель канала
      participants: [auth.currentUser?.uid], // Создатель будет первым участником
      createdAt: serverTimestamp(),
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
      participants: doc.data().participants || [],
    }));
    return channels;
  } catch (e) {
    console.error("Error getting channels: ", e);
    return [];
  }
};

export const subscribeToChannels = (
  callback: (channels: Channel[]) => void
) => {
  const channelsRef = collection(db, "channels");
  return onSnapshot(channelsRef, (snapshot) => {
    const channels = snapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      participants: doc.data().participants || [],
    })) as Channel[];
    callback(channels);
  });
};

// Функция для добавления участника в канал
export const addParticipantToChannel = async (
  channelId: string,
  userId: string
) => {
  const channelRef = doc(db, "channels", channelId);
  await updateDoc(channelRef, {
    participants: arrayUnion(userId), // Добавляем пользователя в массив участников
  });
};

export const joinChannel = async (channelId: string, userId: string) => {
  if (!userId) return;
  try {
    await addParticipantToChannel(channelId, userId);
    console.log(`User ${userId} joined channel ${channelId}`);
  } catch (error) {
    console.error("Error joining channel:", error);
  }
};
