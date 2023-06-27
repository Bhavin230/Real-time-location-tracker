const app = require("./app");
const connectDatabase = require("./config/database");
const logger = require("./logger/index");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  logger.error(`Error: ${err.message}`);
  logger.error(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
// io.on('connection', (socket) => {
//   console.log("connected")
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });
// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });
// Connecting to database
connectDatabase();

const Server1 = server.listen(process.env.PORT, () => {
  logger.info(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  logger.error(`Error: ${err.message}`);
  logger.error(`Shutting down the server due to Unhandled Promise Rejection`);

  Server1.close(() => {
    process.exit(1);
  });
});
