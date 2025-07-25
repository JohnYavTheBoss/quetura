//webSocket

const http = require("http").createServer(app);
const io = require("socket.io")(http);
const userSockteMap = {};

io.on("connection", (socket) => {
  console.log("un utilisateur est connecté", socket.id);

  const userId = socket.handshake.query.userId;

  console.log({ userId: userId });

  if (userId !== "undefined") {
    userSockteMap[userId] = socket.id;
  }
  console.log("User socket data", userSockteMap);

  socket.on("disconnet", () => {
    console.log("un utilisateur est deconnecté", socket.id);
    delete userSockteMap[userId];
  });
  socket.on("sendMessage", ({envoyeur, receveur, message, commad})=> {
    const receveurSocketId = userSockteMap[receveur];
    console.log('receveur', receveur);
    
    if(receveurSocketId){
        io.to(receveurSocketId).emit("receiveMessage", {
            envoyeur,
            message,
            commad
        })
    }
  })
});
http.listen(3000, ()=> {
    console.log(`le serveur Socket.IO est lancé au port 3000`);
    
})