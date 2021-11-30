import { getTime, modalClose } from './others';
import {
  getAllTickets, ticketByIdGET, formPOST, ticketIdPOST,
} from './requests';

export default class TicketFull {
  constructor(ticket) {
    this.id = ticket.id;
    this.name = ticket.name;
    this.description = ticket.description;
    this.status = ticket.status;
    this.created = ticket.created;

    this.element = null;
  }

  addTicketToDOM() {
    const box = document.querySelector('.tickets-container');
    const ticketDiv = document.createElement('div');
    ticketDiv.classList.add('ticketDiv');
    ticketDiv.dataset.idTicket = this.id;

    const ticketStatus = document.createElement('div');
    ticketStatus.classList.add('ticketStatus');
    if (this.status === false) {
      ticketStatus.classList.add('falseStatus');
    } else {
      ticketStatus.classList.add('trueStatus');
    }

    const ticketName = document.createElement('div');
    ticketName.classList.add('ticketName');
    ticketName.textContent = this.name;

    const btnBox = document.createElement('div');
    btnBox.classList.add('btnBox');
    const ticketDate = document.createElement('div');
    ticketDate.classList.add('ticketDate');
    ticketDate.textContent = getTime(this.created);
    const ticketEdit = document.createElement('div');
    ticketEdit.classList.add('ticketEdit');
    const ticketDel = document.createElement('div');
    ticketDel.classList.add('ticketDel');
    btnBox.append(ticketDate);
    btnBox.append(ticketEdit);
    btnBox.append(ticketDel);

    ticketDiv.append(ticketStatus);
    ticketDiv.append(ticketName);
    ticketDiv.append(btnBox);
    box.append(ticketDiv);

    ticketStatus.addEventListener('click', this.changeStatus);
    ticketName.addEventListener('click', this.checkForDetails);
    ticketEdit.addEventListener('click', this.editModal);
    ticketDel.addEventListener('click', this.deleteTicket);
  }

  changeStatus(event) {
    this.element = event.currentTarget;
    this.element.classList.toggle('falseStatus');
    this.element.classList.toggle('trueStatus');
    const id = this.element.closest('.ticketDiv').dataset.idTicket;
    const options = { id };
    function callback() {
      TicketFull.redraw();
    }
    ticketIdPOST(options, 'changeStatus', callback);
  }

  checkForDetails(event) {
    this.element = event.currentTarget;
    const ticketDiv = this.element.closest('.ticketDiv');
    const details = ticketDiv.querySelector('.details');
    if (details) {
      details.remove();
    } else {
      const callback = (data) => {
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        detailsDiv.textContent = data.description;
        ticketDiv.append(detailsDiv);
      };
      ticketByIdGET(event, callback);
    }
  }

  editModal(event) {
    this.element = event.currentTarget;
    const modal = document.querySelector('.editTicket');
    modal.classList.add('active');
    const description = modal.querySelector('.description');
    const fullDescription = modal.querySelector('.fullDescription');

    function callback(data) {
      description.value = data.name;
      fullDescription.value = data.description;
    }
    ticketByIdGET(event, callback);

    const cancel = modal.querySelector('.cancel');
    cancel.addEventListener('click', modalClose);
    const form = modal.querySelector('.editForm');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const options = {
        name: description.value,
        description: fullDescription.value,
      };
      function callback2() {
        modalClose();
        TicketFull.redraw();
      }
      formPOST(options, 'updateTicket', callback2);
    });
  }

  deleteTicket(event) {
    this.element = event.currentTarget;
    const id = this.element.closest('.ticketDiv').dataset.idTicket;
    const modal = document.querySelector('.deleteTicket');
    modal.classList.add('active');
    const cancel = modal.querySelector('.cancel');
    cancel.addEventListener('click', modalClose);
    const ok = modal.querySelector('.ok');
    ok.addEventListener('click', () => {
      const options = { id };
      function callback() {
        modalClose();
        TicketFull.redraw();
      }
      ticketIdPOST(options, 'deleteTicket', callback);
    });
  }

  static redraw() {
    const callback = (data) => {
      const box = document.querySelector('.tickets-container');
      box.innerHTML = '';
      data.forEach((item) => {
        const ticket = new TicketFull(item);
        ticket.addTicketToDOM();
      });
    };
    getAllTickets(callback);
  }
}
