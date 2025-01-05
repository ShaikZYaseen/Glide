import React, { createContext, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Define the shape of the context
interface SocketContextType {
  socket: Socket;
}

// Create the context with a default value
export const SocketContext = createContext<SocketContextType | null>(null);

// Initialize the socket connection
const socket = io(`${import.meta.env.VITE_API_URL}`); // Replace with your server URL

// Define the props for the provider component
interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
