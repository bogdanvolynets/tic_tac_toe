import './styles.scss';

const Player = (sign) => {
    return { sign };
}

const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    const setField = (index, sign) => {
        board[index] = sign;
    }

    const getField = (index) => board[index];

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return { setField, getField, reset };
})();

const displayController = (() => {
    const cells = [...document.querySelectorAll('#gameBoard div')];
    const playersMove = document.querySelector('#playersMove');
    const restartBtn = document.querySelector('#restart');
    
    cells.forEach(e => e.addEventListener('click', () => {
        if(e.textContent === '' && gameController.gameOver() === false) {
            e.textContent = gameController.getSign();
            gameBoard.setField(e.getAttribute('data-position'), e.textContent);
            checkForGameOver();
        }
        else if (gameController.gameOver() === false) { 
            alert('This cell is already taken, please select another one'); 
        }
        else { 
            alert(`Game is Over, please restart`); 
        }
    }));

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

    return { getSign, getWinnerSign, setNewRound, gameOver };
})();

const gameMode = (() => {
    const humanMode = document.querySelector('#humanMode');
    const aiMode = document.querySelector('#AIMode');
    const getGameMode = (mode = 'human') => mode;

    humanMode.addEventListener('click', () => {
        displayController.restartGame();
        getGameMode('human');
    });

    aiMode.addEventListener('click', () => {
        displayController.restartGame();
        getGameMode('ai');
    });
    
    return { getGameMode };
})();