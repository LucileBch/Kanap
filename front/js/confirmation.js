const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

const orderIdSpan = document.querySelector("#orderId")

orderIdSpan.textContent = orderId