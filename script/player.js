const Player = (name, marker, color, parent = document.body, options = {}) => {
  const template    = document.getElementById('player-template').content.cloneNode(true),
        playerName  = template.querySelector('.player-name'),
        colorPicker = template.querySelector('.color-picker'),
        obj         = { name, marker: marker[0], color };
  
  if (marker.length > 1 ) console.warn(`${name}'s marker has been truncated to the first character`);
  if (options.computer) obj.randomPlacement = randomPlacement;

  _updateName(false);
  colorPicker.value = color;

  template.querySelector('.change-name').addEventListener('click', _updateName);
  colorPicker.addEventListener('change', _updateColor);
  parent.appendChild(template);

  function _nameFormat() {
    return `${obj.name} (${obj.marker})`
  }

  function _updateName(promptUser = true) {
    if (promptUser) obj.name = prompt(`Please choose a new name for ${obj.name}:`) || obj.name;
    playerName.textContent = _nameFormat();
  }

  function _updateColor() {
    obj.color = this.value;
  }

  // Computer specific functionality

  function randomPlacement(emptyFields) {
    if (emptyFields.length === 1) return emptyFields[0];
    let index = Math.round(Math.random() * (emptyFields.length - 1) + 0);
    return emptyFields[index];
  }

  return obj;
};

const playersContainer = document.getElementById('players-container');

const p1   = Player('Player 1', 'XX', '#ffffff', playersContainer);
const p2   = Player('Player 2', 'O', '#ec0000', playersContainer);
const comp = Player('Computer', 'C', '#c77905', playersContainer, { computer: true });
