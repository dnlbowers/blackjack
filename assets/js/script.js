// compile the ace high to low function
//compare hands and make results appear in a modal  to : -
//   display result
//   restart the game
//   enter the menu
//add functionality to the menu
//write the game rules
//write win streak function with ability to reset
// refactor code to make sure every segment is in a function doing as little as possible and call that in the global scope to run the game
// !! above the MVP plan !!
// add sound
//add color choice for the game table
const hitBtnRef = document.querySelector('#hit-btn');
const standBtnRef = document.querySelector('#stand-btn');
const modalSurroundRef = document.querySelector('.modal-surround');
const resultModalRef = document.querySelector('#result-modal');

document.addEventListener("DOMContentLoaded", function () {
    hitBtnRef.addEventListener("click", function () {
        let playerHandValue = checkHandValue(playerHand); 
    
        if (playerHandValue > 21) {
            //ideally this would end the game completely prior to the button push
            return computerTurn();
        } else {
            playerHand.push(dealCard("player"));
            checkHandValue(playerHand);
        }
    });

    standBtnRef.addEventListener("click", computerTurn);
    let playerHand = [];
    let dealerHand = [];

    firstTwoCards();

    function firstTwoCards() {
        for (i = 0; i < 2; i++) {
            playerHand.push(dealCard("player"));
            dealerHand.push(dealCard("dealer"));
        }

        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);
        console.log(playerTotal);
        console.log(dealerTotal);

        if (playerTotal === 0 || dealerTotal === 0) {
            //Need a pop up box asking to play again and declaring score.
            hitBtnRef.disabled = true;
            let result = compareHands(playerTotal, dealerTotal);
            console.log(result);
        }
    }

    /**
     * Deals a random card on to the table and assigns it a value.
     * places and image of the card in DOM according to the parameter passed.
     */
    function dealCard(dealtFor) {
        let suitArray = ["hearts", "clubs", "spades", "diamonds"];
        let valueArray = [
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            "jack",
            "queen",
            "king",
            "ace",
        ];

        let randomSuit = Math.floor(Math.random() * 4);
        let randomValue = Math.floor(Math.random() * 13);

        let suit = suitArray[randomSuit];
        let value = valueArray[randomValue];

        // Create <img> with attributes to visually represent the value of the card in the DOM
        let card = document.createElement("img");
        card.src = `assets/images/${suit}/${value}.svg`;
        card.className = "card";
        card.alt = `${value} of ${suit}`;

        //Assigns the card image to the appropriate hand according to the parameter passed.
        if (dealtFor === "player") {
            document.getElementById("player-card-container").appendChild(card);
        } else if (dealtFor === "dealer") {
            document.getElementById("dealer-card-container").appendChild(card);
        }

        // Returns picture cards as numerical values
        if (value === "jack" || value === "queen" || value === "king") {
            value = 10;

            return value;
        } else if (value === "ace") {
            value = 11;

            return value;
        } else {
            return value;
        }
    }

    /**
     * Checks the hand value for blackjack and then loops through array to total score
     * if Ace found user will be prompted to decide if they want ace to = 1 or 11. 11(default)
     */
    function checkHandValue(hand) {
        console.log(hand);
        console.log('hand value check')
        let handValue = 0;
        for (card of hand) {
            handValue += card;
        }

        if (handValue === 21 && hand.length === 2) {
            console.log('blackjack check');
            return 0;
        } else if (handValue > 21 && hand.includes(11)) {
            for (i = 0; i <= hand.length; i++) {
                if (hand[i] === 11) {
                    hand.splice(i, 1);
                    hand.push(1);
                }
            }
            console.log('ace low')
            return hand;    
        } else if (hand === playerHand && handValue >= 22) {
            console.log('hand over 21 ski[ CPU turn')
            hitBtnRef.disabled = true;
            // here I need to copy the code for when a player is bust from compare hands skipping the CPU turn
        } else {
            return handValue;
        }
    }
    /**
     * Disables hit button and checks several conditions before deciding how the dealers should play it's hand and
     * and calling the compareHands function.
     */
    function computerTurn() {
        hitBtnRef.disabled = true;
        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);
        console.log(playerTotal);
        console.log(dealerTotal);
        if (playerTotal === 0 || playerTotal > 21) {
            let result = compareHands(playerTotal, dealerTotal);
            console.log(result);
        } else if (dealerTotal >= 17) {
            let result = compareHands(playerTotal, dealerTotal);
            console.log(result);
        } else {
            while (dealerTotal !== 0 && dealerTotal < 17) {
                dealerHand.push(dealCard("dealer"));
                let dealerTotal = checkHandValue(dealerHand);
                if (dealerTotal > 17) {
                    let result = compareHands(playerTotal, dealerTotal);
                    console.log(result);
                    break;
                }
            }
        }
    }

    /**
     * Flips the houses hidden card face up once the players turn is over
     */
    function houseReveal() {}

    /**
     * Compares final hands once both the house and the player have drawn all their desired cards
     */
    function compareHands(playerHandValue, houseHandValue) {
        //add a pop up box with result and ask to play again.
        if (playerHandValue === houseHandValue) {
            return "Draw";
        } else if (houseHandValue === 0) {
            return "House has black jack! You lose";
        } else if (playerHandValue === 0) {
            return "You have Blackjack! You Win!";
        } else if (playerHandValue > 21) {
            return "Your bust! 21 is the limit";
        } else if (houseHandValue > 21) {
            return "House is bust! You win!";
        } else if (playerHandValue > houseHandValue) {
            return "Congratulations! You beat the house!";
        } else {
            return "The House wins! Better luck next time!";
        }
    }

    function breakTurn() {
        return (roundOver = true);
    }
});
