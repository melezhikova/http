// const uuid = require('uuid');

// export default class TicketsController {
//   constructor() {
//     this.tickets = [];
//   }

//   getTickets() {
//     return this.tickets;
//   }

//   getTicketById(object) {
//     return this.tickets.find((element) => element.id === object.id);
//   }

//   createTicket(object) {
//     this.tickets.push({
//       id: uuid.v4(),
//       name: object.name,
//       description: object.description,
//       status: false,
//       created: new Date(),
//     });
//   }

//   changeStatus(object) {
//     const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
//     if (ticketIndex !== -1) {
//       this.tickets[ticketIndex].status = object.status;
//       return 'статус изменен';
//     }
//     return 'тикет не найден';
//   }

//   updateTicket(object) {
//     const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
//     if (ticketIndex !== -1) {
//       this.tickets[ticketIndex].name = object.name;
//       this.tickets[ticketIndex].description = object.description;
//       return 'тикет изменен';
//     }
//     return 'тикет не найден';
//   }

//   deleteTicket(object) {
//     const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
//     if (ticketIndex !== -1) {
//       this.tickets.splice(ticketIndex, 1);
//       return 'удалено';
//     }
//     return 'тикет не найден';
//   }
// }
