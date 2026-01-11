import { create } from 'zustand';

interface User{
    id: number,
    firstname: string,
    lastname:string,
    email: string,
}

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await fetch('https://reqres.in/api/users');
      const data = await response.json();
      set({ users: data.data });
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  },
}));