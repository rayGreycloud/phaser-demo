// boot.js

let bootState = {
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
}
