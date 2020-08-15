const gameFactory = function (player1, player2) {
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

  function getPlayers() {
    return { player1, player2 };
  }

  return { passTurn, getTurnPlayer, getGameBoard, getWinner, getPlayers };
};

const boardGame = document.querySelector(".board");
const marker = document.querySelector(".marker");
let game = {};

const menus = (function (doc) {
  let mainMenu = doc.querySelector(".mainMenu");
  let lastMenu = doc.querySelector(".lastMenu");
  let player1;
  let player2;

  function toggleMainMenu() {
    mainMenu.classList.toggle("hidden");
  }

  function toggleLastMenu() {
    lastMenu.classList.toggle("hidden");
  }

  function getPlayers() {
    player1 = mainMenu.querySelector("#player1Name").value;
    player2 = mainMenu.querySelector("#player2Name").value;
    return { player1, player2 };
  }

  function addActionMain(action) {
    mainMenu.querySelector("#playGame").addEventListener("click", () => {
      action();
    });
  }

  function addActionLast(action) {
    lastMenu.querySelector("#newGame").addEventListener("click", () => {
      action();
    });
  }

  function setLastMenuMessage(message) {
    lastMenu.querySelector("p").textContent = message;
  }

  return {
    toggleMainMenu,
    toggleLastMenu,
    addActionMain,
    addActionLast,
    getPlayers,
    setLastMenuMessage,
  };
})(document);

menus.addActionMain(() => {
  let players = menus.getPlayers();
  menus.toggleMainMenu();
  game = gameFactory(players.player1, players.player2);
  marker.classList.toggle("non-visible");
  marker.querySelector("span").textContent = game.getTurnPlayer().name;
  marker.querySelector("span").classList = game.getTurnPlayer().sign;
});

menus.addActionLast(() => {
  menus.toggleLastMenu();
  menus.toggleMainMenu();

  boardGame.querySelectorAll("input").forEach((element) => {
    element.value = "";
  });
});

boardGame.addEventListener("click", (e) => {
  let elementClicked = e.target;
  if (
    elementClicked.localName === "input" &&
    !game.getWinner() &&
    !elementClicked.value
  ) {
    let x = elementClicked.id[0];
    let y = elementClicked.id[1];

    //Le cambio el valor al input con el signo correspondiento que se jugo
    elementClicked.value = game.getTurnPlayer().sign;

    //Paso el turno e indico la posicion que jugue en el turno
    game.passTurn(x, y);

    //Cambio el marcador que indica el turno y tambien el color
    marker.querySelector("span").textContent = game.getTurnPlayer().name;
    marker.querySelector("span").classList = game.getTurnPlayer().sign;
  }
});

boardGame.addEventListener("click", (e) => {
  let signWinner = game.getWinner();
  let players = game.getPlayers();

  if (signWinner) {
    if (signWinner === players.player1.sign) {
      menus.setLastMenuMessage(`The winner is ${players.player1.name}`);
    } else {
      menus.setLastMenuMessage(`The winner is ${players.player2.name}`);
    }
    
    marker.classList.toggle("non-visible");
    menus.toggleLastMenu();
    marker.querySelector("span").textContent = "";
  }
});
