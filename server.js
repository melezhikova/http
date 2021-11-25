const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const uuid = require('uuid');
const app = new Koa();
const cors = require('koa2-cors');

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  text: true,
  json: true,
}));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

class TicketsController {
  constructor() {
    this.tickets = [];
  }

  getTickets() {
    return this.tickets;
  }

  getTicketById(object) {
    return this.tickets.find((element) => element.id === object.id);
  }

  createTicket(object) {
    this.tickets.push({
      id: uuid.v4(),
      name: object.name,
      description: object.description,
      status: false,
      created: new Date(),
    });
  }

  changeStatus(object) {
    const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
    if (ticketIndex !== -1) {
      this.tickets[ticketIndex].status = object.status;
      return 'статус изменен';
    }
    return 'тикет не найден';
  }

  updateTicket(object) {
    const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
    if (ticketIndex !== -1) {
      this.tickets[ticketIndex].name = object.name;
      this.tickets[ticketIndex].description = object.description;
      return 'тикет изменен';
    }
    return 'тикет не найден';
  }

  deleteTicket(object) {
    const ticketIndex = this.tickets.findIndex((el) => el.id === object.id);
    if (ticketIndex !== -1) {
      this.tickets.splice(ticketIndex, 1);
      return 'удалено';
    }
    return 'тикет не найден';
  }
}

const ticketsController = new TicketsController();
ticketsController.tickets = [
  {
    id: 1234567,
    name: 'First',
    description: 'Smth1',
    status: false,
    created: new Date(),
  },
  {
    id: 12345678,
    name: 'Second',
    description: 'Smth2',
    status: false,
    created: new Date(),
  },
  {
    id: 123456789,
    name: 'Firth',
    description: 'Smth3',
    status: false,
    created: new Date(),
  },
  {
    id: 1234567899,
    name: 'Fourth',
    description: 'Smth4',
    status: false,
    created: new Date(),
  },
];

app.use(async (ctx) => {
  let method;

  // обратите внимание, что метод (это наш параметр а не HTTP метод) в зависимости от http
  // метода передается по разному либо лежит в ctx.request.query либо в ctx.request.body
  if (ctx.request.method === 'GET') ({ method } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method } = ctx.request.body);

  // В итоге, нам нужно правильно установить ctx.response.status и ctx.response.body
  // ctx.response = {status: string, body: string}

  ctx.response.status = 200;
  switch (method) {
    case 'allTickets': ctx.response.body = ticketsController.getTickets();
      break;
    case 'ticketById': ctx.response.body = ticketsController.getTicketById(ctx.request.query);
      break;
    case 'createTicket': ctx.response.body = ticketsController.createTicket(ctx.request.body);
      break;
    case 'changeStatus': ctx.response.body = ticketsController.changeStatus(ctx.request.body);
      break;
    case 'updateTicket': ctx.response.body = ticketsController.updateTicket(ctx.request.body);
      break;
    case 'deleteTicket': ctx.response.body = ticketsController.deleteTicket(ctx.request.body);
      break;
    default:
      ctx.response.status = 400;
      ctx.response.body = `Unknown method '${method}' in request parameters`;
  }
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, (error) => {
  if (error) {
    console.log('Error occured:', error);
    return;
  }
  console.log(`Server is listening on ${port} port`);
});


