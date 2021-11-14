const http = require('http');
const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const uuid = require('uuid');

const app = new Koa();

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
    }
    ctx.response.status = 204; // No content
  }
});

const tickets = [
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
  const { method } = ctx.request.querystring;

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
    case 'ticketById':
      ctx.response.body = tickets.find((el) => el.id === id);
      return;
    case 'createTicket':
      const parse = JSON.parse(ctx.request.body);
      tickets.push({
        id: +new Date() + Math.random(),
        name: parse.name,
        description: parse.description,
        status: false,
        created: new Date(),
      });
      ctx.response.status = 200;
      return;
    case 'deleteTicketById':
      const ticketIndex = tickets.findIndex((el) => el.id === id);
      if (ticketIndex !== -1) {
        tickets.splice(ticketIndex, 1);
        ctx.response.body = 'удалено';
        ctx.response.status = 200;
        return;
      }
      ctx.response.status = 404;
      return;


    default:
      ctx.response.status = 404;
  }
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
