import { create } from 'zustand';

export type GameUser = {
  id: number;
  username?: string;
  fullname: string;
  user_chat_id: string;
  wallet_address?: string;
  active_point: number;
  blue_stars: number;
  red_stars: number;
  created_at?: any;
  updated_at?: any;
};

type UserStore = {
  currentUser: GameUser | null;
  setCurrentUser: (user: GameUser) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  // currentUser: {
  //   id: 1,
  //   username: 'testuser',
  //   fullname: 'Test User',
  //   user_chat_id: '7189498397',
  //   wallet_address: 'qwesdf',
  //   active_point: 0,
  //   blue_stars: 1230,
  //   red_stars: 5000,
  // },
  // setCurrentUser: (user: GameUser) => set((state) => ({currentUser: user})),
  setCurrentUser: (user: GameUser) => set(() => ({currentUser: user})),
}));
