export function getAllTickets(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:7070?method=allTickets');

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = Array.from(JSON.parse(xhr.responseText));
        console.log(data);
        callback(data);
      } catch (e) {
        console.error(e);
      }
    }
  });

  xhr.send();
}

export function ticketByIdGET(event, callback) {
  const ticketDiv = event.currentTarget.closest('.ticketDiv');
  const ticketId = ticketDiv.dataset.idTicket;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://localhost:7070/?method=ticketById&id=${ticketId}`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
}

export function formPOST(options, method, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:7070');
  const request = JSON.stringify({ method, object: options });
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText;
        console.log(data);
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send(request);
}

export function ticketIdPOST(options, method, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:7070');
  const request = JSON.stringify({ method, object: options });
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = xhr.responseText;
        console.log(data);
        callback();
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send(request);
}
