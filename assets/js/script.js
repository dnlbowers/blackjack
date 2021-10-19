
//MUST DO's
// REMOVE ALL CONSOLE LOGS, COMMENTED OUT CODE AND BLANK LINES

// break up the how to play section in the game rules

//mention infinite deck in the game rules and that if player hits 21 exactly when drawing card the computer turn is automatically initiated

// refactor code to make sure every segment is in a function doing as little as possible and call that in the global scope to run the game

// !! above the MVP plan !!
//animate cards with keyframes
//consider a slight delay when computer turn is triggered automatically and before the result modal appearing
// add sound- default off
//add player choice for ace high or low
// if time look into shuffle 
//consider adding more decks and shuffle function
//change score board to stake and pot with a double your stake on win (fun money;)


//Global constant references for elements in the DOM
//reference to the module window frame
const responsibleContainerRef = document.getElementById("responsible-sub-menu");
const optionsContainerRef = document.getElementById("options-sub-menu");
const rulesContainerRef = document.getElementById("rules-sub-menu");
const gameTableRef = document.getElementById("game-table");
const mainMenuRef = document.getElementById("main-menu");
//In game pop up references
const modalSurroundRef = document.getElementById("modal-surround");
const resultSurroundRef = document.getElementById("result-modal");
const resultModalBtnRef = document.getElementById("redeal-btn");
const resultContentRef = document.getElementById("description");
const resultHeadingRef = document.getElementById("result");
//Main menu option button references
const gameRulesBtnRef = document.getElementById("game-rules-btn");
const optionsBtnRef = document.getElementById("game-options-btn");
const accessTableBtnRef = document.getElementById("play-game-btn");
const menuBtnRef = document.getElementById("menu-btn-wrap");
const responsibleBtnRef = document.getElementById("rg-btn");
// Sub-menu references
const colorThemeRef = document.querySelectorAll('.color-theme');
const ruleSegment = document.querySelectorAll(".rule-segment");
const exitOptionsRef = document.getElementById("exit-options");
const ruleHeading = document.querySelectorAll(".rule-heading");
const exitRulesRef = document.getElementById("exit-rules");
const exitRgRef = document.getElementById("exit-rg");
// Reference to all modals acting as the centre display area,
const mainWindowRef = document.querySelectorAll('.main-window');
//game table elements references
const playerCardContainerRef = document.getElementById("player-card-container");
const dealerCardContainerRef = document.getElementById("dealer-card-container");
const houseCardsRef = document.getElementById("dealer-card-container").children;
const gameRuleAnchorRef = document.getElementById("rules-anchor");
const playerTotalRef = document.getElementById("player-total");
const resetScoreRef = document.getElementById("reset-btn");
const standBtnRef = document.getElementById("stand-btn");
const drawTallyRef = document.getElementById("draws");
const loseTallyRef = document.getElementById("losses");
const winTallyRef = document.getElementById("wins");
const hitBtnRef = document.getElementById("hit-btn");

