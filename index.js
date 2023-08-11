//button
let btn = document.querySelector('.btn');
let game = document.querySelector('.players');
let header = document.querySelector("header h1");
document.addEventListener('click' ,function(e){
    if(e.target.classList.contains('btn')){
        btn.style.opcity="0";
        setTimeout(function(){
            btn.style.display="none"
            game.style.display="flex";
            setTimeout(function(){
                game.style.opacity="1";
                header.style.display='block';
            },500)
        },10)
    }   
});



let userScore = 0;
let computerScore = 0;
let previousPlayerChoice = null; // To keep track of the previous user choice
let previousComputerChoice = null; // To keep track of the previous computer choice
let usercount = document.querySelector('.player .score .count');
let robotcout = document.querySelector('.computer .score .count');

function resetChoiceBackgrounds() {
    document.querySelectorAll('.computer .coice').forEach(choice => {
        choice.style.background = "white";
    });
}

function getComputerChoice() {
    if (previousComputerChoice !== null) {
        resetChoiceBackgrounds();
        previousComputerChoice.style.background = "white"; // Reset the background color of the previous computer choice
    }
    
    let arr = ["rock", "paper", "scissors"];
    let name = Math.floor(Math.random() * arr.length);

    let robotChoiceElement = document.querySelector(`.computer .coice[data-robot="${arr[name]}"]`);
    let robotChoice = robotChoiceElement.getAttribute('data-robot');

    robotChoiceElement.style.background = "blue";
    previousComputerChoice = robotChoiceElement; // Update the previousComputerChoice to the current choice

    return robotChoice;
}

function playerSelection(e) {
    if (previousPlayerChoice !== null) {
        previousPlayerChoice.style.background = "white"; // Reset the background color of the previous choice
    }
    e.style.background = "red";
    previousPlayerChoice = e; // Update the previousPlayerChoice to the current choice

    let userChoice = e.getAttribute("data-name");
    return userChoice;
}

document.querySelectorAll('.coice').forEach(choice => {
    choice.addEventListener('click', (event) => {
        let playerChoice = playerSelection(event.currentTarget);
        let computerChoice = getComputerChoice();
        playRound(playerChoice, computerChoice);
    });
});


let again = document.querySelector('.btn-restart')

let winner = document.querySelector(".winner");

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        console.log("It's a tie!");
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        console.log("Player wins!");
        userScore++;
        usercount.innerHTML = userScore;
    } else {
        console.log("Computer wins!");
        computerScore++;
        robotcout.innerHTML = computerScore;
    }

    if (userScore === 5) {
        console.log('Player wins the game');
        const playerFinalScore = userScore;
        const computerFinalScore = computerScore;

        setTimeout(function() {
            game.style.display = "none";
            again.style.display = "block";
            winner.innerHTML = `
                <img src="images/man-avatar.png">
                <h3>you win <span class="robotscore">${playerFinalScore}</span>: <span class="userscore">${computerFinalScore}</span>!</h3>`;
            winner.style.display = "contents";
            setTimeout(function() {
                game.style.opacity = "0";
                header.style.display = 'block';
            }, 1000);
            previousPlayerChoice.style.background = "white"; // Reset user's choice
        }, 10);
        clearData();
    } 
    else if (computerScore === 5) {
        console.log("Computer wins the game");
        const playerFinalScore = userScore;
        const computerFinalScore = computerScore;

        setTimeout(function() {
            again.style.display = "block";
            game.style.display = "none";
            winner.innerHTML = `
                <img src="images/robot.png">
                <h3>computer wins <span class="robotscore">${computerFinalScore}</span>: <span class="userscore">${ playerFinalScore}</span>!</h3>`;
            winner.style.display = "contents";
            setTimeout(function() {
                game.style.opacity = "0";
                header.style.display = 'block';
            }, 1000);
            previousPlayerChoice.style.background = "white"; // Reset user's choice
        }, 10);
        clearData();
    }
}
function clearData(){
    userScore=0;
    computerScore=0;
    usercount.innerHTML = userScore;
    robotcout.innerHTML = computerScore;

}
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-restart')) {
        setTimeout(function () {
            again.style.display = "none";
            game.style.display = "flex";
            winner.style.display = "none"; // Hide the robotwin element
            setTimeout(function () {
                game.style.opacity = "1";
                header.style.display = 'block';
            }, 1000);
        }, 10);

        // Reset the game state
        userScore = 0;
        computerScore = 0;
        resetChoiceBackgrounds(); // Reset choice backgrounds
        previousComputerChoice = null;
    }
});

