const cardsBack = document.querySelectorAll('.cardsBack');
const cardsFrant = document.querySelectorAll('.cardsFrant');
const crads = document.querySelectorAll('.crads');
const icons = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

function startGame(){
	giveArrayListener(crads, remember);
	giveCardsBackStyle(cardsBack, crads, icons);

	let t = setInterval(randomMatching, 50);
	let i = 0;
	function randomMatching(){ 		
		if(i === crads.length){
			clearInterval(t)
			console.log("havasar")
		}
		else{
			cardsFrant[i].style.backgroundImage = `repeating-linear-gradient(-45deg,blue,black 12%)`;
			i++;
		}
	}
	acountTime();
}

let firstCard, secondCard;
let quantity = false;
let third = 0;
let tryQuantity = 0;
let forQuantity = document.querySelector('#forQuantity');

function giveArrayListener(array, func) {
	for (let i = 0; i < array.length; i++) {
		array[i].addEventListener('click', func)
	}
};

function giveCardsBackStyle(backArray, array, imagesArray) {
	for (let i = 0; i < crads.length; i++) {
		let randomNumber = Math.round(Math.random() * 8);
		backArray[i].style.backgroundImage = `url('images/${imagesArray[i]}.png')`;
		array[i].style.order = randomNumber;
	}
}

function remember(){
	if(this === firstCard) return;
	if(third % 2) return;
	this.classList.add("toggle");
	tryQuantity++;
	forQuantity.innerHTML = tryQuantity;
	if (!quantity) {
		quantity = true;
		firstCard = this;
		console.log(firstCard.dataset.id);
	}
	else{
		quantity = false;
		secondCard = this;
		console.log(secondCard.dataset.id);
		(firstCard.dataset.id === secondCard.dataset.id) ? diasbleCards() : undisableCards();
		function diasbleCards() {
			firstCard.removeEventListener('click', remember);
			secondCard.removeEventListener('click', remember);
		};
		function undisableCards(){
			third++;
			setTimeout(() => {
				firstCard.classList.remove("toggle");
				secondCard.classList.remove("toggle");
				third++;
			}, 1000);
		}
	}
	const allToggleClass = document.querySelectorAll('.toggle');
	let forClear = setTimeout(acountTime, 1000)
	if(allToggleClass.length == 16){
		resultAlert(forTime.innerHTML);
		clearTimeout(forClear)
	}
}

function resultAlert(result){
	let goodOrBad = '';
	if (result < 40) goodOrBad = 'very good';
	else if (result < 60) goodOrBad = 'good';
	else if (result >= 60) goodOrBad = 'bad';
	alert(`You has just win this game in ${result} seconds,and it's ${goodOrBad}`);
}

const forTime = document.querySelector('#forTime');
function acountTime(){
	forTime.innerHTML++;
	if(forTime.innerHTML < 10){
		forTime.innerHTML = '00' + forTime.innerHTML;
	}
	else if(forTime.innerHTML < 100){
		forTime.innerHTML = '0' + forTime.innerHTML;
	}
	return forTime.innerHTML;
}

