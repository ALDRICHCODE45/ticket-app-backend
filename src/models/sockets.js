import { TicketList } from "./ticket-list";

export class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketlist = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    //on Connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");
      socket.on("solicitar-ticket", (data, callback) => {
        const newTicket = this.ticketlist.createTicket()
        callback(newTicket)
      });
      socket.on('asignar-ticket', ({agent, desktop}, callback) => {
        const newTicket = this.ticketlist.assignTicket(agent, desktop)
        callback(newTicket)
        this.io.emit('new ticket assigned', this.ticketlist.last13 )
      })
    });
  }
}
