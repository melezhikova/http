export function getTime(time) {
  const date = time.substring(8, 10);
  const month = time.substring(5, 7);
  const year = time.substring(0, 4);
  const hours = time.substring(11, 13);
  const minutes = time.substring(14, 16);

  return `${date}.${month}.${year} ${hours}:${minutes}`;
}

export function modalClose() {
  const modalToClose = document.querySelector('.active');
  if (modalToClose) {
    modalToClose.classList.remove('active');
  }
}
