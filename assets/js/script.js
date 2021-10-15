// REMOVE ALL CONSOLE LOGS AND BLANK LINES
// break up the how to play section in the game rules
// Add computer total = ? and fill the score at the end
// Make sure to add keydown event on main menu for options

//mention infinite deck in the game rules and that if player hits 21 exactly when drawing card the computer turn is automatically initiated
//consider a slight delay when computer turn is triggered automatically and before the result modal appearing
//consider adding more decks and shuffle function
//change score board to stake and pot with a double your stake on win
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
const rulesContainerRef = document.getElementById("rules-sub-menu");
const optionsContainerRef = document.getElementById("options-sub-menu");
const responsibleContainerRef = document.getElementById("responsible-sub-menu")

//In game pop up references
const modalSurroundRef = document.getElementById("modal-surround");
const resultSurroundRef = document.getElementById("result-modal");
const resultHeadingRef = document.getElementById("result");
const resultContentRef = document.getElementById("description");
const resultModalBtnRef = document.getElementById("redeal-btn");

//Menu option button references
const menuBtnRef = document.getElementById("menu-btn-wrap");
const playGameBtnRef = document.getElementById("play-game-btn");
const gameRulesBtnRef = document.getElementById("game-rules-btn");

const ruleHeading = document.querySelectorAll(".rule-heading");
const ruleSegment = document.querySelectorAll(".rule-segment");
const optionsBtnRef = document.getElementById("game-options-btn")
const colorThemeRef = document.getElementsByClassName('color-theme');
const mainWindowRef = document.querySelectorAll('.main-window');
const responsibleGamblingBtnRef = document.getElementById("rg-btn");
const exitRulesRef = document.getElementById("exit-rules");
const exitOptionsRef = document.getElementById("exit-options");
const exitRgRef = document.getElementById("exit-rg");

//game table elements references
const hitBtnRef = document.getElementById("hit-btn");
const gameRuleAnchorRef = document.getElementById("rules-anchor");
const standBtnRef = document.getElementById("stand-btn");
const dealerCardContainerRef = document.getElementById("dealer-card-container");
const houseCardsRef = document.getElementById("dealer-card-container").children;
const playerCardContainerRef = document.getElementById("player-card-container");
const winTallyRef = document.getElementById("wins");
const loseTallyRef = document.getElementById("loses");
const drawTallyRef = document.getElementById("drawn");
const resetScoreRef = document.getElementById("reset-btn");
const playerTotalRef = document.getElementById("player-total");

