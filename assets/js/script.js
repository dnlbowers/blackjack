//add functionality to the menu
//write the game rules
// refactor code to make sure every segment is in a function doing as little as possible and call that in the global scope to run the game
// !! above the MVP plan !!
// key board short cuts
// add sound
//add color choice for the game table
//add player choice for ace high or low

//Global constant references for elements in the DOM
const mainMenuRef = document.getElementById('main-menu');
const gameTableRef = document.getElementById('game-table');
const menuBtnRef = document.getElementById('menu-btn');
const playGameBtnRef = document.getElementById('play-game-btn');
const hitBtnRef = document.getElementById('hit-btn');
const standBtnRef = document.getElementById('stand-btn');
const modalSurroundRef = document.getElementById('modal-surround');
const redealBtnRef = document.getElementById('redeal-btn');
const dealerCardContainerRef = document.getElementById('dealer-card-container');
const playerCardContainerRef = document.getElementById('player-card-container');
const winTallyRef = document.getElementById('wins');
const loseTallyRef = document.getElementById('loses');
const drawTallyRef = document.getElementById('drawn');
const resetScoreRef = document.getElementById('reset-btn');

document.addEventListener('DOMContentLoaded', function () {
    
    //Menu button event listeners
    playGameBtnRef.addEventListener('click', function() {
        mainMenuRef.style.display = 'none';
        gameTableRef.style.display = 'block';
        menuBtnRef.style.display = 'inline';
    });

    menuBtnRef.addEventListener('click', function() {
        gameTableRef.style.display = 'none';
        mainMenuRef.style.display = 'block';
        menuBtnRef.style.display = 'none';
        playGameBtnRef.innerHTML = "RETURN TO GAME"
    })
    
    
    //Game table button event listeners
    
    hitBtnRef.addEventListener('click', function() {

        playerHand.push(dealCard('player'));
        checkHandValue(playerHand);
        
    });

    standBtnRef.addEventListener('click', computerTurn);
    
    redealBtnRef.addEventListener('click', function() {
        playerHand = [];
        dealerHand = [];
        dealerCardContainerRef.innerHTML = "";
        playerCardContainerRef.innerHTML = "";
        modalSurroundRef.style.display = 'none';
        firstTwoCards();
    });

    resetScoreRef.addEventListener('click', function() {
       winTallyRef.innerHTML = 0;
       loseTallyRef.innerHTML = 0;
       drawTallyRef.innerHTML = 0; 
    });

    let playerHand = [];
    let dealerHand = [];

    firstTwoCards();    

    function firstTwoCards() {
        for (i = 0; i < 2; i++) {
            playerHand.push(dealCard('player'));
            dealerHand.push(dealCard('dealer'));
        }

        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);

        checkBlackjack(dealerTotal, playerTotal)

    }

    function checkBlackjack(dealer, player){
        if (dealer === 0) {
            houseBlackjack();
        } else if (player === 0) {
            playerBlackjack();
        }
    }

    /**
     * Deals a random card on to the table and assigns it a value.
     * places and image of the card in DOM according to the parameter passed.
     */
    function dealCard(dealtFor) {
        let suitArray = ['hearts', 'clubs', 'spades', 'diamonds'];
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
            'jack',
            'queen',
            'king',
            'ace',
        ];

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
        if (dealtFor === "player") {
            document.getElementById('player-card-container').appendChild(card);
        } else if (dealtFor === 'dealer') {
            document.getElementById('dealer-card-container').appendChild(card);
        }

        // Returns picture cards as numerical values
        if (value === 'jack' || value === 'queen' || value === 'king') {
            value = 10;

            return value;
        } else if (value === 'ace') {
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
        //adds the total hand value together
        let handValue = 0;
        for (card of hand) {
            handValue += card;
        }
        //checks the initial two cards for blackjack
        if (handValue === 21 && hand.length === 2) {
            return 0;
        // converts ace to low (from 11 to 1)    
        } else if (handValue > 21 && hand.includes(11)) {
            for (i = 0; i <= hand.length; i++) {
                if (hand[i] === 11) {
                    hand.splice(i, 1);
                    hand.push(1);
                    console.log(handValue)
                }
            }
            return hand;    
        } else if (hand === playerHand && handValue >= 22) {
            playerBust(handValue);   
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

        if (dealerTotal >= 17) {
            
            let result = compareHands(playerTotal, dealerTotal);

        } else {
            while (dealerTotal < 17) {
                dealerHand.push(dealCard('dealer'));
                let dealerTotal = checkHandValue(dealerHand);
                if (dealerTotal >21){
                    houseBust(dealerTotal);
                    break;
                } else if (dealerTotal > 17) {
                    let result = compareHands(playerTotal, dealerTotal);
                    break;
                }
            }
        }
    }

    /**
     * Flips the houses hidden card face up once the players turn is over
     */
    function houseReveal() {
        
    }

    /**
     * Compares final hands once both the house and the player have drawn all their desired cards
     */
    function compareHands(playerHandValue, houseHandValue) {
        //add a pop up box with result and ask to play again.
        if (playerHandValue === houseHandValue) {
            draw(playerHandValue);
        } else if (playerHandValue > houseHandValue) {
            playerHandWins(playerHandValue, houseHandValue);
        } else {
            houseHandWins(playerHandValue, houseHandValue);
        }
    }

    //functions to display the results modals
    function houseBlackjack() {
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Lose!";
        document.getElementById('description').innerHTML = 'The house has Blackjack!';
        incrementLoses()
    }

    function playerBlackjack() {

        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = 'You Win!';
        document.getElementById('description').innerHTML = 'You have Blackjack!';
        incrementWins();

    }
    
    function playerBust(handValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You're Bust!";
        document.getElementById('description').innerHTML = `The limit is 21, your current score is ${handValue}.`;
        incrementLoses()

    }

    function draw(playerHandValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "Draw!";
        document.getElementById('description').innerHTML = `You and the house have equal hand values of ${playerHandValue}.`;
        incrementDraws()

    }

    function houseBust(houseHand) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Win!";
        document.getElementById('description').innerHTML = `The house went bust with a value of ${houseHand}.`;
        incrementWins();

    }

    function playerHandWins(playerHandValue, houseHandValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Win!";
        document.getElementById('description').innerHTML = `Congratulations! Your hand value of ${playerHandValue} wins over the house's hand value of ${houseHandValue}.`;
        incrementWins();

    }

    function houseHandWins(playerHandValue, houseHandValue) {
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Lose!";
        document.getElementById('description').innerHTML = `Better luck next time! Your hand value of ${playerHandValue} loses to the house's hand value of ${houseHandValue}.`;
        incrementLoses()
    }

    //Scoreboard functions
    function incrementWins() {

        let wins = parseInt(winTallyRef.innerText);
        winTallyRef.innerText = ++wins;
    
    }

    function incrementLoses() {

        let loses = parseInt(loseTallyRef.innerText);
        loseTallyRef.innerText = ++loses;
    
    }

    function incrementDraws() {

        let drawn = parseInt(drawTallyRef.innerText);
        drawTallyRef.innerText = ++drawn;
    
    }

    function gameRulesContent {
        let content = `
        <h2>Game Rules</h2>
        <h3>Game Objective:</h3>
        <p>The aim of the game is simple, get as close to 21 as possible without going over.</p>
        <h3>How To Play:</h3>
        <p>You and the house will compete in turns to play your hands, and the one with the highest value under 22 will win the round.</p>
        <p>To draw another card from the deck, press the "HIT ME!"  button on the game table or the "H" key on the keyboard.</p>
        <p>Careful though, as if you go over 21, the jig is up, and you lose! Go news is that this applies to the house's hand too.</p>
        <p>Once content with your hand, press the "STAND" button on the game table or the "S" key on the keyboard to initiate the house's turn. The house will always stand on a hand value greater or equal to 17.</p>
        <h3>Card Values:</h3>
        <p>Each card is worth the same value as the number printed on it.</p>
        <p>All picture cards (Jack, Queen, King) have a value of 10.</p>
        <p>By default, Ace is high (equal to 11); however, if you go over 21, the system will automatically convert the Ace to have the value of 1 and allow you to keep hitting the deck until you stand or go bust.</p>
        <h3>Blackjack:</h3>
        <p>Blackjack is when either the player or the house has a value of 21 with just the initial two cards dealt.</p>
        <p>If both the player and house have blackjack, the house will always win! Sorry but thems be the rules.</p>
        <h3>Scoreboard:</h3>
        <p>The scoreboard keeps a tally of your wins, loses, and draws. At any point, you can reset this tally with the "RESET SCORE" button or the "R" key on the keyboard.</p>
        `
    }

});
