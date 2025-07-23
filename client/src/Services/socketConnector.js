import { io} from "socket.io-client"

const SOCKET_URL = "http://localhost:3000/chat"

export const chatSocket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect : false
})