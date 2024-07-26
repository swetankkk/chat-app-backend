import { Server } from "socket.io";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*={ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("New Socket.IO connection established");

      socket.on("message", (message) => {
        console.log("Received message:", message);
        socket.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("Socket.IO connection closed");
      });
    });
  },
};
