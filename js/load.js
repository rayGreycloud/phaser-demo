// load.js

var loadState = {
  preload: function () {
    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.PageAlignHorizonally = true;
    game.scale.PageAlignVertically = true;
    game.state.backgroundColor = '#000000';

    game.load.spritesheet('characters', 'assets/sprites/characters.png', 24, 24);
    game.load.tilemap('level', 'assets/maps/room1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/sprites/world.png');

    game.load.audio('hit', 'assets/sounds/hit.wav');
  },
  create: function () {
    game.state.start('title');
  }
};