document.addEventListener("DOMContentLoaded", function () {
    let playerHand = [];
    let dealerHand = [];
    let canPlay = false;
    // Call functions to give sub-menus functionality
    ruleMenuFunctionality();
    colorTheme();
    
    //Menu button event listeners
    accessTableBtnRef.addEventListener("click", function () {
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
    responsibleBtnRef.addEventListener("click", function () {
        responsibleGamingMenu();
    });

    // return to main menu from sub menu buttons
    exitRulesRef.addEventListener("click", function () {
        rulesContainerRef.style.display = "none";
        mainMenuRef.style.display = "block";
    });

    exitOptionsRef.addEventListener("click", function () {
        optionsContainerRef.style.display = "none";
        mainMenuRef.style.display = "block";
    });

    exitRgRef.addEventListener("click", function () {
        responsibleContainerRef.style.display = "none";
        mainMenuRef.style.display = "block";
    });

    //Menu btn for access from the game table
    menuBtnRef.addEventListener("click", function () {
        accessMenu();
    });

    //Game table button event listeners
    hitBtnRef.addEventListener("click", function () {
        if (canPlay) {
            hit(playerHand);
        }
    });

    standBtnRef.addEventListener("click", function() {
        if (canPlay) {
            computerTurn();
        } 
    });
    
    resultModalBtnRef.addEventListener("click", function () {
        reDeal();
    });

    resetScoreRef.addEventListener("click", function () {
        clearTally();
    });


    //Keyboard controls for on the game table
    window.addEventListener("keydown", function (event) {
        if (document.querySelector('#main-menu').style.display !== "none") {
            if (event.key.toLowerCase() === "t") {
                displayGameTable();
            } else if (event.key.toLowerCase() === "r") {
                rulesContainerRef.style.display = "block";
                mainMenuRef.style.display = "none";
            } else if (event.key.toLowerCase() === "o"){
                optionsContainerRef.style.display = "block";
                mainMenuRef.style.display = "none";
            } else if (event.key.toLowerCase() === "g") {
                responsibleGamingMenu();
            }
        } else if (modalSurroundRef.style.display !== "none") {
            if (event.key.toLowerCase() === "d") {
                reDeal();   
            } else if (event.key.toLowerCase() === "m") {
                accessMenu();
            }
        } else if (canPlay) {
            if (event.key.toLowerCase() === "h") {
                hit(playerHand);
            } else if (event.key.toLowerCase() === "s") {
                computerTurn();
            } else if (event.key.toLowerCase() === "m") {
                accessMenu();
            } else if (event.key.toLowerCase() === "c") {
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
        // let shuffledSuits = shuffleSuits();
        // let shuffledValues = shuffleValues();
        
        // if implement a shuffle then add shuffledSuits, shuffledValues as parameters to the deal card call function below
        for (let i = 0; i < 2; i++) {
            playerHand.push(dealCard("player"));
            dealerHand.push(dealCard("dealer"));
            // for (let child of houseCardsRef) {
            if (houseCardsRef[0]) {
                houseCardsRef[0].style.display = "none";
                dealerCardContainerRef.insertBefore(
                    firstHouseCard,
                    houseCardsRef[0]
                ).style.display = "inline";
                firstHouseCard.style.position = "absolute";
                firstHouseCard.style.left = "15px";
            }
            // }
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


//shuffle functions ready to go
    // function shuffleSuits() {
    //     let allSuits = ["hearts", "clubs", "spades", "diamonds"];
    //     for(let i = allSuits.length - 1; i > 0; i--){
    //         const j = Math.floor(Math.random() * i)
    //         const temp = allSuits[i]
    //         allSuits[i] = allSuits[j]
    //         allSuits[j] = temp
    //     }
    //     return allSuits;
    // }

    // function shuffleValues() {
    //     let allCardValues = [
    //         2,
    //         3,
    //         4,
    //         5,
    //         6,
    //         7,
    //         8,
    //         9,
    //         10,
    //         "jack",
    //         "queen",
    //         "king",
    //         "ace",
    //     ];
    //     for(let i = allCardValues.length - 1; i > 0; i--){
    //         const j = Math.floor(Math.random() * i)
    //         const temp = allCardValues[i]
    //         allCardValues[i] = allCardValues[j]
    //         allCardValues[j] = temp
    //     }
    //     return allCardValues;
    // }

    //if decide to go for the shuffle may need to add  suits, cardValues as parameters

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
            fanCards("player",playerHand, card);
        } else if (dealtFor === "dealer") {
            let houseCards = document.getElementById("dealer-card-container");
            houseCards.appendChild(card);
            let houseHand = houseCards.childNodes;
            fanCards("dealer", houseHand, card);
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
    function fanCards(side, hand, card) {
        let value = 15;
        for (let i = 1; i <= hand.length; i++) {
            if (side === "player"){
                card.style.left =  (value * i) + "px";
            } else if (side === "dealer") {
                card.style.left =  (value * i) - 15 + "px";
            }
        }
    }

    /**
     * Checks the following
     * if the passed hand has blackjack.
     * if the user score has gone over 21 and an Ace found the ace value will be lowered
     * If the player goes bust, his turn will end.
     * if none of the above conditions are met then it will simple return the current value of the passed hand
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
     * ends players ability to play and triggers computers turn before comparing the hands
     */
    function computerTurn() {
        canPlay = false;
        houseCardsRef[0].style.display = "none";
        houseCardsRef[1].style.left = "15px";
        houseCardsRef[1].style.display = "inline";
        let playerTotal = checkHandValue(playerHand);
        let dealerTotal = checkHandValue(dealerHand);
        while (dealerTotal < 17) {
            dealerHand.push(dealCard("dealer"));
            let dealerTotal = checkHandValue(dealerHand);
            if (dealerTotal > 21) {
                return houseBust(dealerTotal);
            } else if (dealerTotal >= 17) {
                return compareHands(playerTotal, dealerTotal);
            }
        }
        return compareHands(playerTotal, dealerTotal);
    }    
    
    /**
     * Reveals the first house card, and hides card back
     */
    function houseReveal() {    
        houseCardsRef[0].style.display = "none";
        houseCardsRef[1].style.left = "15px";
        houseCardsRef[1].style.display = "inline";
    }

    /**
     * Compares final hand values
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
     * calls for losses tally to increase by 1
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
     * Calls for wins tally to increase by 1 
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
     * Player bust message
     * Calls for losses tally to increase by 1
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
     * Displays message for a draw in hand values
     * calls for draw tally to increase by 1
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
     * Calls for win tally to increase by one
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
     * Calls for win tally to increase by one
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
     * calls for losses tally to be increase by 1
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
    /**
     * Makes card table visible, hides all other elements
    */
    function displayGameTable() {
        mainMenuRef.style.display = "none";
        gameTableRef.style.display = "flex";
        gameTableRef.style.justifyContent = "space-evenly";
        gameTableRef.style.flexDirection = "column";
        gameTableRef.style.alignItems = "center";
        menuBtnRef.style.display = "block";
    }    
    
    /**
     * Make amin menu visible and hides all other modals
     */
    function accessMenu() {
        gameTableRef.style.display = "none";
        mainMenuRef.style.display = "block";
        menuBtnRef.style.display = "none";
        optionsContainerRef.style.display ="none";
        responsibleContainerRef.style.display = "none";
        rulesContainerRef.style.display = "none";
    }
    
    /**
     * Initiates each game round
     */
    function reDeal() {
        canPlay = true;
        modalSurroundRef.style.display = "none";
        firstTwoCards();    
    }

    /**
     * Clears the scoreboard
     */
    function clearTally() {
        winTallyRef.innerHTML = 0;
        loseTallyRef.innerHTML = 0;
        drawTallyRef.innerHTML = 0;
    }

    /**
     * Draws a card for the user 
     */
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
        ruleHeading.forEach (ruleBtn => {
            ruleBtn.addEventListener("click", function () {
                if (this.nextElementSibling.style.maxHeight) {
                    hideRulePanels();
                } else {
                    extendRulePanel(this);
                }
            });
        });
    } 

    /**
    * Allows the game rules menu to extend
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
    * Hides all game rules segments when a new one is open
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
     * hides main menu and reveals the responsible gaming sub menu
     */
    function responsibleGamingMenu() {
        mainMenuRef.style.display = "none";
        responsibleContainerRef.style.display = "block";
    }

    /**
     * give functionality to the color theme selection buttons
     */
    function colorTheme(){
        colorThemeRef.forEach (theme => {
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
        });
    }

    /**
     * Removes active theme when new one selected
     */
    function removeActiveTheme() {
        for (let i = 0; i < colorThemeRef.length; i++) {
            console.log("first" +colorThemeRef[i].classList);
            colorThemeRef[i].classList.remove("active-theme");
            console.log("second" + colorThemeRef[i].classList);
        } 
    }

    /**
     * Set Blue color Theme
     */
    function blueTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#87CEFA";
        resultSurroundRef.style.backgroundColor = "#4682B4";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#00008B";
        }
    }

    /**
     * Set green color Theme
     */
    function greenTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#98FB98";
        resultSurroundRef.style.backgroundColor = "#008080";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#006400";
        }
    }

    /**
     * Set purple color Theme
     */
    function purpleTheme(target) {
        removeActiveTheme();
        target.classList.add("active-theme");
        document.body.style.backgroundColor = "#FFE0E5";
        resultSurroundRef.style.backgroundColor = "#312b50";
        for (let i = 0; i < mainWindowRef.length; i++) {
            mainWindowRef[i].style.backgroundColor = "#300640";
        }
    }
});
