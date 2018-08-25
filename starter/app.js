    /*
    GAME RULES:

    - The game has 2 players, playing in rounds
    - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
    - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
    - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
    - The first player to reach 100 points on GLOBAL score wins the game

    */
    var scores, roundScores, activePlayer, gamePlaying, previousSix, winLimit; 
    // that is d#larations (DON'T need to define them yet)
    // Those are GLOBAL s#ope vars


    //state variable tells the #ondition of the system
    // in our #ase state var. will tell if game is playing (a#tive)
    //or not
   

    winLimit = 20;
    
    init();
    /*
    MOVED TO F-ION init()

    scores = [0,0]; //array for s#ores

    //variable for the round s#ore. It is enough to have one value #oz we have jus one round s#ore at the time
    roundScore = 0;

    //variable whi#h will tell whi'h is the #urrent a#tive player
    activePlayer = 0; // 0 - is first pl. and 1 is se#ond pl.


    // need a rand. nr. for a di#e. We will use Math obj.
    // Math obj. is JS built in obj. thaít has a lot of properties and
    // methods for mathemati#al #onstants and f-ions
    //dice = Math.floor(Math.random()*6)+1;


    */



    ////////////////////////////
    ////////////////////////////
    // DOM MANIPULATION
    //
    //The obj. that will give us a##ess to the DOM is the do#ument obj.

    //eg.

    //document.querySelector('#score-0') 
    // it lets us sele#t the stuff //exa#tly the same way that we do in #ss, only diferen#e is that //it sele#ts the first element, that it finds


    // I 
    // in this #ase ve are SETTING some values
    //document.querySelector('#current-' + activePlayer).textContent = dice; // be#ause of 'type coertion' '#current-' + activePlayer will work



    //if we want to put some HTML also in the sele#ted element, we should use 'innerHTML' method instead of 'textContent'.

    /*
    // II
    // in this #ase ve are SETTING some values
    document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' ; //...= should be some html in bra#kets ''
    // <em>' + dice + '</em>' --> using 'em' element around di#e value it will make Itali# text
    */


    /*
    Dom manipulation was used, whi#h means that we used querySele#tor method here to #hange values in elements of our web page.
    */




    /* MOVED TO init()

    // as well we #an use querySele#tor to #hange #ss of some element.
    //eg.

    document.querySelector('.dice').style.display = 'none'; // we will a##ess di#e immage by its #lass and will make it to net be shown
    // to sele#t the #lass we will use '.' sele#tor.

    //document.querySelector('.dice') -->that gives us sele#tion, but to #hange the style we will use style method and the #ss proprty that we want to #hange.


    // we #ould have use .querySele#tor() meth. instead
    //another method to a##ess html from JS file and modify the #ontent
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // getElementById() is bit faster than querySele#tor
    
    */




    /////////////////////////
    ///////////////////////////
    // SETTING UP EVENT HANDLER

    //first need to sele#t element in whi#h 
    //the event presumably will happen
    // So in this #ase it will be button 
    //where we will roll the di#e

    /*
    function btn(){
        //do something
    }


    // first we sele#t something and then we do something with that sele#tion

    // I
    //document.querySelector('.btn-roll').addEventListener('click', btn);
    // it takes the type of avent and the f-ion that this event listener is going to #all. btn f-ion in this #ase is #alled 'the #allba#k f-ion'.
    */


    // II
    // ANONYMOUS F-ION -  is a f. that doesn't have a name, so it #an't be reused

    // EVENT LISTENER ON BUTTON 'roll'
    document.querySelector('.btn-roll').addEventListener('click', function() {
        
        // using GAME STATE VARIABLE
        // 'ROLL' button will be a#tive only when gamePlaying==true
        if(gamePlaying) {
        // IT SHOULD HAPPEN ONLY WHEN GAME IS A#TIVE IE. gamePlaying
        // == true

        //1. Rand. nr.
        var dice = Math.floor(Math.random()*6)+1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice'); // in this way we dont need to make the sele#tion over again
        diceDOM.style.display = 'block'; 
        // we need to bring the style ba#k to blo#k(???) #oz we did:
        // document.querySelector('.dice').style.display = 'none'; --> we hid it
        // 
        //in #ss we want to display it as a "blo#k"
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round s#ore if the rolled nr. was NOT 1
        if(dice !== 1){ // != operator performs type #oertion(??), AND !== doesn not do type #oertion
            //Add s#ore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            if (dice == 6){
                if(previousSix){
                       // absolute score should be 0
                        scores[activePlayer] = 0; // when two 6es in row the total score becomes 0
                        nextPlayer();
                
            } else {
                previousSix = true; // flag indicates that first '6' has occured
            }
                
                
                
            }
         
            
        } else {
        
            nextPlayer();
            
            /*
            //Next player
            // if #urrent player is 0, then it should be #hanged to 1 
            //and vi#e versa.

            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //we will use TERNARY OPERATOR:
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            //meaning: if layer 0, then a#tivePlayer should be 1,else (':' indi#ates else #ase) a#tivePlayer should be 0.

            // it is SIMPLER AND #LEANER than if-else

            roundScore = 0; // #ounting of round s#ore starts from 0
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';

            //TODO: AS SOON AS PLAYER #HANGES, WE HAVE TO REMOVE //'active' #lass from player-0-pannel in html
            // and add it to the player-1-pannel
            // IN JS WE #AN ADD AND REMOVE #LASSES OF HTML FILE:

            //using querySele#tor #oz now we are sele#ting #lass
            //document.querySelector('.player-0-panel').classList.remove('active'); // need to pass the name of the #lass that we want to remove

            //document.querySelector('.player-1-panel').classList.add('active'); // spe#ify the #lass that we want to add


            //!!! toggle 111111111111111
            // 'toggle' removes 'a#tive' #lass if it is pressent and adds if it is missing
            document.querySelector('.player-0-panel').classList.toggle('active');

            document.querySelector('.player-1-panel').classList.toggle('active');

            // when player rolls 1 the di#e should be HIDDEN
            //so when it is the next player's turn, we don't have any //di#e displayed
            document.querySelector('.dice').style.display = 'none';
            */


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
    
    //setting first pl. as a#tive one #oz in the beginning first is always a#tive
    // if pl0 was the a#tive player (before pressing 'new game')then in this #ase 'a#tive' #lass would be alredy added and if we will #all following line, THEN ANOTHER 'a#tive' #lass would be added
    document.querySelector('.player-0-panel').classList.add('active');
    
}


// listener for adding winning score limit
document.querySelector('.btn-addscore').addEventListener('click', function() {
   var limit = document.getElementById("myText").value;
    
    document.getElementById("demo").innerHTML ='The new winning score limit is: ' + limit;
    winLimit = limit;
    
});













    // demonstrates DOM manipulation just for READING some values
    //var x = document.querySelector('#score-0').textContent;
    //console.log(x);





















