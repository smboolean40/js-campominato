// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
// I numeri non possono essere duplicati.
// In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
// La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
// Al termine della partita il software deve comunicare il punteggio.
// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50

/**
 * FUNZIONI
 */

/**
 * dato il numero di celle disegna il campo da gioco
 */
function creaCampo(nCelle) {
	for (var i = 1; i <= nCelle; i++) {
		// console.log(i);
		//document.getElementById("campo").innerHTML += "<div class=\"quadrato\">" + i + "</div>";
		document.getElementById("campo").innerHTML += `<div class="quadrato">${i}</div>`; //template literal
	}
}
/**
 * dato l'array e l'elemento da cercare, restitusce true se l'elemento è presente altrimenti false
 */
function inArray(arr, el) {
	var count = 0;

	while ( count < arr.length ) {
		if ( arr[count] === el ) {
			return true;
		}
		
		count++;
	}

	return false;
}
/**
 * dato un range di numeri, restituisce un numero random
 */
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * PROGRAMMA PRINCIPALE
 */

do {
	var livello = parseInt(prompt("Inserisci il livello: 0,1,2"));
} while(livello != 0 && livello != 1 && livello != 2);
// 0: false && true && true = false
// 3: true && true && true = true

var numeroCelle; // 100, 80, 50

// if (livello == 0) {
// 	numeroCelle = 100;
// } else if (livello == 1) {
// 	numeroCelle = 80;
// } else if (livello == 2) {
// 	numeroCelle = 50;
// }

switch(livello) {
	case 0:
		numeroCelle = 100;
		break;
	case 1:
		numeroCelle = 80;
		break;
	case 2:
		numeroCelle = 50;
		break;
}

// variabili di base
var nBombe = 16;
var possibilita = numeroCelle - nBombe;

// Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
// I numeri non possono essere duplicati.
var bombe = [];
// ciclo per 16 volte
while( bombe.length < nBombe ) {
	// inserisco il numero nell'array delle bombe
	var numero = getRndInteger(1, numeroCelle);
	// se il numero NON è gia presente nell'array delle bombe lo inserisco
	if ( inArray(bombe, numero) == false ) {
		bombe.push(numero);
	}
}
console.log(bombe);

// 2 disegno il campo da gioco
creaCampo(numeroCelle);
// 3 al click sulle cele del campo
// In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
// La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
// Al termine della partita il software deve comunicare il punteggio.
var numeriValidi = [];

document.getElementById("campo").addEventListener("click",
	function(event) {
		// event.target l'elemento del dom su cui ho cliccato
		// mi salvo il numero della casella
		var numeroCliccato = parseInt(event.target.innerHTML);
		// se il numero cliccato è presente nell'array delle bombe, hai perso! il punteggio 
		// altrimenti se hai già cliccato su questa cella, alert (hai già cliccato su questa cella!)
		// altrimeni è un numero consentito
		if ( inArray(bombe, numeroCliccato) == true ) {
			alert("Hai perso! mi disp!! il tuo punteggio: " + numeriValidi.length);
			location.reload();
		} else if ( inArray(numeriValidi, numeroCliccato) == true ) {
			alert("hai gia cliccato su questo numero! :p");
		} else {
			numeriValidi.push(numeroCliccato);
			event.target.classList.add("cliccato");

			if ( numeriValidi.length == possibilita ) {
				alert("Bravissimo!! hai finito il gioco!!");
				location.reload();
			}
		}
	}
);