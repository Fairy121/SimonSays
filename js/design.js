let sounds = [
  {
    name: "red",
    id: 0,
    url: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" // 0
  },
  {
    name: "blue",
    id: 1,
    url: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3" // 1
  },
  {
    name: "yellow",
    id: 2,
    url: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" // 2
  },
  {
    name: "green",
    id: 3,
    url: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" // 3
  }
];

// get required dom elements
let container = document.querySelector(".simon-container");
let gameGrid = document.querySelector(".game-grid");
let simonBtns = document.querySelectorAll(".simon-box");
let roundNum = document.querySelector(".round-num");

let startBtn = document.querySelector(".start-game");
let gameOverText = document.querySelector(".game-over");
let restart_game_btn = document.querySelector(".repeat-game");

let playerSeq = [],
  computerSeq = [0];
let i = 0;
let round = 1;
let currentInt;
let computerTurn = true;
let sqr;

// game over
function gameOver() {
  gameOverText.style.display = "block";
  container.style.opacity = 0.2;
}

function startGame() {}
// check whos turn it is
function CheckTurn() {
  container.style.display = "grid";
  startBtn.style.display = "none";
  if (computerTurn) {
    playSequence(computerSeq);
  } else {
    gameGrid.addEventListener("click", playersTurn);
  }
}

// function to add and remove class
function AddClass(x) {
  x.classList.add("selected");

  setTimeout(() => {
    x.classList.remove("selected");
  }, 500);
}
function playSequence(arr) {
  i = -1;
  currentInt = setInterval(() => {
    if (i < arr.length - 1) {
      i++;

      let sqrName = sounds[arr[i]].id;
      let url = sounds[arr[i]].url;
      sqr = simonBtns[sqrName];

      AddClass(sqr);

      let simonAudio = new Audio(url);
      simonAudio.play();

      if (i == arr.length - 1) {
        clearInterval(currentInt);
        computerTurn = false;
        CheckTurn();
      }
    }
  }, 1000);
}

function playersTurn(e) {
  let btnId = Number(e.target.dataset.id);
  let playerSqr = simonBtns[btnId];
  let playerAudio = new Audio(sounds[btnId].url);
  playerAudio.play();
  playerSeq.push(btnId);
  AddClass(playerSqr);

  let compare = CompareSequences(playerSeq, computerSeq);
  // check if player is right
  if (playerSeq.length === computerSeq.length) {
    if (compare) {
      computerSeq.push(Math.floor(Math.random() * sounds.length));
      computerTurn = true;
      playerSeq = [];
      round += 1;
      roundNum.textContent = round;

      CheckTurn();
    }
  }

  if (!compare) {
    gameOver();
  }
}
// funct to compare user and computer
function CompareSequences(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
// function restart everything to beginning
function RestartGame() {
  computerSeq = [0];
  playerSeq = [];
  computerTurn = true;

  round = 1;
  roundNum.innerHTML = round;

  gameOverText.style.display = "none";
  container.style.opacity = "1";

  CheckTurn();
}

// start the game by pressingg the start btn and making game board visible
startBtn.addEventListener("click", CheckTurn);

// if restart btn is pressed, go back to start game page
restart_game_btn.addEventListener("click", () => {
  RestartGame();
});
