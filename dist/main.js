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



var Player = function Player(sign) {
  return {
    sign: sign
  };
};

var gameBoard = function () {
  var board = ['', '', '', '', '', '', '', '', ''];

  var setField = function setField(index, sign) {
    board[index] = sign;
  };

  var getField = function getField(index) {
    return board[index];
  };

  var reset = function reset() {
    for (var i = 0; i < board.length; i++) {
      board[i] = '';
    }
  };

  return {
    setField: setField,
    getField: getField,
    reset: reset
  };
}();

var displayController = function () {
  var cells = _toConsumableArray(document.querySelectorAll('#gameBoard div'));

  var playersMove = document.querySelector('#playersMove');
  var restartBtn = document.querySelector('#restart');
  cells.forEach(function (e) {
    return e.addEventListener('click', function () {
      if (e.textContent === '' && gameController.gameOver() === false) {
        e.textContent = gameController.getSign();
        gameBoard.setField(e.getAttribute('data-position'), e.textContent);
        checkForGameOver();
      } else if (gameController.gameOver() === false) {
        alert('This cell is already taken, please select another one');
      } else {
        alert("Game is Over, please restart");
      }
    });
  });

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
    if (round % 2 === 0) {
      currentSign = playerTwo.sign;
      displayController.setPlayersMoveText(playerOne.sign);
    } else {
      currentSign = playerOne.sign;
      displayController.setPlayersMoveText(playerTwo.sign);
    }

    round++;
    return currentSign;
  };

  var getWinnerSign = function getWinnerSign() {
    return winnerSign;
  };

  var setNewRound = function setNewRound() {
    return round = 1;
  };

  var checkWin = function checkWin(cell1, cell2, cell3) {
    if (gameBoard.getField(cell1) !== '' && gameBoard.getField(cell2) !== '' && gameBoard.getField(cell3) !== '' && gameBoard.getField(cell1) === gameBoard.getField(cell2) && gameBoard.getField(cell1) === gameBoard.getField(cell3)) {
      winnerSign = gameBoard.getField(cell1);
      return true;
    } else {
      return false;
    }
  };

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
    setNewRound: setNewRound,
    gameOver: gameOver
  };
}();

var gameMode = function () {
  var humanMode = document.querySelector('#humanMode');
  var aiMode = document.querySelector('#AIMode');

  var getGameMode = function getGameMode() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'human';
    return mode;
  };

  humanMode.addEventListener('click', function () {
    displayController.restartGame();
    getGameMode('human');
  });
  aiMode.addEventListener('click', function () {
    displayController.restartGame();
    getGameMode('ai');
  });
  return {
    getGameMode: getGameMode
  };
}();
}();
/******/ })()
;
//# sourceMappingURL=main.js.map