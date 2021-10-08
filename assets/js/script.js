// REMOVE ALL CONSOLE LOGS AND BLANK LINES
// break up the how to play section in the game rules
// key board short cuts - for as many buttons as possible
// refactor code to make sure every segment is in a function doing as little as possible and call that in the global scope to run the game
// !! above the MVP plan !!

// add sound- default off
//add color choice for the game table
//add player choice for ace high or low

//Global constant references for elements in the DOM
//reference to the module window frame
const mainMenuRef = document.getElementById("main-menu");
const gameTableRef = document.getElementById("game-table");
const subMenuContainerRef = document.getElementById("sub-menu-container");
const modalSurroundRef = document.getElementById("modal-surround");

//Menu option button references
const menuBtnRef = document.getElementById("menu-btn-wrap");
const playGameBtnRef = document.getElementById("play-game-btn");
const gameRulesBtnRef = document.getElementById("game-rules-btn");
const responsibleGamblingBtnRef = document.getElementById("rg-btn");
const backToMenuRef = document.querySelector(".back-to-menu");

//containers to send HTML from Javascript
const subMenuContentRef = document.getElementById("sub-menu-content");

//game table elements references
const hitBtnRef = document.getElementById("hit-btn");
const gameRuleAnchorRef = document.getElementById("rules-anchor");
const standBtnRef = document.getElementById("stand-btn");
const redealBtnRef = document.getElementById("redeal-btn");
const dealerCardContainerRef = document.getElementById("dealer-card-container");
const houseCardsRef = document.getElementById("dealer-card-container").children;
const playerCardContainerRef = document.getElementById("player-card-container");
const winTallyRef = document.getElementById("wins");
const loseTallyRef = document.getElementById("loses");
const drawTallyRef = document.getElementById("drawn");
const resetScoreRef = document.getElementById("reset-btn");

