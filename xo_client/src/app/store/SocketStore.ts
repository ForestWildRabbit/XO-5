import {create} from 'zustand';

type SocketStore = {
    socket: WebSocket | null,
    updateSocket: (new_socket: WebSocket) => void
}

export const useSocketStore = create<SocketStore>()(set => ({
    socket: null,
    updateSocket: (new_socket) => set(() => ({
        socket: new_socket
    }))
}))