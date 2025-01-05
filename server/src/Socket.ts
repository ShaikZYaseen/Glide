import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { User } from "./models/user.models";
import { CaptainModel } from "./models/captain.models";

let io: Server | undefined;

interface JoinData {
  userId: string;
  userType: "user" | "captain";
}

interface LocationData {
  userId: string;
  location: {
    ltd: number;
    lng: number;
  };
}

interface MessageObject {
  event: string;
  data: any;
}

function initializeSocket(server: HttpServer): void {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data: JoinData) => {
      const { userId, userType } = data;

      try {
        if (userType === "user") {
          await User.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error("Error updating socket ID:", error);
      }
    });

    socket.on("update-location-captain", async (data: LocationData) => {
      const { userId, location } = data;

      if (
        !location ||
        typeof location.ltd !== "number" ||
        typeof location.lng !== "number"
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      try {
        await CaptainModel.findByIdAndUpdate(userId, {
          location: {
            ltd: location.ltd,
            lng: location.lng,
          },
        });
      } catch (error) {
        console.error("Error updating location:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (
  socketId: string,
  messageObject: MessageObject
): void => {
  console.log(messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
