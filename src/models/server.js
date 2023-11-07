import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { Server as socketServer } from "socket.io";
import { Sockets } from "./sockets";
import cors from "cors";
import express from "express";
import path, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Server {
  constructor() {
    this.port = process.env.PUERTO ?? 8080;
    this.app = express();
    //http server
    this.server = createServer(this.app);
    //sockets configuration
    this.io = new socketServer(this.server);
    //inicializar sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(cors());

    this.app.get("/lasts", (_req, res) => {
      res.json({
        ok: true,
        lasts: this.sockets.ticketlist.last13,
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`app listen in port ${this.port}`);
    });
  }

  execute() {
    this.listen();
    this.middlewares();
  }
}