document.addEventListener("DOMContentLoaded", function () {
    let playerHand = [];
    let dealerHand = [];
    let canPlay = false;

    ruleMenuFunctionality();
    colorTheme();

    //Menu button event listeners
    playGameBtnRef.addEventListener("click", function () {
        displayGameTable();
    });

    //rule related event listeners
    //Main Menu Rules button
    gameRulesBtnRef.addEventListener("click", function () {
        rulesContainerRef.style.display = "block";
        mainMenuRef.style.display = "none";
    });
    
    //Games table anchor for the game rules
    gameRuleAnchorRef.addEventListener("click", function () {
        rulesContainerRef.style.display = "block";
        gameTableRef.style.display = "none";
        menuBtnRef.style.display = "none";
    });

    //Main Menu button for options page
    optionsBtnRef.addEventListener("click", function () {
        optionsContainerRef.style.display = "block";
        mainMenuRef.style.display = "none";
    });
    
    //Main Menu button for RG page
    responsibleGamblingBtnRef.addEventListener("click", function () {
        responsibleGamingMenu();
    });

    // return to main menu from sub menu buttons
    exitRulesRef.addEventListener("click", function () {
        rulesContainerRef.style.display = "none";
        mainMenuRef.style.display = "flex";
    });

    exitOptionsRef.addEventListener("click", function () {
        optionsContainerRef.style.display = "none";
        mainMenuRef.style.display = "flex";
    });

    exitRgRef.addEventListener("click", function () {
        responsibleContainerRef.style.display = "none";
        mainMenuRef.style.display = "flex";
    });

    //Menu btn on game table
    menuBtnRef.addEventListener("click", function () {
        accessMenu();
    });

    //Game table button event listeners
    hitBtnRef.addEventListener("click", function () {
        if (canPlay) {
            hit(playerHand);
        }
    });

    standBtnRef.addEventListener("click", computerTurn);

    resultModalBtnRef.addEventListener("click", function () {
        reDeal();
    });

    resetScoreRef.addEventListener("click", function () {
        clearTally();
    });


    //Keyboard controls for on the game table
    window.addEventListener("keydown", function (event) {
        if (document.querySelector('#main-menu').style.display !== "none") {
            if (event.key === "t") {
                displayGameTable();
            } else if (event.key === "r") {
                rulesContainerRef.style.display = "block";
                mainMenuRef.style.display = "none";
            }
            else if (event.key === "g") {
                responsibleGamingMenu();
            }
        } else if (modalSurroundRef.style.display !== "none") {
            if (event.key === "d") {
                reDeal();   
            } else if (event.key === "m") {
                accessMenu();
            }
        } else if (canPlay) {
            if (event.key === "h") {
                hit(playerHand);
            } else if (event.key === "s") {
                computerTurn();
            } else if (event.key === "m") {
                accessMenu();
            } else if (event.key === "c") {
                clearTally();
            } 
        }      
    });

    /**
     * Resets both hands on the table to zero
     */
    function resetHands() {
        playerHand = [];
        dealerHand = [];
        dealerCardContainerRef.innerHTML = "";
        playerCardContainerRef.innerHTML = "";
    }
    
    /**
     * Creates the img of a card back for the first house card dealt
     */
    function createCardBack() {
        let cardBack = document.createElement("img");
        cardBack.src = "assets/images/decks/darkred.svg";
        cardBack.className = "card card-back";
        cardBack.alt = "The houses first card face down on the table";
        return cardBack;
    }

    /**
     * Deals the first two cards to the player and the house, adds up the hand total and triggers a check for blackjack.
     **/
    function firstTwoCards() { 
        resetHands();
        let firstHouseCard = createCardBack();
        
        for (let i = 0; i < 2; i++) {
            playerHand.push(dealCard("player"));
            dealerHand.push(dealCard("dealer"));
        }
        
        for (let child of houseCardsRef) {
            if (child === houseCardsRef[0]) {
                child.style.display = "none";
                dealerCardContainerRef.insertBefore(
                    firstHouseCard,
                    child
                ).style.display = "inline";
                firstHouseCard.style.position = "absolute";
                firstHouseCard.style.left = "15px";
            }
        }
        
        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);
        playerTotalRef.innerHTML = `${playerTotal}`;
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
            playerTotalRef.innerHTML = '21';
            houseReveal();
            playerBlackjack();
        }
    }

    /**
     * Deals a random card on to the table and assigns it a value.
     * places and image of the card in DOM according to the parameter passed.
     */
    function dealCard(dealtFor) {
        const allSuits = ["hearts", "clubs", "spades", "diamonds"];
        const allCardValues = [
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
        
        let suit = allSuits[randomSuit];
        let value = allCardValues[randomValue];
        
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
        } 
        return value; 
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
            let firstAce = hand.indexOf(11);
            for (let i = 0; i <= hand.length; i++) {
                if (i === firstAce ) {
                    hand.splice(i, 1);
                    hand.push(1);
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
     * ends players ability to play and triggers computers turn
     * and calling the compareHands function.
     */
    function computerTurn() {
        canPlay = false;

        houseCardsRef[0].style.display = "none";
        houseCardsRef[1].style.display = "inline";

        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);

        while (dealerTotal < 17) {
            dealerHand.push(dealCard("dealer"));
            let dealerTotal = checkHandValue(dealerHand);

            if (dealerTotal > 21) {
                return houseBust(dealerTotal);
            } 
        }
        return compareHands(playerTotal, dealerTotal);
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
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "You Lose!";
        resultContentRef.innerHTML = "The house has Blackjack!";
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementLoses();
    }

    /**
     * Displays message when player has blackjack
     */
    function playerBlackjack() {
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "You Win!";
        resultContentRef.innerHTML = "You have Blackjack!";
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementWins();
    }

    /**
     * Displays message when house has blackjack
     */
    function playerBust(handValue) {
        canPlay = false;
        playerTotalRef.innerHTML = `${handValue}`;
        modalSurroundRef.style.display = "flex"; 
        resultHeadingRef.innerHTML = "You're Bust!";
        resultContentRef.innerHTML = `The limit is 21, your current score is ${handValue}.`;
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementLoses();
    }

    /**
     * Displays message for a draw
     */
    function draw(playerHandValue) {
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "Draw!";
        resultContentRef.innerHTML = `You and the house have equal hand values of ${playerHandValue}.`;
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementDraws();
    }

    /**
     * Displays message for when the house goes bust
     */
    function houseBust(houseHand) {
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "You Win!";
        resultContentRef.innerHTML = `The house went bust with a value of ${houseHand}.`;
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementWins();
    }

    /**
     * Displays message for when the player wins
     */
    function playerHandWins(playerHandValue, houseHandValue) {
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "You Win!";
        resultContentRef.innerHTML = `Congratulations! Your hand value of ${playerHandValue} wins over the house's hand value of ${houseHandValue}.`;
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
        incrementWins();
    }

    /**
     * Displays message for when the house wins
     */
    function houseHandWins(playerHandValue, houseHandValue) {
        canPlay = false;
        modalSurroundRef.style.display = "flex";
        resultHeadingRef.innerHTML = "You Lose!";
        resultContentRef.innerHTML = `Better luck next time! Your hand value of ${playerHandValue} loses to the house's hand value of ${houseHandValue}.`;
        resultModalBtnRef.innerHTML = `<span class="key-control-indicator">D</span>eal Again`;
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
        optionsContainerRef.style.display ="none";
        responsibleContainerRef.style.display = "none";
        rulesContainerRef.style.display = "none";
    }

    function reDeal() {
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
            let runningTotal = checkHandValue(playerHand);
            playerTotalRef.innerHTML = `${runningTotal}`;
            if (runningTotal === 21) {
                computerTurn();
            }
    }

    //Menu pages
    /**
     * Gives the accordion menu the functionality
     */
    function ruleMenuFunctionality() {
        for (let i = 0; i < ruleHeading.length; i++) {
            ruleHeading[i].addEventListener("click", function () {
                if (this.nextElementSibling.style.maxHeight) {
                    hideRulePanels();
                } else {
                    extendRulePanel(this);
                }
            });
        }
    } 

    /**
    * Allows the game rules meu to extend
    */
    function extendRulePanel(target) {
        hideRulePanels();
        target.classList.add("active");
        target.removeAttribute("aria-expanded", "false");
        target.setAttribute("aria-expanded", "true");
        target.nextElementSibling.removeAttribute("aria-hidden", "true");
        target.nextElementSibling.setAttribute("aria-hidden", "false");
        target.nextElementSibling.style.maxHeight =
            target.nextElementSibling.scrollHeight + "px";
    }

    /**
    * Hides game rules segments when a new one is open
    */    
    function hideRulePanels() {
        for (let i = 0; i < ruleSegment.length; i++) {
            ruleSegment[i].style.maxHeight = null;
            ruleSegment[i].setAttribute("aria-hidden", "true");
            ruleHeading[i].setAttribute("aria-expanded", "false"); 
            ruleHeading[i].classList.remove("active");
        } 
    }
    
    /**
     * Adds content to the responsible gaming modal
     */
    function responsibleGamingMenu() {
        mainMenuRef.style.display = "none";
        responsibleContainerRef.style.display = "block";
    }

    function colorTheme(){
        for (let theme of colorThemeRef ) {
            theme.addEventListener('click', function() {
                if (this.getAttribute('data-type') === 'blue') {
                    theme.classList.add("active-theme");
                    blueTheme(this);
                } else if (this.getAttribute('data-type') === 'green') {
                    theme.classList.add("active-theme");
                    greenTheme(this);
                } else if (this.getAttribute('data-type') === 'purple') {
                    theme.classList.add("active-theme");
                    purpleTheme(this);
                }
            });
        }
    }

    function removeActiveTheme() {
        for (let i = 0; i < colorThemeRef.length; i++) {
            console.log("first" +colorThemeRef[i].classList);
            colorThemeRef[i].classList.remove("active-theme");
            console.log("second" + colorThemeRef[i].classList);
        } 
    }

    function blueTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#00BFFF";
        resultSurroundRef.style.backgroundColor = "#4682B4";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#00008B";
        }
    }

    function greenTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#00FFBF";
        resultSurroundRef.style.backgroundColor = "#008080";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#006400";
        }
    }

    function purpleTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#EE82EE";
        resultSurroundRef.style.backgroundColor = "#312b50";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#300640";
        }
    }
});
