import {create} from "zustand";


type UserStore = {
    username: string,
    updateUsername: (username: string) => void,
}

export const useUserStore = create<UserStore>()(set => ({
    username: '',

    updateUsername: (username: string) => set(() => ({
        username: username
    }))
}))