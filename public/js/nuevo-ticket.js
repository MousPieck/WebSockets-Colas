//referencias html

const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
	// console.log('Conectado');

	btnCrear.disabled = false;
});

socket.on("ultimo-ticket", (ultimo) => {
	lblNuevoTicket.textContent = "Ticket " + ultimo;
});

socket.on("disconnect", () => {
	btnCrear.disabled = true;
});

btnCrear.addEventListener("click", () => {
	socket.emit("siguiente-ticket", null, (ticket) => {
		lblNuevoTicket.textContent = ticket;
	});
});
