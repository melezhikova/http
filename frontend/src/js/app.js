// TODO: write your code here
import { formPOST } from './requests';
import { modalClose } from './others';
import TicketFull from './ticketFull';

TicketFull.redraw();

const addButton = document.querySelector('.addTicketButton');
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const addModal = document.querySelector('.addTicket');
  addModal.classList.add('active');

  const modalForm = document.querySelector('.addTicketForm');
  const description = modalForm.querySelector('.description');
  const fullDescription = modalForm.querySelector('.fullDescription');
  const cancelBtn = modalForm.querySelector('.cancel');
  cancelBtn.addEventListener('click', modalClose);

  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const options = {
      name: description.value,
      description: fullDescription.value,
    };
    function callback() {
      modalClose();
      TicketFull.redraw();
    }
    formPOST(options, 'createTicket', callback);
  });
});
