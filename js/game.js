// game.js
// Set game parameters
let config = {
  width: 480,
  height: 360,
  renderer: 'Phaser.AUTO',
  parent: 'gameDiv',
  multiTexture: true,
  antialias: true,
  state: null
}

// Create game
let game = new Phaser.Game(config);

// Add states to state manager
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('play', playState);

// Run boot state after initialization
game.state.start('boot');
