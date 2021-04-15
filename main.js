/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 // Create Player object(X, O) using factory function

var Player = function Player(sign) {
  return {
    sign: sign
  };
};

var gameBoard = function () {
  // Create array that immitates tic tac toe board
  var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  var getBoard = function getBoard() {
    return board;
  }; // Create new board with empty fields


  var findEmptyFields = function findEmptyFields(board) {
    return board.filter(function (e) {
      return e !== 'O' && e !== 'X';
    });
  }; // Assign elements to the board array


  var setField = function setField(index, sign) {
    board[index] = sign;
  }; // Get value from the board array


  var getField = function getField(index) {
    return board[index];
  }; // Select random empty field and return its value
  // returned value is field index in original board


  var getAiField = function getAiField() {
    var aiBoard = findEmptyFields(board);
    var randomNumber = Math.floor(Math.random() * aiBoard.length);
    return aiBoard[randomNumber];
  }; // clear board array


  var reset = function reset() {
    for (var i = 0; i < board.length; i++) {
      board[i] = i;
    }
  };

  return {
    getBoard: getBoard,
    setField: setField,
    getField: getField,
    findEmptyFields: findEmptyFields,
    getAiField: getAiField,
    reset: reset
  };
}();

var displayController = function () {
  var cells = _toConsumableArray(document.querySelectorAll('#gameBoard div'));

  var playersMove = document.querySelector('#playersMove');
  var restartBtn = document.querySelector('#restart'); // on click check if field is empty and if game is not over

  cells.forEach(function (e) {
    return e.addEventListener('click', function () {
      if (e.textContent === '' && gameController.gameOver() === false) {
        e.textContent = gameController.getSign(); // add placed sign to the board array

        gameBoard.setField(e.getAttribute('data-position'), e.textContent); // after players move check if game is not over

        checkForGameOver(); // after check for game mode, if it's AI mode - AI will place its sign

        determineMove();
      } // set alert if game is still going but selected field was already taken
      else if (gameController.gameOver() === false) {
          alert('This cell is already taken, please select another one');
        } // if game is over and user tries to click on field - set alert to restart the game
        else {
            alert("Game is Over, please restart");
          }
    });
  }); // check the gamemode, if it's AI mode - AI makes its move, 

  var determineMove = function determineMove() {
    if (gameController.gameOver() === false && gameMode.getGameMode() === 'ai') {
      // set AI's sign and get empty field that will be choosen
      var aiSign = gameController.getSign();
      var aiField = gameBoard.getAiField(); // change DOM content and place new value into board array

      cells[aiField].textContent = aiSign;
      gameBoard.setField(aiField, aiSign); // check for gameover after AI finishes move

      checkForGameOver();
    } // minimax mode
    else if (gameController.gameOver() === false && gameMode.getGameMode() === 'minimax') {
        var minimaxSign = gameController.getSign();
        var minimaxField = aiController.minimax(gameBoard.getBoard(), minimaxSign);
        cells[minimaxField.index].textContent = minimaxSign;
        gameBoard.setField(minimaxField.index, minimaxSign);
        checkForGameOver();
      }
  }; // set text that tells which player moves right now


  var setPlayersMoveText = function setPlayersMoveText(player) {
    playersMove.textContent = "Player ".concat(player, "'s Turn");
  };

  var checkForGameOver = function checkForGameOver() {
    if (gameController.gameOver() === true) {
      playersMove.textContent = "Player ".concat(gameController.getWinnerSign(), " Has Won");
    } else if (gameController.gameOver() === "tie") {
      playersMove.textContent = "That's a tie";
    }
  };

  var restartGame = function restartGame() {
    gameBoard.reset();
    gameController.setNewRound();
    playersMove.textContent = "Player X's Turn";

    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
    }
  };

  restartBtn.addEventListener('click', restartGame);
  return {
    setPlayersMoveText: setPlayersMoveText,
    determineMove: determineMove,
    restartGame: restartGame
  };
}();

