// play.js
let playState = {
  player: {
    xDest: null,
    yDest: null
  },
  enemy: {

  },

  create: function () {
    var _this = this;
    _this.player = game.add.sprite(300, 200, 'characters');
    _this.player.frame = 8;
    game.add.existing(_this.player);
    game.physics.enable(_this.player, Phaser.Physics.ARCADE);
    _this.player.anchor.setTo(.5, 1);
    _this.player.animations.add('wait', [8,9], 4);

    _this.enemy = game.add.sprite(100, 100, 'characters');
    _this.enemy.frame = 544;
    game.add.existing(_this.enemy);
    game.physics.enable(_this.enemy, Phaser.Physics.ARCADE);
    _this.enemy.anchor.setTo(.5, 1);
    _this.enemy.scale.x = -1;
    _this.enemy.body.immovable = true;

    game.input.activePointer.capture = true;
  },

  update: function () {
    var _this = this;
    _this.player.animations.play('wait');

    if (game.input.activePointer.isDown) {
      _this.player.xDest = game.input.x;
      _this.player.yDest = game.input.y;
    }

    game.physics.arcade.collide(_this.player, _this.enemy, function () {
      _this.stopPlayer();
    });

    _this.movePlayer(game.input.x, game.input.y);
  },

  movePlayer: function () {
    var _this = this;

    if (Math.floor(_this.player.x / 10) == Math.floor(_this.player.xDest / 10)) {
      _this.player.body.velocity.x = 0;
    } else if (Math.floor(_this.player.x) <  Math.floor(_this.player.xDest)) {
      _this.player.body.velocity.x = 80;
      _this.player.scale.x = -1;
    } else if (Math.floor(_this.player.x) >  Math.floor(_this.player.xDest)) {
      _this.player.body.velocity.x = -80;
      _this.player.scale.x = 1;
    }
    if (Math.floor(_this.player.y / 10) == Math.floor(_this.player.yDest / 10)) {
      _this.player.body.velocity.y = 0;
    } else if (Math.floor(_this.player.y) <  Math.floor(_this.player.yDest)) {
      _this.player.body.velocity.y = 80;
      _this.player.scale.y = -1;
    } else if (Math.floor(_this.player.y) >  Math.floor(_this.player.yDest)) {
      _this.player.body.velocity.y = -80;
      _this.player.scale.y = 1;
    }
  },

  stopPlayer: function () {
    var _this = this;
    _this.player.xDest = _this.player.x;
    _this.player.yDest = _this.player.y;
    _this.player.body.velocity.x = 0;
    _this.player.body.velocity.y = 0;
  }
};
