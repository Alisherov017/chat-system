import { create } from "zustand";
import { createChannel, getChannels } from "../firebase/channelService";
import { getMessages, sendMessage } from "../firebase/messageService";

interface Channel {
  id: string;
  name: string;
}

interface Message {
  senderId: string;
  message: string;
  timestamp: any; // Можно заменить на Date, если нужно
}

interface Store {
  channels: Channel[];
  messages: Message[];
  currentChannelId: string | null;
  loadChannels: () => Promise<void>;
  addChannel: (name: string) => Promise<void>;
  setCurrentChannelId: (channelId: string | null) => void;
  sendMessage: (message: string) => void;
  subscribeToMessages: () => void;
}

export const useStore = create<Store>((set, get) => ({
  channels: [],
  messages: [],
  currentChannelId: null,

  // Загружаем каналы
  loadChannels: async () => {
    const channels = await getChannels();
    set({ channels });
  },

  // Добавляем новый канал
  addChannel: async (name) => {
    await createChannel(name);
    get().loadChannels(); // Перезагружаем каналы
  },

  // Устанавливаем текущий канал
  setCurrentChannelId: (channelId) => {
    set({ currentChannelId: channelId });

    // Подписываемся на сообщения этого канала
    get().subscribeToMessages();
  },

  // Отправляем сообщение
  sendMessage: (message) => {
    const { currentChannelId } = get();
    if (currentChannelId) {
      sendMessage(message, currentChannelId);
    }
  },

  // Подписка на сообщения
  subscribeToMessages: () => {
    const { currentChannelId } = get();
    if (!currentChannelId) return;

    return getMessages(currentChannelId, (messages) => {
      set({ messages });
    });
  },
}));
