if (!window.localStorage.getItem('invoiceCount')) {
    window.localStorage.setItem('invoiceCount', parseInt('0'));
}
let invoiceCount = window.localStorage.getItem('invoiceCount');
window.localStorage.setItem('invoiceCount', parseInt(invoiceCount) + 1);
let invoiceDate = document.getElementById('invoiceDate');
let invoiceNumber = document.getElementById('invoiceNumber');
let invoicePrintTime = document.getElementById('invoicePrintTime');
let currentDate = new Date();

let customerName = document.querySelector("#customerNameInvoice").innerText;
let carInfo = document.querySelector("#carInfoInvoice").innerText

document.title = `${customerName} ${carInfo} ${String(currentDate.getMonth() + 1).padStart(2, '0')} / ${String(currentDate.getDate()).padStart(2, '0')} / ${currentDate.getFullYear()}`

invoiceNumber.textContent = `${parseInt(invoiceCount)}`;
invoiceDate.textContent = (`Date Printed: ${String(currentDate.getMonth() + 1).padStart(2, '0')} / ${String(currentDate.getDate()).padStart(2, '0')} / ${currentDate.getFullYear()}`);
invoicePrintTime.textContent = `Printed Time: ${currentDate.toLocaleString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}`;