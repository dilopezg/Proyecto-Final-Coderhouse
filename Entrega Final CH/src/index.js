import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ChatClass from "./controllers/Chat.controller.js";
import winLog from "./utils/winston.utils.js";

const Chat = new ChatClass();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  // Mensaje de bienvenida
  winLog.info("💻 Nuevo usuario conectado!");
  socket.on("disconnect", () => {
    // Mensaje de despedida
    winLog.warn("❌ Usuario desconectado");
  });
  socket.on("mensajeRespuesta", (data) => {
    winLog.info(data);
  });

  //check db
  const existeChat = await Chat.getAll();
  socket.emit("sendMessages", existeChat);

  //frontend data
  socket.on("messageFront", async (data) => {
    await Chat.add(data);
    const newChats = await Chat.getAll();
    io.sockets.emit("messageBack", newChats);
  });
});

const serverHttp = async () => {
  await server.listen(app.get("port"), () =>
    console.log(
      `\n(💡💡💡SERVER💡💡💡) ◀▶ (🌐 http://localhost:${app.get("port")} 🌐)\n`
    )
  );
  server.on("error", (err) => console.log(err));
};

serverHttp();
