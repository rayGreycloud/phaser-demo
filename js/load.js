// load.js

var loadState = {
  preload: function () {
    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.PageAlignHorizonally = true;
    game.scale.PageAlignVertically = true;
    game.state.backgroundColor = '#000000';

    game.load.spritesheet('characters', 'assets/sprites/characters.png', 24, 24);

  },
  create: function () {
    game.state.start('title');
  }
};
