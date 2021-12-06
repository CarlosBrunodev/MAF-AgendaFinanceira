import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";;

const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const SOCKET_SERVER_URL = "http://localhost:8001";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    });

    return(
        <h1>aiiiiii</h1>
    )


};

export default useChat;