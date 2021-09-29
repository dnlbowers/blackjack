//add functionality to the menu
//FINISH accordion menu so only one can be open at a time
//CONSIDER SCROLL for rules on mobile device
// refactor code to make sure every segment is in a function doing as little as possible and call that in the global scope to run the game
// !! above the MVP plan !!
// key board short cuts
// add sound
//add color choice for the game table
//add player choice for ace high or low

//Global constant references for elements in the DOM
//reference to the module window frame
const mainMenuRef = document.getElementById('main-menu');
const gameTableRef = document.getElementById('game-table');
const subMenuContainerRef = document.getElementById('sub-menu-container');
//Menu option button references
const menuBtnRef = document.getElementById('menu-btn');
const playGameBtnRef = document.getElementById('play-game-btn');
const gameRulesBtnRef = document.getElementById('game-rules-btn');
const backToMenuRef = document.querySelector('.back-to-menu');

//containers to send HTML from Javascript
const subMenuContentRef = document.getElementById('sub-menu-content');

//game table elements references
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

    gameRulesBtnRef.addEventListener('click', function() {
        
        mainMenuRef.style.display = 'none';
        subMenuContainerRef.style.display = 'block';
        menuBtnRef.style.display = 'none';
        gameRulesContent()

    });

    //gameRulesBtnRef.addEventListener('click', gameRulesContent);

    menuBtnRef.addEventListener('click', function() {

        gameTableRef.style.display = 'none';
        mainMenuRef.style.display = 'block';
        menuBtnRef.style.display = 'none';
        playGameBtnRef.innerHTML = 'RETURN TO GAME';

    })

    backToMenuRef.addEventListener('click', function() {

        subMenuContainerRef.style.display = 'none';
        mainMenuRef.style.display = 'block'
    
    });
    
    
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

    /**
     * Deals the first two cards to the player and the house. 
     **/    
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

    /**
     * Checks if either of the initial hands have blackjack
     */
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
        
        if (playerHandValue === houseHandValue) {
            draw(playerHandValue);
        } else if (playerHandValue > houseHandValue) {
            playerHandWins(playerHandValue, houseHandValue);
        } else {
            houseHandWins(playerHandValue, houseHandValue);
        }

    }
    //functions to display the results modals
    
    /**
     * Displays message when house has blackjack 
     */
    function houseBlackjack() {

        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Lose!";
        document.getElementById('description').innerHTML = 'The house has Blackjack!';
        incrementLoses()

    }

    /**
     * Displays message when player has blackjack 
     */
    function playerBlackjack() {

        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = 'You Win!';
        document.getElementById('description').innerHTML = 'You have Blackjack!';
        incrementWins();

    }
    
    /**
     * Displays message when house has blackjack
     */
    function playerBust(handValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You're Bust!";
        document.getElementById('description').innerHTML = `The limit is 21, your current score is ${handValue}.`;
        incrementLoses()

    }
    
    /**
     * Displays message for a draw
     */
    function draw(playerHandValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "Draw!";
        document.getElementById('description').innerHTML = `You and the house have equal hand values of ${playerHandValue}.`;
        incrementDraws()

    }

    /**
     * Displays message for when the house goes bust
     */
    function houseBust(houseHand) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Win!";
        document.getElementById('description').innerHTML = `The house went bust with a value of ${houseHand}.`;
        incrementWins();

    }

    /**
     * Displays message for when the player wins
     */    
    function playerHandWins(playerHandValue, houseHandValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Win!";
        document.getElementById('description').innerHTML = `Congratulations! Your hand value of ${playerHandValue} wins over the house's hand value of ${houseHandValue}.`;
        incrementWins();

    }

    /**
     * Displays message for when the house wins
     */
    function houseHandWins(playerHandValue, houseHandValue) {
        
        hitBtnRef.disabled = false;
        modalSurroundRef.style.display = 'block';
        document.getElementById('result').innerHTML = "You Lose!";
        document.getElementById('description').innerHTML = `Better luck next time! Your hand value of ${playerHandValue} loses to the house's hand value of ${houseHandValue}.`;
        incrementLoses();

    }

    //Scoreboard functions
    /**
     * Increases win tally on scoreboard
     */
    function incrementWins() {

        let wins = parseInt(winTallyRef.innerText);
        winTallyRef.innerText = ++wins;
    
    }
    
    /**
     * Increases loses tally on scoreboard
     */
    function incrementLoses() {

        let loses = parseInt(loseTallyRef.innerText);
        loseTallyRef.innerText = ++loses;
    
    }

    /**
     * Increases draw tally on scoreboard
     */
    function incrementDraws() {

        let drawn = parseInt(drawTallyRef.innerText);
        drawTallyRef.innerText = ++drawn;
    
    }

    /**
     * Adds content to the game rules modal
     */
    function gameRulesContent() {
        
        let rules = `
            <h2>Game Rules:</h2>
            
            <button class="rule-heading"><h3>Game Objective:</h3></button>
            
            <section class="rule-segment">   
                <p>The aim of the game is simple, get as close to 21 as possible without going over.</p>
            </section> 
            
            <button class="rule-heading"><h3>How To Play:</h3></button>
            
            <section class="rule-segment">
                <p>You and the house will compete in turns to play your hands, and the one with the highest value under 22 will win the round.</p>
                <p>To draw another card from the deck, press the "HIT ME!"  button on the game table or the "H" key on the keyboard.</p>
                <p>Careful though, as if you go over 21, the jig is up, and you lose! Go news is that this applies to the house's hand too.</p>
                <p>Once content with your hand, press the "STAND" button on the game table or the "S" key on the keyboard to initiate the house's turn. The house will always stand on a hand value greater or equal to 17.</p>
            </section> 
            
            <button class="rule-heading"><h3>Card Values:</h3></button>
            
            <section class="rule-segment">
                <p>Each card is worth the same value as the number printed on it.</p>
                <p>All picture cards (Jack, Queen, King) have a value of 10.</p>
                <p>By default, Ace is high (equal to 11); however, if you go over 21, the system will automatically convert the Ace to have the value of 1 and allow you to keep hitting the deck until you stand or go bust.</p>
            </section> 
            
            <button class="rule-heading"><h3>Blackjack:</h3></button>
            
            <section class="rule-segment">
                <p>Blackjack is when either the player or the house has a value of 21 with just the initial two cards dealt.</p>
                <p>If both the player and house have blackjack, the house will always win! Sorry but thems be the rules.</p>
            </section>

            <button class="rule-heading"><h3>Scoreboard:</h3></button>
            <section class="rule-segment">
                <p>The scoreboard keeps a tally of your wins, loses, and draws. At any point, you can reset this tally with the "RESET SCORE" button or the "R" key on the keyboard.</p>
            </section> 
            `
            subMenuContentRef.innerHTML = rules;
            ruleMenuFunctionality();
    }

    
    function ruleMenuFunctionality() {
        let ruleHeading = document.querySelectorAll('.rule-heading');
        let ruleSegment = document.querySelectorAll('.rule-segment');
        
        for (i = 0; i < ruleHeading.length; i++) {
           
            ruleHeading[i].addEventListener("click", function() {
           
                if (this.nextElementSibling.style.maxHeight) {
                    hideRulePanels()
                } else {
                    extendRulePanel(this);
                }
            });
        
        }
        
        function extendRulePanel(target) {
            hideRulePanels()
            target.classList.add("active");
            target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";  
        }
        function hideRulePanels() {
            for (let i = 0; i < ruleSegment.length; i++) {
                ruleSegment[i].style.maxHeight = null;
                ruleHeading[i].classList.remove("active");
            }
        }
    }

});
