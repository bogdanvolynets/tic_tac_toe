import './styles.scss';

// Create Player object(X, O) using factory function
const Player = (sign) => {
    return { sign };
}


const gameBoard = (() => {
    // Create array that immitates tic tac toe board
    const board = ['','','','','','','','',''];

    // Assign elements to the board array
    const setField = (index, sign) => {
        board[index] = sign;
    }

    // Get value from the board array
    const getField = (index) => board[index];

    // Create random number from 0 to 8,
    // return array item(board cell) with index of this number, 
    // check if its empty, if not repeat function
    // if empty - return this cell
    const getAiField = () => {
        const randomNumber = Math.floor(
            Math.random() * 9
        );

        return board[randomNumber] !== '' ? getAiField() : randomNumber;
    }

    // replace board array items with empty strings (clear board)
    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { setField, getField, getAiField, reset };
})();

const displayController = (() => {
    const cells = [...document.querySelectorAll('#gameBoard div')];
    const playersMove = document.querySelector('#playersMove');
    const restartBtn = document.querySelector('#restart');
    
    cells.forEach(e => e.addEventListener('click', () => {
        if (e.textContent === '' && gameController.gameOver() === false) {
            e.textContent = gameController.getSign();
            gameBoard.setField(e.getAttribute('data-position'), e.textContent);
            checkForGameOver();
            determineMove();
        }
        else if (gameController.gameOver() === false) { 
            alert('This cell is already taken, please select another one'); 
        }
        else { 
            alert(`Game is Over, please restart`); 
        }
    }));

    const determineMove = () => {
        if (gameMode.getGameMode() === 'ai' && gameController.oddRound() === false) { 
            const aiSign = gameController.getSign(); 
            const aiField = gameBoard.getAiField();

            cells[aiField].textContent = aiSign;
            gameBoard.setField(aiField, aiSign);
            checkForGameOver();
        }
    }

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
        for (let i=0; i<cells.length; i++) {
            cells[i].textContent = '';
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
        round++;
        return currentSign;
    }

    const getWinnerSign = () => winnerSign;

    // chick if round number is odd
    const oddRound = () => round % 2 === 0 ? false : true;

    const setNewRound = () => round = 1;

    const checkWin = (cell1, cell2, cell3) => {
        if (gameBoard.getField(cell1) !== '' &&
            gameBoard.getField(cell2) !== '' &&
            gameBoard.getField(cell3) !== '' &&
            gameBoard.getField(cell1) === gameBoard.getField(cell2) && 
            gameBoard.getField(cell1) === gameBoard.getField(cell3)) {
            winnerSign = gameBoard.getField(cell1);
            return true;
        }
        else { 
            return false;
        }
    }

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

    return { getSign, getWinnerSign, oddRound, setNewRound, gameOver };
})();

const gameMode = (() => {
    const humanMode = document.querySelector('#humanMode');
    const aiMode = document.querySelector('#AIMode');
    let gameMode = 'human';
    const getGameMode = () => gameMode;

    humanMode.addEventListener('click', () => {
        displayController.restartGame();
        gameMode = 'human';
    });

    aiMode.addEventListener('click', () => {
        displayController.restartGame();
        gameMode = 'ai';
    });
    
    return { getGameMode };
})();