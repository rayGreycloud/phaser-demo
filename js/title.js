// title.js
// Title screen

let titleState = {
  create: function () {
    // Comment out during dev
    // var nameLabel = game.add.text(160, 80, 'Click anywhere to start', {
    //   font: '14px Space Mono',
    //   fill: '#ffffff'
    // });
    // // Event listener
    // game.input.activePointer.capture = true;
    // Start game
    game.state.start('play');
  },

  update: function () {
    // if (game.input.activePointer.isDown) {
    //   game.state.start('play');
    // }
  }
};
