
dealCard('player');
dealCard('dealer')

/**
 * Deals a random card on to the table and assigns it a value.
 * places and image of the card in DOM according to the parameter passed.
 */
function dealCard(dealtFor) {

let suitArray = ['hearts', 'clubs', 'spades', 'diamonds'];
let valueArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];

let randomSuit = Math.floor(Math.random() * 4);
let randomValue = Math.floor(Math.random() * 13);

let suit = suitArray[randomSuit];
let value = valueArray[randomValue];

// Create <img> with attributes to visually represent the value of the card in the DOM 
let card = document.createElement('img');
card.src = `assets/images/${suit}/${value}.svg`;
card.className = 'card';
card.alt = `${value} of ${suit}`;

//Assigns the card image to the appropriate hand according to the parameter passed.
if (dealtFor === 'player') {
    document.getElementById('player-card-container').appendChild(card);
} else if (dealtFor === 'dealer') {
    document.getElementById('dealer-card-container').appendChild(card)
}

// Returns picture cards as numerical values
if (value === 'jack' || value === 'queen' || value === 'king') {
    return value = 10;
   console.log(value)
} else if (value === 'ace') {
    return value = 11;
    console.log(value)
} else {
    return value;
    console.log(value) 
}

}

/**
 * Checks the hand value for blackjack and then loops through array to total score
 * if Ace found user will be prompted to decide if they want ace to = 1 or 11. 11(default)
 */
function checkHandValue(hand){
let handValue = 0;
for (card of hand) {
    handValue += card;
}
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


