
    var scores, roundScore, activePlayer, gamePlaying, previousSix, winLimit; 

    winLimit = 20;
    
    init();

    document.querySelector('.btn-roll').addEventListener('click', function() {

        if(gamePlaying) {

        //1. Rand. nr.
        var dice = Math.floor(Math.random()*6)+1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice'); // in this 
        diceDOM.style.display = 'block'; 
 
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round s#ore if the rolled nr. was NOT 1
        if(dice !== 1){ 
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice == 6){
                if(previousSix){
                       // absolute score should be 0
                        scores[activePlayer] = 0; 
                        nextPlayer();
                
            } else {
                previousSix = true; 
            }
                
                
                
            }
         
            
        } else {
        
            nextPlayer();

        }
            
      }
    });





    // EVENTLISTENER on BUTTON 'HOLD'
    //will use anonymous f-ion
    document.querySelector('.btn-hold').addEventListener('click', function() {
        
    if(gamePlaying){
        
        
    //### add players #urrent s#ore to players global s#ore
    scores[activePlayer] += roundScore;


    //### Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        

    //### #he#k if player won the game
     if(scores[activePlayer] >= winLimit) {
         document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
         
         // a##essing #ss
         document.querySelector('.dice').style.display = 'none';
         
         // we will a##ess #ss and apply 'winner' #lass to the player that has won
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // adds winner #lass
         
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // removes 'a#tive' #lass
         
         gamePlaying = false; // indi#ates the end of the game
         
     } else{
         nextPlayer();
     }
        
    }
        
    });






function nextPlayer() {
    previousSix = false; // indicates that '6' has not occured
    
    document.querySelector('.dice').style.display = 'none'; // after hitting 'hold' di#e should be hidden 

    //!!! toggle 111111111111111
    // 'toggle' removes 'a#tive' #lass if it is pressent and adds if it is missing
    document.querySelector('.player-0-panel').classList.toggle('active'); // if p1 was a#tive it will be#ome 'passive' and vi#e versa

    document.querySelector('.player-1-panel').classList.toggle('active'); // if p2 was a#tive it will be#ome 'passive' and vi#e versa
        
    
     document.getElementById('current-' + activePlayer).textContent = '0'; // after pressing 'hold' previously a#tive player #urrent-s#ore are set to 0
        
    
    roundScore = 0; // zeroing round s#ore
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // #hanging #urrent player
    
}



// adding eventlistener for newgame button
document.querySelector('.btn-new').addEventListener('click', init); // passing init() f-ion ass parameter


function init() {
    scores = [0, 0];
    previousSix = false;
    activePlayer = 0;
    roundScore = 0;

    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';  
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';  
    
    document.querySelector('.player-0-panel').classList.remove('winner'); // adds winner #lass
    // even IF THE #LASS IS NOT IN ''THERE'', WE STILL AN #ALL REMOVE METHOD
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    
    //SIN#E WE DON'T KNOW WHI#H PLAYER IS A#TIVE WE WILL REMOVE 'A#TIVE' #LASS FROM BOTH PL.
    document.querySelector('.player-0-panel').classList.remove('active');
    
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    
}


// listener for adding winning score limit
document.querySelector('.btn-addscore').addEventListener('click', function() {
   var limit = document.getElementById("myText").value;
    
    document.getElementById("demo").innerHTML ='The new winning score limit is: ' + limit;
    winLimit = limit;
    
});















