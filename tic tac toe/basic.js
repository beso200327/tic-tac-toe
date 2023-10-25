let playerTurn = true;
    let computerMoveTimeout = 0;
    
    const gameStatus = {
    MORE_MOVES_LEFT: 1,
    HUMAN_WINS: 2,
    COMPUTER_WINS: 3,
    DRAW_GAME: 4
    };
    
    window.addEventListener("DOMContentLoaded", domLoaded);
    
    function domLoaded() {
    // Setup the click event for the "New game" button
    const newBtn = document.getElementById("newGameButton");
    newBtn.addEventListener("click", newGame);
    
    // Create click-event handlers for each game board button
    const buttons = getGameBoardButtons();
    for (let button of buttons) {
    button.addEventListener("click", function () { boardButtonClicked(button); });
    }
    
    // Clear the board
    newGame();
    }
    
    // Returns an array of 9 <button> elements that make up the game board. The first 3
    // elements are the top row, the next 3 the middle row, and the last 3 the
    // bottom row.
    function getGameBoardButtons() {
    return document.querySelectorAll("#gameBoard > button");
    }
    
    function checkForWinner() {
    const buttons = getGameBoardButtons();
    
    // Ways to win
    const possibilities = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
    ];
    
    // Check for a winner first
    for (let indices of possibilities) {
    if (buttons[indices[0]].innerHTML !== "" &&
    buttons[indices[0]].innerHTML === buttons[indices[1]].innerHTML &&
    buttons[indices[1]].innerHTML === buttons[indices[2]].innerHTML) {
    // Found a winner
    if (buttons[indices[0]].innerHTML === "X") {
    return gameStatus.HUMAN_WINS;
    }
    else {
    return gameStatus.COMPUTER_WINS;
    }
    }
    }
    
    // See if any more moves are left
    let foundEmpty = false;
    for (let button of buttons) {
    if (button.innerHTML !== "X" && button.innerHTML !== "O") {
    return gameStatus.MORE_MOVES_LEFT;
    }
    }
    
    // If no winner and no moves left, then it's a draw
    return gameStatus.DRAW_GAME;
    }
    
    function newGame() {
    // TODO: Complete the function
    clearTimeout();
    getGameBoardButtons().forEach(i =>{
        i.removeAttribute("disabled");
        i.removeAttribute("class");
        i.innerHTML = "";
    })
    playerTurn = true;
    document.getElementById("turnInfo").innerHTML = "your turn"
    }
    
    function boardButtonClicked(button) {
    // TODO: Complete the function
        if(playerTurn == true){
            button.innerHTML = "X";
            button.classList.add("x");
            button.setAttribute("disabled", "");
            switchTurn();
        }
    }
    
    function switchTurn() {
    // TODO: Complete the function
    getGameBoardButtons();
    var checkGame = checkForWinner();
    if(checkGame == gameStatus.MORE_MOVES_LEFT && playerTurn === true){
        playerTurn=false;
        document.getElementById("turnInfo").innerHTML ="Computer's Turn";
        setTimeout(() => {
            makeComputerMove();
        }, 1000)
    }
    else if(checkGame == gameStatus.MORE_MOVES_LEFT && playerTurn === false){
        playerTurn= true;
        document.getElementById("turnInfo").innerHTML ="Your Turn";
    }
    else if(checkGame == gameStatus.HUMAN_WINS){
        document.getElementById("turnInfo").innerHTML ="You Win";
        for (let button of buttons) {
            button.setAttribute("disabled", "")
            }
    }
    else if(checkGame == gameStatus.COMPUTER_WINS){
        document.getElementById("turnInfo").innerHTML ="Computer Wins";
        for (let button of buttons) {
            button.setAttribute("disabled", "")
            }
    }
    else{
        document.getElementById("turnInfo").innerHTML ="Draw Game";
        for (let button of buttons) {
            button.setAttribute("disabled", "")
            }
    }
    }
    
    function makeComputerMove() {
        const buttons = getGameBoardButtons();
        const randomNum = Math.floor(Math.random() * 9);
        const button = buttons[randomNum];
        if (button.innerHTML !== "") {
          makeComputerMove();
          return;
        }
        button.innerHTML = "O";
        button.classList.add("o");
        button.setAttribute("disabled", "");
        switchTurn();
    }