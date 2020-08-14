const game = (function (player1, player2) {
  let gameBoard = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];

  player1 = {
    name: player1,
    sign: "X",
  };

  player2 = {
    name: player2,
    sign: "O",
  };

  let turn = player1;

  //Paso el turno, y a travez de los parametros indico la posicion jugué
  function passTurn(x, y) {
    gameBoard[x][y] = turn.sign;
    if (turn === player1) {
      turn = player2;
    } else {
      turn = player1;
    }
  }

  function getTurnPlayer() {
    return turn;
  }

  function getGameBoard() {
    return gameBoard;
  }

  function getWinner() {
    if (
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      return gameBoard[1][1];
    } else if (
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[0][2] === gameBoard[2][0]
    ) {
      return gameBoard[0][2];
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][0] === gameBoard[i][2]
      ) {
        return gameBoard[i][0];
      } else if (
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        return gameBoard[0][i];
      }
    }
  }

  return { passTurn, getTurnPlayer, getGameBoard, getWinner };
})("Gonzalo", "Ramiro");

document.querySelector(".board").addEventListener("click", (e) => {
  let elementClicked = e.target;
  if (elementClicked.localName === "input" && !game.getWinner()) {
    let x = elementClicked.id[0];
    let y = elementClicked.id[1];

    //Le cambio el valor al input con el signo correspondiento que se jugo
    elementClicked.value = game.getTurnPlayer().sign;

    //Paso el turno e indico la posicion que jugue en el turno
    game.passTurn(x, y);
  } else {
    console.log(game.getWinner());
  }
});
