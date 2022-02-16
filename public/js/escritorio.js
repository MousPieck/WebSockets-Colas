//REFERENCIAS HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

divAlerta.style.display = "none";
const socket = io();

socket.on("connect", () => {
	// console.log('Conectado');

	btnAtender.disabled = false;
});

socket.on("tickets-pendientes", (tickets) => {
	lblPendientes.textContent = tickets;
	if (tickets === 0) {
		btnAtender.disabled = true;
		return;
	}
	btnAtender.disabled = false;
});

socket.on("disconnect", () => {
	btnAtender.disabled = true;
});

btnAtender.addEventListener("click", () => {
	socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
		if (!ok) {
			lblTicket.textContent = "Nadie";

			divAlerta.textContent = msg;
			return (divAlerta.style.display = "");
		}
		lblTicket.textContent = "Ticket " + ticket.numero;
	});
	// socket.emit("siguiente-ticket", null, (ticket) => {
	// 	lblNuevoTicket.textContent = ticket;
	// });
});
