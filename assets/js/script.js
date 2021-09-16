
/**
 * Deals a random card on to the table.
 * This card will be assigned to the player or the house during playRound()
 */
function dealCard() {

let suitArray = ['hearts', 'clubs', 'spades', 'diamonds'];

// numbers as string to make file path lateral work
let valueArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
let randomSuit = Math.floor(Math.random() * 4);
let randomValue = Math.floor(Math.random() * 13);
let suit = suitArray[randomSuit];
let value = valueArray[randomValue];

// here I would use document.createElement('img/div') and place the card down within it 
// file path for src would look something like this src="assets/images/suit/value"

}

/**
 * Checks for blackjack on initial hand dealt
 */
function checkBlackjack (hand) {

}

/**
 * Checks the hand value and offers to convert the value of ace from high to low.
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


