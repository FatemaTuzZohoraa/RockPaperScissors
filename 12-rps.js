let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    loss: 0,
    tie: 0
};
updateScore();

function reset(){
    score.win=0;
    score.loss=0;
    score.tie=0;
    localStorage.removeItem('score');
    updateScore();
    document.querySelector('.res').innerHTML = ' ';
    document.querySelector('.move').innerHTML = ' ';
    isAutoPlaying=true;
    autoPlay();
}


let isAutoPlaying=false;
let intervalId;
  
function autoPlay(){
  if(!isAutoPlaying){
    
    intervalId = setInterval(() => {
    const playerMove = computerPick();    
    playgame(playerMove);
  },1000)

    isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }

}

document.querySelector('.rockBtn')
.addEventListener('click', ()=>{
    playgame('Rock');
});

document.querySelector('.papBtn')
.addEventListener('click', ()=>{
    playgame('Paper');
});

document.querySelector('.sciBtn')
.addEventListener('click', ()=>{
    playgame('Scissors');
});

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playgame('Rock');
    }else if(event.key==='p'){
        playgame('Paper');
    }else if(event.key==='s'){
        playgame('Scissors');
    }
});


function playgame(playerMove) {
    const computerMove = computerPick();

    let result = "";
    if (playerMove === "Rock") {
        if (computerMove === "Rock") {
            result = "Tie!";
        } else if (computerMove === "Paper") {
            result = "You loose";
        } else if (computerMove === "Scissors") {
            result = "You win";
        }
       

    } else if (playerMove === "Paper") {
        if (computerMove === "Rock") {
            result = "You win";
        } else if (computerMove === "Paper") {
            result = "Tie!";
        } else if (computerMove === "Scissors") {
            result = "You loose";
        }

    } else if (playerMove === 'Scissors') {

        if (computerMove === 'Rock') {
            result = 'You loose';
        } else if (computerMove === 'Paper') {
            result = 'You win';
        } else if (computerMove === 'Scissors') {
            result = 'Tie!';
        }                
    }
    if(result === "You win"){
            score.win+=1;
        }else if(result === "You loose"){
            score.loss+=1;
        }else if(result === "Tie!"){
            score.tie+=1;
        }

        localStorage.setItem('score',JSON.stringify(score));

        updateScore();               

        document.querySelector('.res').innerHTML=`${result}`;
        
document.querySelector('.move').innerHTML=`You <img src="images/${playerMove}-image.png" class="move-icon">
<img src="images/${computerMove}-image.png" class="move-icon">
Computer`;

}

function updateScore(){
    document.querySelector('.score').innerHTML=`Win:${score.win} ,Losses:${score.loss}, Tie:${score.tie}`;
   
}

function computerPick() {
    const randomNumber = Math.random();
    let computerMove = "";
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = "Rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = "Paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = "Scissors";
    }
    return computerMove;
}