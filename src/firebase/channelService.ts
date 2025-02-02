import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { Channel } from "../store/useChatStore";

// Function to create a channel
export const createChannel = async (channelName: string) => {
  try {
    const docRef = await addDoc(collection(db, "channels"), {
      name: channelName,
      creatorId: auth.currentUser?.uid,
      participants: [auth.currentUser?.displayName],
      createdAt: serverTimestamp(),
    });
    console.log("Channel created with ID: ", docRef.id);
  } catch (e) {
    console.error("Error creating channel: ", e);
  }
};

// Function to get all channels
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

// Function to add a participant to a channel
export const addParticipantToChannel = async (
  channelId: string,
  userId: string,
  userName: string
) => {
  try {
    const channelRef = doc(db, "channels", channelId);
    const channelDoc = await getDoc(channelRef);

    if (channelDoc.exists()) {
      const participants = channelDoc.data()?.participants || [];
      participants.push({ userId, userName });

      await updateDoc(channelRef, { participants });
      console.log(
        `User ${userName} with ID ${userId} joined channel ${channelId}`
      );
    }
  } catch (error) {
    console.error("Error adding participant:", error);
  }
};

// joining to the channel
export const joinChannel = async (
  channelId: string,
  userId: string,
  userName: string
) => {
  if (!userId || !userName) return;

  try {
    await addParticipantToChannel(channelId, userId, userName);
    console.log(
      `User ${userName} with ID ${userId} joined channel ${channelId}`
    );
  } catch (error) {
    console.error("Error joining channel:", error);
  }
};
