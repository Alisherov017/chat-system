import { create } from "zustand";
import {
  addParticipantToChannel,
  createChannel,
  getChannels,
  subscribeToChannels,
} from "../firebase/channelService";
import { getMessages, sendMessage } from "../firebase/messageService";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface AppUser {
  uid: string;
  email?: string | null;
  name?: string;
}

export interface Channel {
  id: string;
  name: string;
  createdAt?: { seconds: number; nanoseconds: number };
  participants: (string | { userId: string; userName: string })[];
}

interface Message {
  senderId: string;
  message: string;
  senderName: string;
  timestamp: any;
}

interface Store {
  user: AppUser | null;
  channels: Channel[];
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  currentChannelId: string | null;
  loadChannels: () => Promise<void>;
  addChannel: (name: string) => Promise<void>;
  setCurrentChannelId: (channelId: string | null) => void;
  sendMessageStore: (message: string) => void;
  subscribeToMessages: () => void;
  setUser: (user: AppUser) => void;
  logout: () => void;
}

export const useStore = create<Store>((set, get) => {
  subscribeToChannels((channels) => {
    set({ channels });
  });

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      let userName = firebaseUser.displayName || "No Name";

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (userDoc.exists()) {
        userName = userDoc.data().name;
      }
      useStore.setState({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: userName,
        },
      });
    } else {
      useStore.setState({ user: null });
    }
  });

  return {
    user: null,
    channels: [],
    messages: [],
    currentChannelId: null,
    setMessages: (messages) => set({ messages }),
    loadChannels: async () => {
      const channels = await getChannels();
      set({ channels });
    },

    addChannel: async (name) => {
      await createChannel(name);
    },

    setCurrentChannelId: (channelId) => {
      set({ currentChannelId: channelId });
      get().subscribeToMessages();
    },

    sendMessageStore: (message: string) => {
      const { currentChannelId, user } = get();
      // console.log(user, "user get() user get() user get() ");
      // console.log(currentChannelId, "currentChannelId get() ");
      if (!currentChannelId) {
        console.log("Please select a channel before sending a message.");
        return;
      }

      if (currentChannelId && user && user.name) {
        sendMessage(message, currentChannelId, user.name);
      } else {
        console.error("User name is not defined");
      }
    },

    subscribeToMessages: () => {
      const { currentChannelId } = get();
      if (!currentChannelId) return;

      return getMessages(currentChannelId, (messages) => {
        set({ messages });
      });
    },
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),

    joinChannel: async (channelId: string) => {
      const { user, channels } = get();
      if (!user) return;

      if (user && user.name) {
        await addParticipantToChannel(channelId, user.uid, user.name);
      } else {
        console.error("User name is not defined");
      }

      // Updating the list of channels and participants
      const updatedChannels = channels.map((ch) =>
        ch.id === channelId
          ? {
              ...ch,
              participants: [
                ...ch.participants,
                { userId: user.uid, userName: user.name ?? "Unknown" },
              ],
            }
          : ch
      );

      set({ channels: updatedChannels });
    },

    isUserInChannel: (channelId: string) => {
      const { user, channels } = get();
      if (!user) return false;

      const channel = channels.find((ch) => ch.id === channelId);
      return channel?.participants.includes(user.uid) ?? false;
    },
  };
});
