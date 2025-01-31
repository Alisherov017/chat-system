import { create } from "zustand";
import {
  addParticipantToChannel,
  createChannel,
  getChannels,
  subscribeToChannels,
} from "../firebase/channelService";
import { getMessages, sendMessage } from "../firebase/messageService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AppUser {
  uid: string;
  email?: string | null;
  name?: string;
}

export interface Channel {
  id: string;
  name: string;
  createdAt?: { seconds: number; nanoseconds: number };
  participants: string[];
}

interface Message {
  senderId: string;
  message: string;
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
  sendMessage: (message: string) => void;
  subscribeToMessages: () => void;
  setUser: (user: AppUser) => void;
  logout: () => void;
}

export const useStore = create<Store>((set, get) => {
  subscribeToChannels((channels) => {
    set({ channels });
  });
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      set({
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || "No Name",
        },
      });
    } else {
      set({ user: null });
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

    sendMessage: (message) => {
      const { currentChannelId } = get();
      if (currentChannelId) {
        sendMessage(message, currentChannelId);
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

    // ✅ Функция для присоединения к каналу
    joinChannel: async (channelId: string) => {
      const { user, channels } = get();
      if (!user) return;

      await addParticipantToChannel(channelId, user.uid);

      // Обновляем список каналов
      const updatedChannels = channels.map((ch) =>
        ch.id === channelId
          ? { ...ch, participants: [...ch.participants, user.uid] }
          : ch
      );

      set({ channels: updatedChannels });
    },

    // ✅ Функция проверки, в канале ли пользователь
    isUserInChannel: (channelId: string) => {
      const { user, channels } = get();
      if (!user) return false;

      const channel = channels.find((ch) => ch.id === channelId);
      return channel?.participants.includes(user.uid) ?? false;
    },
  };
});
