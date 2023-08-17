const Gameboard = (() => {
  let _board = [];

  reset();

  function reset() {
    _board = [ [' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' '] ];
  }

  function placeMarker(rank, file, marker) {
    return _board[rank][file] === ' ' ? _board[rank][file] = marker : null;
  }

  function removeMarker(rank, file) {
    _board[rank][file] = '';
  }

  function playerWon(marker) {
    let patterns = [
      [ _board[0][0], _board[0][1], _board[0][2] ],
      [ _board[1][0], _board[1][1], _board[1][2] ],
      [ _board[2][0], _board[2][1], _board[2][2] ],
      [ _board[0][0], _board[1][0], _board[2][0] ],
      [ _board[0][1], _board[1][1], _board[2][1] ],
      [ _board[0][2], _board[1][2], _board[2][2] ],
      [ _board[0][0], _board[1][1], _board[2][2] ],
      [ _board[0][2], _board[1][1], _board[2][0] ]
    ];

    return patterns.some(pattern => pattern.every(field => field === marker));
  }

  function toArray() {
    return _board;
  }

  function toString() {
    console.log(_board.map(row => row.join(' ')).join("\n"));
  }

  return {
    reset,
    placeMarker,
    removeMarker,
    playerWon,
    toArray,
    toString
  }
})();
