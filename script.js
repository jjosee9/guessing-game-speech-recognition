const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

//create a random number for the game
function getRandomNumber(){
    return Math.floor(Math.random()*100) + 1;
}
console.log('Number:', randomNum);

//initialize a speech recognition object
 window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create a variable to work with the Speech Recognition Object
let recognition = new window.SpeechRecognition();

//Start the game 
recognition.start();

//listen for the result event
recognition.addEventListener('result', onSpeak);

//create onSpeak function
function onSpeak(e){
    
    const msg = e.results[0][0].transcript;
    console.log(msg)

 //writeMessage(msg);
 checkNumber(msg);
}

//display msg to the screen
function writeMeassage(msg){
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class="box">${msg} </span>`
    ;
}


//check the msg against the number
function checkNumber(msg){
       const num = +msg;
       //check if a valid number
       if (Number.isNaN(num)){
           msgEl.innerHTML += '<div> That is not a valid number </div>';
           return;
       }
       //Check if number is in range
       if(num >100 || num< 1){
           msgEl.innerHTML += '<div> Your number must be between 1-100 </div>';
           return;
       }
       //Check number against Randomly generated number
       if (num === randomNum){
           document.body.innerHTML = `
           <h2>Congrats! You guessed the number <br></br>
           It was ${num} </h2>
           <button class="play-again" id="play-again"> Play again </button>`
           ;
       } else if (num > randomNum){
           msgEl.innerHTML += '<div> GO LOWER </div>';
       }else {
        msgEl.innerHTML += '<div> GO HIGHER </div>';
       }
}

//Allow the user to continue to guess - End Speech Recognition 
recognition.addEventListener('end', ()=> recognition.start());

//make the play button work
ducument.body.addEventListener('click', e =>{
    if (e.target.id == 'play-again'){
        window.location.reload();
    }
});