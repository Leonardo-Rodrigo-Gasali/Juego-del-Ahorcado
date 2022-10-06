document.addEventListener('DOMContentLoaded', () => {
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	// Variables
	var i,
		alphabet, 
		newAlphabet,
		letters, 
		letter,
		themeId,
		themeText, 
		theWord;

	var space = "_",
		hiddenWord = "",
		count = 0,
		fail = 0,
		alphabetArray = [], 
		hiddenWordSplit = [],
		theWordSplit = [];

        var themes = document.querySelectorAll(".theme"),
		wordDisplayed = document.getElementById("word_display"),
		keybordDisplay = document.getElementById("keybord"),
		resultDisplay = document.getElementById("result_display"),
		themeButton = document.querySelector(".elegir_tema"),
		themeDisplay = document.getElementById("theme_display"),
		newGameButton = document.querySelector(".new_game");

	var guessWord = 
		[{ 	theme: "Ciudad",
			word: ["Buenos Aires", "New York", "Moscu", "Berlin", "Paris", "Londres"]
		},{	theme: "Fruta",
			word: ["Manzana", "Banana", "Naranja", "Durazno", "Pera"]
		},{	theme: "Comida",
			word: ["Pizza", "Milanesa", "Arroz", "Papas fritas", "Pollo"]
		}];

	window.onload = function(){
		themes.forEach(theme => theme.addEventListener("click", startGame));
		newGameButton.style.display = "none";
		keybordDisplay.style.display = "none";
		themeDisplay.style.display = "none";
	};

	// Elegir tema y palabra aleatoria
	function startGame(){
		newGameButton.style.display = "inline";
		themeDisplay.style.display = "inline";
		themeId = this.getAttribute("value");
		themeText = this.innerHTML;
		themeDisplay.innerHTML += "Tema: "+ themeText;
		shuffle(guessWord[themeId].word);
		theWord = guessWord[themeId].word[0].toUpperCase();
		displayWord();
	};

	// Mostrar espacio segun palabra
	function displayWord() {
		themeButton.style.display = "none";
		keybordDisplay.style.display = "block";
		theWordSplit = theWord.split("");
		for (i = 1; i <= theWord.length; i++){
			hiddenWord = hiddenWord + space;
		}
		hiddenWordSplit = hiddenWord.split("");
		for (i = 0; i < theWordSplit.length; i++) {
			if (theWordSplit[i] === " ") {
				theWordSplit[i] = "&nbsp;";
				hiddenWordSplit[i] = "&nbsp;";
				count++;
			}
		}
		wordDisplayed.innerHTML = hiddenWordSplit.join("&#160;");
	}

	// Muestra teclado
	function keyboard(){
		alphabet = "qwertyuiopasdfghjklñzxcvbnm#";
		newAlphabet = alphabet.toUpperCase();
		alphabetArray = newAlphabet.split('');
		for (i = 0; i < alphabetArray.length-1; i++) {
			if (alphabetArray[i] == " ") {
				alphabetArray[i] = "&nbsp;";
			}
			keybordDisplay.innerHTML += '<button type="button" class="letter">' 
				+ alphabetArray[i] + "</button>";
			if (i == 9 || i == 19) {
				keybordDisplay.innerHTML += "<br>";
			}	
		}
		letters = document.querySelectorAll(".letter");
		letters.forEach(letter => letter.addEventListener("click", pressedKey));
	}
	keyboard();

	// Letras elegidas
	function pressedKey(){
		letter = this.innerHTML;
		this.setAttribute("disabled", "");
		checkMatch();
	}

	// Revisar letras
	function checkMatch() {
		if (theWordSplit.indexOf(letter) == -1) {
			fail++;
			drawHangman();
			if (fail == 6) {
				resultDisplay.innerHTML = "<span style='color: red;'>> Perdiste!</span>";
				endGame();
			}
		}
		for (i = 0; i < theWord.length; i++) {
			if (theWordSplit[i] === letter) {
				count++;
				hiddenWordSplit[i] = letter; 
			} 
			wordDisplayed.innerHTML = hiddenWordSplit.join("&#160;");
		}
		if (count === theWord.length) {
			resultDisplay.innerHTML = "<span style='color: green;'>> Ganaste!</span>";
			endGame();
		}
	}
	
	// Dibujado de Ahorcado al fallar la palabra
	function drawHangman(){
		switch (fail) {
			case 0:
				document.querySelector(".muerto.cabeza").style.visibility = "hidden";
				document.querySelector(".muerto.cuerpo").style.visibility = "hidden";
				document.querySelector(".muerto.brazo-der").style.visibility = "hidden";
				document.querySelector(".muerto.brazo-izq").style.visibility = "hidden";
				document.querySelector(".muerto.pierna-izq").style.visibility = "hidden";
				document.querySelector(".muerto.pierna-der").style.visibility = "hidden";
				break;
			case 1: document.querySelector(".muerto.cabeza").style.visibility = "visible";
				break;
			case 2: document.querySelector(".muerto.cuerpo").style.visibility = "visible";
				break;
			case 3: document.querySelector(".muerto.brazo-der").style.visibility = "visible";
				break;
			case 4: document.querySelector(".muerto.brazo-izq").style.visibility = "visible";
				break;
			case 5: document.querySelector(".muerto.pierna-izq").style.visibility = "visible";
				break;
			case 6: document.querySelector(".muerto.pierna-der").style.visibility = "visible";
				break;
			default:
				break;
		}
	}
	drawHangman();

	// Finaliza Nuevo Juego
	function endGame(){
		newGameButton.style.display = "inline";
		letters.forEach(letter => letter.removeEventListener("click", pressedKey));
	}
	
	// Comienza Nuevo Juego
	newGameButton.addEventListener("click", newGame);
	function newGame(){
		fail = 0;
		count = 0;
		theWordSplit = [];
		hiddenWordSplit = [];
		wordDisplayed.innerHTML = "";
		resultDisplay.innerHTML = "";
		themeDisplay.innerHTML = "";
		space = "_";
		hiddenWord = "";
		themeButton.style.display = "block";
		keybordDisplay.style.display = "none";
		newGameButton.style.display = "none";
		letters.forEach(function(letter){letter.removeAttribute("disabled", "")});
		letters.forEach(letter => letter.addEventListener("click", pressedKey));
		drawHangman();
	}
});