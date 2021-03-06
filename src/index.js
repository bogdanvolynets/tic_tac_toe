import './styles.scss';

// Create Player object(X, O) using factory function
const Player = (sign) => {
    return { sign };
}

const gameBoard = (() => {
    // Create array that immitates tic tac toe board
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const getBoard = () => board;

    // Create board with empty fields only
    const findEmptyFields = () => board.filter(e => e !== 'O' && e !== 'X');

    // Assign elements to the board array
    const setField = (index, sign) => {
        board[index] = sign;
    }

    // Get value from the board array
    const getField = (index) => board[index];

    // Select random empty field and return its value
    // returned value is field index in original board
    const getAiField = () => {
        const aiBoard = findEmptyFields();
        const randomNumber = Math.floor(
            Math.random() * aiBoard.length
        );
        return aiBoard[randomNumber];
    }

    // clear board array
    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = i;
        }
    }

    return { getBoard, setField, getField, findEmptyFields, getAiField, reset };
})();

const displayController = (() => {
    const cells = [...document.querySelectorAll('#gameBoard div')];
    const playersMove = document.querySelector('#playersMove');
    const restartBtn = document.querySelector('#restart');

    // on click check if field is empty and if game is not over
    cells.forEach(e => e.addEventListener('click', () => {
        if (e.textContent === '' && gameController.gameOver() === false) {
            e.textContent = gameController.getSign();

            // add placed sign to the board array
            gameBoard.setField(e.getAttribute('data-position'), e.textContent);

            // after players move check if game is not over
            checkForGameOver();

            // after check for game mode, if it's AI mode - AI will place its sign
            determineMove();
        }

        // set alert if game is still going but selected field was already taken
        else if (gameController.gameOver() === false) { 
            alert('This cell is already taken, please select another one'); 
        }

        // if game is over and user tries to click on field - set alert to restart the game
        else { 
            alert(`Game is Over, please restart`); 
        }
    }));

    // check the gamemode, if it's AI mode - AI makes its move, 
    const determineMove = () => {
        if ((gameController.gameOver() === false && gameMode.getGameMode() === 'ai') 
        || (gameMode.getGameMode() === 'minimax' && gameBoard.findEmptyFields().length === 9)) { 

            // set AI's sign and get empty field that will be choosen
            const aiSign = gameController.getSign(); 
            const aiField = gameBoard.getAiField();

            // change DOM content and place new value into board array
            cells[aiField].textContent = aiSign;
            gameBoard.setField(aiField, aiSign);

            // check for gameover after AI finishes move
            checkForGameOver();
        }

        // minimax mode
        else if (gameController.gameOver() === false && gameMode.getGameMode() === 'minimax') { 
            const minimaxSign = gameController.getSign(); 
            const minimaxField = aiController.minimax(gameBoard.getBoard(), minimaxSign);

            cells[minimaxField.index].textContent = minimaxSign;
            gameBoard.setField(minimaxField.index, minimaxSign);

            checkForGameOver();
        }
    }

    // set text that tells which player moves right now
    const setPlayersMoveText = player => {
        playersMove.textContent = `Player ${player}'s Turn`;
    }

    const checkForGameOver = () => {
        if(gameController.gameOver() === true) {
            playersMove.textContent = `Player ${gameController.getWinnerSign()} Has Won`;
        } else if (gameController.gameOver() === "tie") {
            playersMove.textContent = `That's a tie`;
        }
    }

    const restartGame = () => {
        gameBoard.reset();
        gameController.setNewRound();
        playersMove.textContent = `Player X's Turn`;
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = '';
        }

        // if it's AI mode and AI plays X - AI makes its move
        if (aiController.aiMovesFirst()) {
            determineMove();
        }
    }

    restartBtn.addEventListener('click', restartGame);

    return { setPlayersMoveText, restartGame };
})();