var gameController = function () {
  var playerOne = Player('X');
  var playerTwo = Player('O');
  var round = 1;
  var currentSign = null;
  var winnerSign = null;
  var isWin = false;

  var getSign = function getSign() {
    if (oddRound() === false) {
      currentSign = playerTwo.sign;
      displayController.setPlayersMoveText(playerOne.sign);
    } else {
      currentSign = playerOne.sign;
      displayController.setPlayersMoveText(playerTwo.sign);
    }

    setNextRound();
    return currentSign;
  };

  var getWinnerSign = function getWinnerSign() {
    return winnerSign;
  }; // chick if round number is odd


  var oddRound = function oddRound() {
    return round % 2 === 0 ? false : true;
  };

  var setNextRound = function setNextRound() {
    return round++;
  };

  var setNewRound = function setNewRound() {
    return round = 1;
  }; // we take 3 board fields if each field has same value then game was won


  var checkWin = function checkWin(cell1, cell2, cell3) {
    if (gameBoard.getField(cell1) === gameBoard.getField(cell2) && gameBoard.getField(cell1) === gameBoard.getField(cell3)) {
      winnerSign = gameBoard.getField(cell1);
      return true;
    } else {
      return false;
    }
  }; // we call checkWin function and pass field indexes into it
  // if checkWin returns true - player won
  // if it was final round and nobody won than it's a tie


  var gameOver = function gameOver() {
    isWin = checkWin(0, 1, 2) || checkWin(3, 4, 5) || checkWin(6, 7, 8) || checkWin(0, 3, 6) || checkWin(1, 4, 7) || checkWin(2, 5, 8) || checkWin(0, 4, 8) || checkWin(6, 4, 2);

    if (round === 10 && isWin === false) {
      isWin = "tie";
    }

    return isWin;
  };

  return {
    getSign: getSign,
    getWinnerSign: getWinnerSign,
    oddRound: oddRound,
    setNewRound: setNewRound,
    gameOver: gameOver
  };
}();

var gameMode = function () {
  var gameModes = _toConsumableArray(document.querySelectorAll('#gameMode'));

  var mode = 'human'; // on button click set gamemode to the selected one

  gameModes.forEach(function (e) {
    return e.addEventListener('click', function () {
      displayController.restartGame();
      mode = e.getAttribute('data-mode');
    });
  });

  var getGameMode = function getGameMode() {
    return mode;
  };

  return {
    getGameMode: getGameMode
  };
}();

var aiController = function () {
  var xSign = document.querySelector('#xSign');
  var oSign = document.querySelector('#oSign');
  var huSign = 'X';
  var aiSign = 'O';
  var aiMove = false;

  var aiMovesFirst = function aiMovesFirst() {
    return aiMove;
  };

  xSign.addEventListener('click', function () {
    huSign = 'X';
    aiSign = 'O';
    aiMove = false;
  });
  oSign.addEventListener('click', function () {
    huSign = 'O';
    aiSign = 'X';
    aiMove = true;
    displayController.determineMove();
  });

  var minimax = function minimax(newBoard, player) {
    // available spots
    var availSpots = gameBoard.findEmptyFields(newBoard); // checks for the terminal states such as win, lose, and tie and returning a value accordingly

    if (gameController.gameOver() === true && gameController.getWinnerSign() === huSign) {
      return {
        score: -10
      };
    } else if (gameController.gameOver() === true && gameController.getWinnerSign() === aiSign) {
      return {
        score: 10
      };
    } else if (availSpots.length === 0) {
      return {
        score: 0
      };
    } // an array to collect all the objects


    var moves = []; // loop through available spots

    for (var i = 0; i < availSpots.length; i++) {
      // create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]]; // set the empty spot to the current player

      newBoard[availSpots[i]] = player; // if collect the score resulted from calling minimax on the opponent of the current player

      if (player === aiSign) {
        var result = minimax(newBoard, huSign);
        move.score = result.score;
      } else {
        var _result = minimax(newBoard, aiSign);

        move.score = _result.score;
      } // reset the spot to empty


      newBoard[availSpots[i]] = move.index; // push the object to the array

      moves.push(move);
    } // if it is the computer's turn loop over the moves and choose the move with the highest score


    var bestMove;

    if (player === aiSign) {
      var bestScore = -10000;

      for (var _i = 0; _i < moves.length; _i++) {
        if (moves[_i].score > bestScore) {
          bestScore = moves[_i].score;
          bestMove = _i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      var _bestScore = 10000;

      for (var _i2 = 0; _i2 < moves.length; _i2++) {
        if (moves[_i2].score < _bestScore) {
          _bestScore = moves[_i2].score;
          bestMove = _i2;
        }
      }
    } // return the chosen move (object) from the array to the higher depth


    console.log(moves[bestMove]);
    return moves[bestMove];
  };

  return {
    aiMovesFirst: aiMovesFirst,
    minimax: minimax
  };
}();
}();
/******/ })()
;
//# sourceMappingURL=main.js.map