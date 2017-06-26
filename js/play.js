// play.js
let playState = {
  player: null,
  create: function () {
    var _this = this;
    _this.player = game.add.sprite(100, 200, 'characters');
    _this.player.frame = 0;
    game.add.existing(_this.player);
    _this.player.anchor.setTo(.5, 1);

    _this.player.animations.add('walkLeft', [0,1,2,3], 4);
    game.input.activePointer.capture = true;
    game.physics.enable(_this.player, Phaser.Physics.ARCADE);
  },

  update: function () {
    var _this = this;
    _this.player.animations.play('walkLeft');
    if (game.input.activePointer.isDown) {
      _this.player.x = game.input.x;
      _this.player.y = game.input.y;
    }
  }
};
