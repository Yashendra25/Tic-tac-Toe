/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game--status');
const statusDisplay_SorF = document.querySelector('.game--status-s-f');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();

//-------------------------------------2-----------------------------------
function handleCellPlayed(clickedCell, clickedCellIndex) {
        /*
          We update our internal game state to reflect the played move, 
         as well as update the user interface to reflect the played move
    */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer === "X") {
        clickedCell.style.color = "red";
    } else if (currentPlayer === "O") {
        clickedCell.style.color = "blue";
    }
    
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//-------------------------------------3-----------------------------------
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay_SorF.innerHTML = `Player ${currentPlayer} has won!`;
        statusDisplay_SorF.classList.remove('d-none', 'alert-info');
        statusDisplay_SorF.classList.add('alert-success');
        gameActive = false;
        return;
        }
    /* 
        We will check weather there are any values in our game state array 
        that are still not populated with a player sign
        */
        let roundDraw = !gameState.includes("");
        if (roundDraw) {
            statusDisplay_SorF.innerHTML = `Game ended in a draw!`;
            statusDisplay_SorF.classList.remove('d-none', 'alert-info');
            statusDisplay_SorF.classList.add('alert-warning');
            gameActive = false;
            return;
        }
        /*
        If we get to here we know that the no one won the game yet, 
        and that there are still moves to be played, so we continue by changing the current player.
        */
        handlePlayerChange();

}

//-------------------------------------1-----------------------------------
function handleCellClick(clickedCellEvent) {
        /*
        We will save the clicked html element in a variable for easier further use
        */    
        const clickedCell = clickedCellEvent.target;
        /*
        Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
        Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
        integer(number)
        */
            const clickedCellIndex = parseInt(
            clickedCell.getAttribute('data-cell-index')
            );
        /* 
        Next up we need to check whether the call has already been played, 
        or if the game is paused. If either of those is true we will simply ignore the click.
        */
            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }
        /* 
        If everything if in order we will proceed with the game flow
        */    
            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState.fill("");
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = ""; // Reset cell color
    });
    statusDisplay_SorF.classList.add('d-none');
    statusDisplay_SorF.classList.remove('alert-success', 'alert-warning');
    statusDisplay_SorF.classList.add('alert-info');
    statusDisplay_SorF.innerHTML = "";
    statusDisplay.innerHTML="";
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);