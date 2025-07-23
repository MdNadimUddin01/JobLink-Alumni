import { io} from "socket.io-client"

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL + "chat";

export const chatSocket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect : false
})