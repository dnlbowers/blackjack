const dealerContainer = document.getElementById('dealer-card-container');
const playerContainer = document.getElementById('player-card-container');


/**
 * Deals a random card on to the table.
 * This card will be assigned to the player or the house during playRound()
 */
function dealCard() {

let suitArray = ['hearts', 'clubs', 'spades', 'diamonds'];

// numbers as string to make file path lateral work
let valueArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
let randomSuit = Math.floor(Math.random() * 4);
let randomValue = Math.floor(Math.random() * 13);
let suit = suitArray[randomSuit];
let value = valueArray[randomValue];

// here I would use document.createElement('img/div') and place the card down within it 
// file path for src would look something like this src="assets/images/suit/value"
// value to be converted into int using if statement or maybe a switch (case 'king' value = 10) I think I can leave off default?

//then this function will ditch the suit and return only the card value which will be added to an array of player/house hand
return value; 
}

/**
 * Checks the hand value for blackjack and then loops through array to total score
 * if Ace found user will be prompted to decide if they want ace to = 1 or 11. 11(default)
 */
function checkHandValue(hand){

}

/**
 * Flips the houses hidden card face up once the players turn is over
 */
function houseReveal(){

}

/**
 * Compares final hands once both the house and the player have drawn all their desired cards
 */
function compareHands(playerHand, houseHand) {

}


