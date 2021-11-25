// TODO: write your code here
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    try {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
});
