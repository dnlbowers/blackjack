// document.addEventListener('DOMContentLoaded', function(){
//     let playerHand = []
//     let dealerHand = [];

//     initialPlayerHand(playerHand)
//     initialDealerHand(dealerHand);
    

//     let playerTotal = checkHandValue(playerHand);
//     let dealerTotal = checkHandValue(dealerHand);
//     console.log(playerTotal);
//     console.log(dealerTotal);

//     addHit(playerHand);
//     stand(dealerHand);
// })

// function initialDealerHand(dealerHand) {
    
    

//     for (i = 0; i < 2; i++){
                   
//          dealerHand.push(dealCard('dealer'));

//     } 
    
//     return dealerHand
// }

// function initialPlayerHand(playerHand) {
    
    

//     for (i = 0; i < 2; i++){
                   
//          playerHand.push(dealCard('player'));

//     } 
    
//     return playerHand;

// }

// function addHit(playerHand) {
//     document.getElementById('hit-btn').addEventListener('click', function(){
//     playerHand.push(dealCard('player'))
// })
// }

// function stand(dealerHand) {
//     document.getElementById('stand-btn').addEventListener('click', function(){
//         document.getElementById('hit-btn').removeEventListener('click', dealCard);
//         // let playerTotal = checkHandValue(playerHand);
//         // let dealerTotal = checkHandValue(dealersHand);
//         // console.log(playerTotal);
//         // console.log(dealerTotal);    
//     })
// }