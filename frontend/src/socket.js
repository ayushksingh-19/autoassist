import { io } from "socket.io-client";
import { API_BASE_URL } from "./services/api";

const SOCKET_URL = API_BASE_URL.replace(/\/api$/, "");

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export default socket;
