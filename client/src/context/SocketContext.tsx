import React, { createContext, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Define the shape of the context
interface SocketContextType {
  sendMessage: (eventName: string, message: unknown) => void;
  receiveMessage: (
    eventName: string,
    callback: (data: unknown) => void
  ) => void;
  sendLocation: (eventName: string, data: any) => void;
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

  const sendMessage = (eventName: string, message: unknown): void => {
    socket.emit(eventName, message);
  };

  const sendLocation = (eventName: string, data: any): void => {
    socket.emit(eventName, data);
  };

  const receiveMessage = (
    eventName: string,
    callback: (data: unknown) => void
  ): void => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider
      value={{ sendMessage, receiveMessage, sendLocation }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
