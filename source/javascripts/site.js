
// Variables of the game:
// deck : the ramaining deck
// selected : the cards that is currently selected (up to three).
//correct: number of correct sets identified
//incorrect:number of incorrect sets identified
var deck = [];
var selected = [];
var correct = 0;
var incorrect = 0;

// For game home page display
const splash = document.querySelector(".splash");
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add("display-none");
    }, 3500);
})

// Game starter
function startGame() {
	initialDeck();
	updateScoreBoard(0,0);
    dealCards(); 
	timeStamp();
}

// Crete the deck. 81 cards in the deck, shuffled.
function initialDeck() {
	deck = [];
	selected = []; 
	for (var i = 0; i < 81; i++) {
        deck.push(i);
    }
    shuffle(deck);
}

// Helper function to shuffle the deck.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Deal 12 cards to the table.
function dealCards() {
    var grid = document.getElementsByClassName("div-card-on-table");
    for (var i =0; i < 12; i++) {
    	var card_num = deck.pop();
    	var image_tag = '<img class="card-on-table" id="' + card_num + '" src="images/' + card_num + '.png" alt="Set-Card"/>';
    	grid[i].innerHTML = image_tag;
    }
}

// Updates the scoreboard to display the number of correct and incorrect sets selected
function updateScoreBoard() {

	var score_board = "<p>Score Board</p><table><th><tr><th>  Correct Sets  </th><th>  Incorrect Sets  </th></tr> <tr><td>" + correct + "</td><td>" + incorrect+ "</td></td></table>";
	var board = document.getElementsByClassName("div-scoreboard");
	board[0].innerHTML = score_board;
	

}

//Update time stamp at the begining of the game and everytine player score
function timeStamp(){
	var d=new Date();
	var t= "<p>Time Stamp: </p>"+d.toLocaleTimeString();
	var tDisplay = document.getElementsByClassName("div-timeDisplay");
	tDisplay[0].innerHTML=t;
}

// Event listener for clicking cards on table.
const on_table = document.querySelectorAll('.div-card-on-table');
on_table.forEach(card => card.addEventListener('click', selectCard));

// Identify which card is clicked and add that card to select[] array.
function selectCard() {
	// Deselect card
	if (selected.length < 3) {
		this.classList.add('selected');
		var ind = selected.indexOf(this);
		// check if the card was selected again to deselect
		if(ind>-1){
			selected[ind].classList.remove('selected');
			selected.splice(ind,1);
		}else{
        	selected.push(this); 
        }
        if (selected.length == 3) {
        	if (checkSelection() == true) {
            	replaceCard();          
            }
            else {
            	for (var i = 0; i < selected.length; i++) {
            		selected[i].classList.remove('selected');
            	}
            	selected = [];
            }
        }
        
    }
  
}

// Helper function to make sure no duplicate element in selected[].
function unique(value, index, self) {
  return self.indexOf(value) === index;
}

// Call when selected.length==3. CHeck whether the selected[] is a set.
function checkSelection() {
	result = true;
	select = [];
	for (var i = 0; i<selected.length; i++) {
		select[i] = parseInt(selected[i].childNodes[0].id);
	}

	// check color
	for (var i = 0; i < select.length; i++) {
		select[i] = Math.floor(select[i] / 27); 
	}
	if (select.filter(unique).length == 2) {
		result = false;
	}

	// check number
	select = [];
	for (var i = 0; i<selected.length; i++) {
		select[i] = parseInt(selected[i].childNodes[0].id);
	}
	for (var i = 0; i < select.length; i++) {
		select[i] = select[i]%3; 
	}
	if (select.filter(unique).length == 2) {
		result = false;
	}

	// check shape
	select = [];
	for (var i = 0; i<selected.length; i++) {
		select[i] = parseInt(selected[i].childNodes[0].id);
	}
	for (var i = 0; i < select.length; i++) {
		select[i] = Math.floor((select[i] % 9) / 3); 
	}
	if (select.filter(unique).length == 2) {
		result = false;
	}

	//check shade
	select = [];
	for (var i = 0; i<selected.length; i++) {
		select[i] = parseInt(selected[i].childNodes[0].id);
	}
	for (var i = 0; i < select.length; i++) {
		select[i] = Math.floor((select[i] % 27) / 9);
	}
	if (select.filter(unique).length == 2) {
		result = false;
	}


    //if a correct set is idenfied, it is incremented, otherwise incorrect is incremented.
	if (result) {
		correct++;
		timeStamp();
	} else {
		incorrect++;
	}

	//scoreboard changes to reflect new values
	updateScoreBoard();

	return result;

}

// Called when selected[] is a set, move the selected 3 card out of the table and deal 3 new cards.
function replaceCard() {
	if (deck.length > 0) {
		for (var i =0; i < selected.length; i++) {
 			var card_num = deck.pop();
 			selected[i].childNodes[0].src = "images/" + card_num + ".png"
 			selected[i].childNodes[0].id = card_num;
 			selected[i].classList.remove('selected');
    	}
    	selected = [];
	}

}