document.addEventListener("DOMContentLoaded", function () {
    let playerHand = [];
    let dealerHand = [];

    let canPlay = true;

    //Menu button event listeners
    playGameBtnRef.addEventListener("click", function () {
        displayGameTable()
    });

    gameRulesBtnRef.addEventListener("click", function () {
        // mainMenuRef.style.display = "none";
        // subMenuContainerRef.style.display = "block";
        // menuBtnRef.style.display = "none";

        gameRulesContent();
    });

    responsibleGamblingBtnRef.addEventListener("click", function () {
        // mainMenuRef.style.display = "none";
        // subMenuContainerRef.style.display = "block";
        // menuBtnRef.style.display = "none";

        responsibleGamingMenu();
    });

    //gameRulesBtnRef.addEventListener('click', gameRulesContent);

    menuBtnRef.addEventListener("click", function () {
        accessMenu();
    });

    backToMenuRef.addEventListener("click", function () {
        subMenuContainerRef.style.display = "none";
        mainMenuRef.style.display = "flex";
    });

    gameRuleAnchorRef.addEventListener("click", function () {
        gameTableRef.style.display = "none";
        // subMenuContainerRef.style.display = "block";
        menuBtnRef.style.display = "none";

        gameRulesContent();
    });

    //Game table button event listeners

    hitBtnRef.addEventListener("click", function () {
        if (canPlay) {
            hit(playerHand);
        }
    });

    //Keyboard controls for on the game table
    window.addEventListener("keydown", function (event) {
        if (document.querySelector('#main-menu').style.display !== "none") {
            if (event.key === "t") {
                displayGameTable();
            } else if (event.key === "r") {
                gameRulesContent();
            }
            else if (event.key === "g") {
                responsibleGamingMenu();
            }
        }else if (canPlay) {
            if (event.key === "h") {
                hit(playerHand);
            } else if (event.key === "s") {
                computerTurn();
            } else if (event.key === "m") {
                accessMenu()
            } else if (event.key === "c") {
                clearTally();
            } 
        } else if (canPlay === false) {
            if (event.key === "d") {
                reDeal();   
            } else if (event.key === "m") {
                accessMenu()
            }
        }
        
        // switch (canPlay){
        //     case event.key === "h":
        //         hit(playerHand);
        //         if (total > 21) {
        //             canPlay = false;
        //         }
        //         break;
        //     case event.key === "s":
        //         computerTurn();
        //         break;
        // }

        // switch (canPlay === false){
        //     case event.key === "d":
        //         reDeal();  
        //         break;

        // }
         
    });

    standBtnRef.addEventListener("click", computerTurn);

    redealBtnRef.addEventListener("click", function () {
        reDeal();
    });

    resetScoreRef.addEventListener("click", function () {
        clearTally()
    });

    firstTwoCards();

    /**
     * Deals the first two cards to the player and the house.
     **/
    function firstTwoCards() {
        playerHand = [];
        dealerHand = [];
        dealerCardContainerRef.innerHTML = "";
        playerCardContainerRef.innerHTML = "";
        let cardBack = document.createElement("img");
        cardBack.src = "assets/images/decks/darkred.svg";
        cardBack.className = "card card-back";
        cardBack.alt = "The houses first card face down on the table"

        for (let i = 0; i < 2; i++) {
            playerHand.push(dealCard("player"));
            dealerHand.push(dealCard("dealer"));
        }

        for (child of houseCardsRef) {
            if (child === houseCardsRef[0]) {
                child.style.display = "none";
                dealerCardContainerRef.insertBefore(
                    cardBack,
                    child
                ).style.display = "inline";
                cardBack.style.position = "absolute";
                cardBack.style.left = "15px";
            }
        }

        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);
        document.getElementById("player-total").innerHTML = `${playerTotal}`;


        checkBlackjack(dealerTotal, playerTotal);
    }

    /**
     * Checks if either of the initial hands have blackjack
     */
    function checkBlackjack(dealer, player) {
        if (dealer === 0) {
            houseReveal();
            houseBlackjack();
        } else if (player === 0) {
            document.getElementById("player-total").innerHTML = '21';
            houseReveal();
            playerBlackjack();
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
        card.style.position = "absolute";
        

        //Assigns the card image to the appropriate hand according to the parameter passed.
        if (dealtFor === "player") {
            let playerCards = document.getElementById("player-card-container");
            playerCards.appendChild(card);
            let playerHand = playerCards.childNodes;
            fanCards(playerHand, card);
        } else if (dealtFor === "dealer") {
            let houseCards = document.getElementById("dealer-card-container");
            houseCards.appendChild(card);
            let houseHand = houseCards.childNodes;
            fanCards(houseHand, card);
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
     * Positions the cards in a staggered fashion
     */
    function fanCards(hand, card) {
        let value = 15;
        // const container = document.querySelector(".card-container");
        // const containerWidth = container.offsetWidth;
        for (let i = 0; i <= hand.length; i++) {
            
            //  card.style.left = (containerWidth / 84) / 2  + (value * i) + "px";
            card.style.left =  (value * i) + "px";
          
        }
    }

    /**
     * Checks the hand value for blackjack and then loops through array to total score
     * if Ace found user will be prompted to decide if they want ace to = 1 or 11. 11(default)
     */
    function checkHandValue(hand) {
        //adds the total hand value together
        let handValue = 0;
        for (let card of hand) {
            handValue += card;
        }

        //checks the initial two cards for blackjack
        if (handValue === 21 && hand.length === 2) {
            
            return 0;

            // converts ace to low (from 11 to 1)
        } else if (handValue > 21 && hand.includes(11)) {
            firstAce = hand.indexOf(11);
            for (let i = 0; i <= hand.length; i++) {
                
                console.log('first ace index :>> ', firstAce);
                if (i === firstAce ) {
                    console.log('start' + hand);
                    hand.splice(i, 1);
                    hand.push(1);
                    console.log('end' + hand)
                    return checkHandValue(hand);
                }
            }
        } else if (hand === playerHand && handValue >= 22) {
            playerBust(handValue);
            return (handValue);
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
        canPlay = false;

        houseCardsRef[0].style.display = "none";
        houseCardsRef[1].style.display = "inline";

        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);

        if (dealerTotal >= 17) {
            compareHands(playerTotal, dealerTotal);
        } else {
            while (dealerTotal <= 17) {
                dealerHand.push(dealCard("dealer"));
                let dealerTotal = checkHandValue(dealerHand);

                if (dealerTotal > 21) {
                    houseBust(dealerTotal);
                    break;
                } else if (dealerTotal >= 17) {
                    compareHands(playerTotal, dealerTotal);
                    break;
                }
            }
        }
    }

    /**
     * Flips the houses hidden card face up once the players turn is over
     */
    function houseReveal() {
        houseCardsRef[0].style.display = "none";
        houseCardsRef[1].style.display = "inline";
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
        hitBtnRef.disabled = true;
        canPlay = false;
        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You Lose!";
        document.getElementById("description").innerHTML = "The house has Blackjack!";

        incrementLoses();
    }

    /**
     * Displays message when player has blackjack
     */
    function playerBlackjack() {
        hitBtnRef.disabled = true;
        canPlay = false;
        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You Win!";
        document.getElementById("description").innerHTML = "You have Blackjack!";

        incrementWins();
    }

    /**
     * Displays message when house has blackjack
     */
    function playerBust(handValue) {
        
        hitBtnRef.disabled = true;
        canPlay = false;
        document.getElementById("player-total").innerHTML = `${handValue}`;
        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You're Bust!";
        let bustModal = document.getElementById("description");
        bustModal.innerHTML = `The limit is 21, your current score is ${handValue}.`;
 
        incrementLoses();
    }

    /**
     * Displays message for a draw
     */
    function draw(playerHandValue) {
        hitBtnRef.disabled = true;
        canPlay = false;

        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "Draw!";
        document.getElementById(
            "description"
        ).innerHTML = `You and the house have equal hand values of ${playerHandValue}.`;

        incrementDraws();
    }

    /**
     * Displays message for when the house goes bust
     */
    function houseBust(houseHand) {
        hitBtnRef.disabled = true;
        canPlay = false;

        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You Win!";
        document.getElementById(
            "description"
        ).innerHTML = `The house went bust with a value of ${houseHand}.`;

        incrementWins();
    }

    /**
     * Displays message for when the player wins
     */
    function playerHandWins(playerHandValue, houseHandValue) {
        // hitBtnRef.disabled = false;
        canPlay = false;

        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You Win!";
        document.getElementById(
            "description"
        ).innerHTML = `Congratulations! Your hand value of ${playerHandValue} wins over the house's hand value of ${houseHandValue}.`;

        incrementWins();
    }

    /**
     * Displays message for when the house wins
     */
    function houseHandWins(playerHandValue, houseHandValue) {
        // hitBtnRef.disabled = false;
        canPlay = false;

        modalSurroundRef.style.display = "block";

        document.getElementById("result").innerHTML = "You Lose!";
        document.getElementById(
            "description"
        ).innerHTML = `Better luck next time! Your hand value of ${playerHandValue} loses to the house's hand value of ${houseHandValue}.`;
 
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

    //event related functions

    function displayGameTable() {
        mainMenuRef.style.display = "none";
        gameTableRef.style.display = "flex";
        gameTableRef.style.justifyContent = "space-between";
        gameTableRef.style.flexDirection = "column";
        gameTableRef.style.alignItems = "center";
        menuBtnRef.style.display = "block";
    }    

    function accessMenu() {
        gameTableRef.style.display = "none";
        mainMenuRef.style.display = "flex";
        menuBtnRef.style.display = "none";
        subMenuContainerRef.style.display = "none";
        
    }

    function reDeal() {
        hitBtnRef.disabled = false;
        canPlay = true;
        modalSurroundRef.style.display = "none";

        firstTwoCards();    
    }

    function clearTally() {
        winTallyRef.innerHTML = 0;
        loseTallyRef.innerHTML = 0;
        drawTallyRef.innerHTML = 0;
    }

    function hit(playerHand) {
        playerHand.push(dealCard("player"));
            // checkHandValue(playerHand);
            let runningTotal = checkHandValue(playerHand);
            document.getElementById("player-total").innerHTML = `${runningTotal}`;
            if (playerHand > 21) {
                canPlay = false;
            }
    }

    //Menu pages
    /**
     * Adds content to the game rules modal
     */
    function gameRulesContent() {
        let rules = `
            <h2 class="menu-heading">Game Rules</h2>
            
            <button class="rule-heading btn-bg"><h3>Game Objective:</h3></button>
            
            <section class="rule-segment">   
                <p>
                    The aim of the game is simple, get as close to 21 as possible without going over.
                </p>
                <p>
                    You will compete against the house, taking it in turns to play your hands. The one with the highest value under 22 will win the round.
                </p>
            </section> 
            
            <button class="rule-heading btn-bg"><h3>How To Play:</h3></button>
            
            <section class="rule-segment">
                <p>
                    To draw another card from the deck, click the "HIT ME!" button on the game table.
                </p>
                <p>
                    Careful though, as if you go over 21, the jig is up, and you lose! The good news is that this applies to the house's hand too.
                </p>
                <p>
                    Once content with your hand, click the "STAND" button on the game table.
                </p>  
                <p>
                    The house will always stand on a hand value greater than or equal to 17.
                </p>
            </section> 
            
            <button class="rule-heading btn-bg"><h3>Card Values:</h3></button>
            
            <section class="rule-segment">
                <p>
                    Each card is worth the same value as the number printed on it.
                </p>
                <p>
                    All picture cards (Jack, Queen, King) have a value of 10.
                </p>
                <p>
                    By default, Ace is high (equal to 11); however, if you go over 21, the system will automatically convert the Ace to have the value of 1, 
                    which allows you to keep hitting the deck until you stand or go bust.
                </p>
            </section> 
            
            <button class="rule-heading btn-bg"><h3>Blackjack:</h3></button>
            
            <section class="rule-segment">
                <p>
                    Blackjack is when either the player or the house has a value of 21 with just the initial two cards dealt. 
                    Should this occur, the round is over automatically, and the one who possesses blackjack wins.
                </p>
                <p>
                    Sadly if both the player and house have blackjack, the house will always win! Sorry, but those are the rules.
                </p>
            </section>

            <button class="rule-heading btn-bg"><h3>Scoreboard:</h3></button>
            <section class="rule-segment">
                <p>The scoreboard keeps a tally of your wins, loses, and draws. At any point, you can reset this tally with the "RESET SCORE" button or the "R" key on the keyboard.</p>
            </section> 
        `;

        subMenuContentRef.innerHTML = rules;
        subMenuContainerRef.style.display = "block";
        mainMenuRef.style.display = "none";
        ruleMenuFunctionality();
    }

    /**
     * Gives the accordion menu the functionality
     */
    function ruleMenuFunctionality() {
        let ruleHeading = document.querySelectorAll(".rule-heading");
        let ruleSegment = document.querySelectorAll(".rule-segment");

        for (let i = 0; i < ruleHeading.length; i++) {
            ruleHeading[i].addEventListener("click", function () {
                if (this.nextElementSibling.style.maxHeight) {
                    hideRulePanels();
                } else {
                    extendRulePanel(this);
                }
            });
        }

        /**
         * Allows the game rules meu to extend
         */
        function extendRulePanel(target) {
            hideRulePanels();

            target.classList.add("active");
            target.nextElementSibling.style.maxHeight =
                target.nextElementSibling.scrollHeight + "px";
        }

        /**
         * Hides game rules segments when a new one is open
         */
        function hideRulePanels() {
            for (let i = 0; i < ruleSegment.length; i++) {
                ruleSegment[i].style.maxHeight = null;
                ruleHeading[i].classList.remove("active");
            }
        }
    }

    /**
     * Adds content to the responsible gaming modal
     */
    function responsibleGamingMenu() {
        let rgInfo = `
            <h2 class="menu-heading">Responsible Gaming</h2>
            <p>
                I hate to be "that guy," but please remember that while games 
                like this can be a lot of fun, gambling can become a severe problem for some.
            </p>
            <p>
                Should you find yourself compulsively gambling without control, please seek help from 
                your local health care provider, who can direct you to the support resources in your area. 
            </p>
            <p>
                With that said, this game is free to play, so please enjoy it responsibly.
            </p>
        `;

        subMenuContentRef.innerHTML = rgInfo;
        mainMenuRef.style.display = "none";
        subMenuContainerRef.style.display = "block";
        menuBtnRef.style.display = "none";
    }
});
