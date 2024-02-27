let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber>= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }

  return computerMove;
}

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {
// };
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove, pickComputerMove());
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop Auto Play';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playgame('rock', pickComputerMove());
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playgame('paper', pickComputerMove());
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playgame('scissors', pickComputerMove());
});

document.body.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'r'){
    playgame('rock', pickComputerMove());
  } else if (event.key === 'p'){
    playgame('paper', pickComputerMove());
  } else if (event.key === 's') {
    playgame('scissors', pickComputerMove());
  } else if (event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace'){
    
  }
});

document.querySelector('.js-reset-score').addEventListener('click', () => {
  displayResetConfirmation();
});

function displayResetConfirmation() {
  let html = 'Are you sure you want to reset the score? <button class="yes-reset-button js-reset-yes">Yes</button> <button class="no-reset-button js-reset-no">No</button>'
  document.querySelector('.reset-score-confirmation').innerHTML = html;

  document.querySelector('.js-reset-yes').addEventListener('click', () => {
    resetScore();
    document.querySelector('.reset-score-confirmation').innerHTML = '';
  });
  
  document.querySelector('.js-reset-no').addEventListener('click', () => {
    document.querySelector('.reset-score-confirmation').innerHTML = '';
  });
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay();
});

function playgame(playerMove, computerMove) {
let result = '';

if (computerMove === playerMove){
  result = 'Tie.';
} else if(playerMove === 'rock'){
  if (computerMove === 'paper'){
  result = 'You lose.';
  }else if (computerMove === 'scissors'){
    result = 'You win.';
  }
} else if (playerMove === 'paper'){
  if (computerMove === 'scissors'){
  result = 'You lose.';
  }else if (computerMove === 'rock'){
    result = 'You win.';
  }
} else if (playerMove === 'scissors'){
  if (computerMove === 'rock'){
  result = 'You lose.';
  }else if (computerMove === 'paper'){
    result = 'You win.';
  }
}

if (result === 'You win.') {
  score.wins += 1;
} else if (result === 'You lose.') {
  score.losses += 1;
} else {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
  .innerHTML = result;

document.querySelector('.js-moves')
.innerHTML = `You 
<img src="/../images/${playerMove}-emoji.png" class="move-icon" alt="">
<img src="/../images/${computerMove}-emoji.png" class="move-icon" alt="">
Computer`;

//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}