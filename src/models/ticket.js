import { v4 as uuid } from "uuid";

export class Ticket {
  constructor(number) {
    this.id = uuid();
    this.number = number;
    this.desktop = null;
    this.agent = null;
  }
}