const gameController = (() => {
    const playerOne = Player('X');
    const playerTwo = Player('O');
    let round = 1;
    let currentSign = null;
    let winnerSign = null;
    let isWin = false;

    const getSign = () => {
        if (round % 2 === 0) {
            currentSign = playerTwo.sign;
            displayController.setPlayersMoveText(playerOne.sign);
        }
        else {
            currentSign = playerOne.sign;
            displayController.setPlayersMoveText(playerTwo.sign);
        }
        setNextRound();
        return currentSign;
    }

    const getWinnerSign = () => winnerSign;

    const setNextRound = () => round++;

    const setNewRound = () => round = 1;

    // we take 3 board fields if each field has same value then game was won
    // we also set winners sign
    const checkWin = (cell1, cell2, cell3) => {
        if (gameBoard.getField(cell1) === gameBoard.getField(cell2) && 
            gameBoard.getField(cell1) === gameBoard.getField(cell3)) {
            winnerSign = gameBoard.getField(cell1);
            return true;
        }
        else { 
            return false;
        }
    }

    // we call checkWin function and pass field indexes into it
    // if checkWin returns true - player won
    // if it was final round and nobody won than it's a tie
    const gameOver = () => {
        isWin = checkWin(0,1,2)
            || checkWin(3,4,5)
            || checkWin(6,7,8)
            || checkWin(0,3,6)
            || checkWin(1,4,7)
            || checkWin(2,5,8)
            || checkWin(0,4,8)
            || checkWin(6,4,2);
        if (round === 10 && isWin === false) {
            isWin = "tie";
        }
        return isWin;
    }

    return { getSign, getWinnerSign, setNewRound, gameOver };
})();

const gameMode = (() => {
    const gameModes = [...document.querySelectorAll('#gameMode')];
    const signsDOM = document.querySelector('#signs');
    let mode = 'human';
    
    // on button click set gamemode to the selected one
    // also display sign selection if gamemode is ai
    gameModes.forEach(e => e.addEventListener('click', () => {
        mode = e.getAttribute('data-mode');
        if (mode === 'ai' || mode === 'minimax') {
            signsDOM.classList.add('signs__active');
        } else {
            signsDOM.classList.remove('signs__active');
        }
        displayController.restartGame();
    }));

    const getGameMode = () => mode;
    
    return { getGameMode };
})();

const aiController = (() => {
    const xSign = document.querySelector('#xSign');
    const oSign = document.querySelector('#oSign');

    // set default signs
    let huSign = 'X';
    let aiSign = 'O';
    let aiMove = false;

    const aiMovesFirst = () => aiMove;

    xSign.addEventListener('click', () => {
        huSign = 'X';
        aiSign = 'O';
        aiMove = false;
        displayController.restartGame();
    });

    oSign.addEventListener('click', () => {
        huSign = 'O';
        aiSign = 'X';
        aiMove = true;
        displayController.restartGame();
    });

    const minimax = (newBoard, player) => {
        // available spots
        const availSpots = gameBoard.findEmptyFields();

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (gameController.gameOver() === true && gameController.getWinnerSign() === huSign) {
            return { score: -10 };
        }
        else if (gameController.gameOver() === true && gameController.getWinnerSign() === aiSign) {
            return { score: 10 };
        }
        else if (availSpots.length === 0) {
            return { score: 0 };
        }

        // an array to collect all the objects
        const moves = [];

        // loop through available spots
        for (let i = 0; i < availSpots.length; i++) {
            // create an object for each and store the index of that spot that was stored as a number in the object's index key
            const move = {};
            move.index = newBoard[availSpots[i]];

            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;

            // if collect the score resulted from calling minimax on the opponent of the current player
            if (player === aiSign) {
                const result = minimax(newBoard, huSign);
                move.score = result.score;
            }
            else {
                const result = minimax(newBoard, aiSign);
                move.score = result.score;
            }

            // reset the spot to empty
            newBoard[availSpots[i]] = move.index;

            // push the object to the array
            moves.push(move);
        }
        
        // if it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove;

        if (player === aiSign){
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        } else {

        // else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++){
            if (moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
            }
        }

        // return the chosen move (object) from the array to the higher depth
        console.log(moves[bestMove]);
        return moves[bestMove];
    }

    return { aiMovesFirst, minimax }
})();