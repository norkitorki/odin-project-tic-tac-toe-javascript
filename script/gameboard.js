const Gameboard = ((playerOne, playerTwo, computer) => {
  const _display     = document.querySelector('.display'),
        _resetButton = document.querySelector('.reset-game'),
        _gameBoard   = document.querySelector('.game-board'),
        _toggleComp  = document.querySelector('.toggle-computer');

  let _board,
      _turn = 1,
      _currentPlayer = playerOne,
      _gameActive = false,
      _compActive = false;

  _resetButton.addEventListener('click', reset);
  _gameBoard.addEventListener('click', _placeMarker);
  _toggleComp.addEventListener('change', _toggleComputer);

  function reset() {
    _gameActive = true;
    _board = [[], [], []].map(row => [' ', ' ', ' ']);
    _turn = 1;
    _annouceTurn();
    render();
    console.log('Gameboard has been reset.');
    _computerTurn();
  }

  function render() {
    _gameBoard.innerHTML = '';
    _board.forEach((row, rank) => {
      row.forEach((marker, file) => _gameBoard.appendChild(_createFieldNode(marker, rank, file)));
    });
  }

  function _createFieldNode(text, rank, file) {
    const field = document.createElement('a');
    [field.textContent, field.href, field.dataset.position] = [text, '#', `${rank}${file}`];
    return field;
  }

  function _placeMarker(e) {
    e.preventDefault();
    let gameIsOver, target = e.target;
    if (_gameActive && target.textContent === ' ') {
      _markField.call(target, _currentPlayer.marker);
      gameIsOver = gameOver();
      if (gameIsOver) return _handleGameEnd(gameIsOver);
      _swapPlayer();
      _annouceTurn();
      _turn++;
      _computerTurn();
    }
  }

  function gameOver() {
    const patterns = [
      ['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22'],
      ['00', '10', '20'], ['01', '11', '21'], ['02', '12', '22'],
      ['00', '11', '22'], ['02', '11', '20']
    ];

    const playerW = patterns.find(pattern => pattern.every(pos => Number(_findField(pos).dataset.player) === _playerIndex(_currentPlayer)));
    return playerW || _turn === 9 || false;
  }

  function _swapPlayer() {
    _currentPlayer = _currentPlayer === playerOne ? playerTwo : playerOne;
  }

  function _annouceTurn() {
    _display.textContent = `${_currentPlayer.name}'s turn.`;
  }

  function _computerTurn() {
    if (_compActive && (_currentPlayer === playerTwo || _currentPlayer === computer)) {
      _currentPlayer = computer;
      computer.randomPlacement(_gameBoard.children).click();
    }
  }

  function _handleGameEnd(res) {
    _gameActive = false;
    if (typeof res === 'object') _highlightWinningPattern(res);
    _display.textContent = `${res === true ? 'The game ended in a draw.' : `${_currentPlayer.name} has won the game!`}`;
  }

  function _highlightWinningPattern(positions) {
    positions.forEach(pos => _findField(pos).style.border = '5px solid #2b9b09');
  }

  function _toggleComputer() {
    if (computer) {
      _compActive = this.checked ? true : false;
      _currentPlayer = playerOne;
      reset();
    }
  }

  function _findField(position) {
    return _gameBoard.querySelector(`[data-position='${position}']`);
  }

  function _markField(marker) {
    [this.textContent, this.style.color, this.dataset.player] = [marker, _currentPlayer.color, _playerIndex(_currentPlayer)];
    [rank, file] = this.dataset.position;
    _board[rank][file] = marker || _currentPlayer.marker;
  }

  function _playerIndex(player) {
    return [playerOne, playerTwo, computer].indexOf(player);
  }

  function toArray() {
    return _board;
  }

  function toString() {
    return _board.map(row => row.join(' ')).join("\n");
  }

  return {
    reset,
    render,
    gameOver,
    toArray,
    toString
  }
})(p1, p2, comp);