import { AlumniModel, ForumChatModel, ForumMemberModel } from "../Model/index.js";

export const chatDataSocket = (io) => {
  const chatSocket = io.of("/chat");

  chatSocket.on("connection", (socket) => {
    socket.on("join_forum", async ({ forumId }) => {
      socket.join(forumId);

        const messages = await ForumChatModel.find({ forumId });
        const member = (await ForumMemberModel.find({})).length;

      socket.emit("initial_data", { messages , member});
    });

    socket.on("send_message", async ({ forumId, alumniId, message }) => {
      const alumniDetails = await AlumniModel.findOne({ alumniId });

      
        const forumChatData = new ForumChatModel({
        forumId,
        message,
        alumniId,
        alumniName: alumniDetails?.userName ?? "Admin",
      });

      await forumChatData.save();
        chatSocket.in(forumId).emit("receive_message", forumChatData);
        
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
      
  });
};
