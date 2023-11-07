import { Ticket } from "./ticket";

export class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.taken = [];
  }

  get NextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }
  get last13() {
    return this.taken.slice(0, 13);
  }
  createTicket() {
    const newTicket = new Ticket(this.NextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }
  assignTicket(agent, desktop) {
    if (this.pending.length === 0) {
      return null;
    }
    const newTicketAssign = this.pending.shift();
    newTicketAssign.agent = agent;
    newTicketAssign.desktop = desktop;

    this.taken.unshift(newTicketAssign);

    return newTicketAssign;
  }
}
