// play.js
let playState = {
  player: null,
  create: function () {
    var _this = this;
    _this.player = game.add.sprite(100, 200, 'characters');
    _this.player.frame = 4;
    game.add.existing(_this.player);
    _this.player.anchor.setTo(.5, 1);

    _this.player.animations.add('left', [0,1,2,3], 8);
    _this.player.animations.add('right', [5,6,7,8], 8);
    game.input.activePointer.capture = true;
    game.physics.enable(_this.player, Phaser.Physics.ARCADE);
  },

  update: function () {
    var _this = this;

    _this.player.body.velocity.x = 0;

    if (game.input.activePointer.isDown) {
      if (_this.player.x < game.input.x) {
        _this.player.animations.play('right');
        _this.player.body.velocity.x = 50
      } else if (_this.player.x > game.input.x) {
        _this.player.animations.play('left');
        _this.player.body.velocity.x = -50;
      }
    } else {
      _this.player.animations.stop();
      _this.player.frame = 4;
    }
  }
};
