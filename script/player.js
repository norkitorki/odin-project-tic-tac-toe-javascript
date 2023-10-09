const Player = (name, marker, color, parent = document.body, options = {}) => {
  const template    = document.getElementById('player-template').content.cloneNode(true),
        playerName  = template.querySelector('.player-name'),
        playerMarker = template.querySelector('.player-marker'),
        colorPicker = template.querySelector('.color-picker'),
        obj         = { name, marker: marker[0], color };
  
  if (marker.length > 1 ) console.warn(`${name}'s marker has been truncated to the first character`);
  if (options.computer) Object.assign(obj, { randomPlacement, minMax });

  template.querySelector('.change-name').addEventListener('click', _updateName);
  template.querySelector('.change-marker').addEventListener('click', _updateMarker);
  colorPicker.addEventListener('change', _updateColor);

  _updateName(false);
  colorPicker.value = color;
  parent.appendChild(template);

  function _updatePlayer() {
    playerName.textContent   = obj.name;
    playerMarker.textContent = `(${obj.marker})`;
    playerMarker.style.color = obj.color;
  }

  function _updateName(promptUser = true) {
    if (promptUser) obj.name = prompt(`Please choose a new name for ${obj.name}:`) || obj.name;
    _updatePlayer();
  }

  function _updateMarker() {
    const newMarker = prompt(`Please choose a new marker for ${obj.name}:`) || obj.marker;
    obj.marker = newMarker[0];
    _updatePlayer();
  }

  function _updateColor() {
    obj.color = this.value;
    _updatePlayer();
  }

  // Computer specific functionality

  function randomPlacement(emptyFields) {
    if (emptyFields.length === 1) return emptyFields[0];
    let index = Math.round(Math.random() * (emptyFields.length - 1) + 0);
    return emptyFields[index];
  }

  function minMax(board, player, currentPlayer) {
    let result = board.gameOver(currentPlayer);
    if (result) {
      return typeof result === 'object' ? (currentPlayer === this ? 10 : -10) : 0;
    }

    let scores = [], moves = [], mark;
    board.emptyFields().forEach(pos => {
      mark = board.toArray()[pos[0]][pos[1]];
      board.newGameState(pos, currentPlayer.marker);
      scores.push(this.minMax(board, player, currentPlayer === player ? this : player) || 0);
      moves.push(pos);
      board.newGameState(pos, mark);
    })
    
    let targetScore = scores[0], index = 0;
    scores.forEach((score, i) => {
      if (currentPlayer === this ? score > targetScore : score < targetScore) {
        targetScore = score;
        index = i;
      }
    })

    this.nextMove = moves[index];
    return scores[index];
  }
  
  return obj;
};

const playersContainer = document.getElementById('players-container');

const p1   = Player('Player 1', 'X', '#ffffff', playersContainer);
const p2   = Player('Player 2', 'O', '#ec0000', playersContainer);
const comp = Player('Computer', 'C', '#c77905', playersContainer, { computer: true });
