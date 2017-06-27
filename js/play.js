// play.js
let playState = {
  player: null,
  mob: null,
  layer: null,

  create: function () {
    var _this = this;

    var map = game.add.tilemap('level');
    map.addTilesetImage('world', 'tiles');
    map.setCollision([217, 218, 219, 221]);
    _this.layer = map.createLayer('Tile Layer 1');

    _this.player = new Player(300, 200);
    game.add.existing(_this.player);
    game.physics.enable(_this.player, Phaser.Physics.ARCADE);

    _this.mob = game.add.group();
    _this.mob.add(Enemy(100, 100));
    _this.mob.add(Enemy(200, 100));
    _this.mob.add(Enemy(100, 200));
    _this.mob.add(Enemy(200, 200));
    _this.mob.add(Enemy(300, 300));
    _this.mob.add(Enemy(400, 200));

    _this.mob.forEach(function(enemy, index) {
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.immovable = true;
    });

    game.input.activePointer.capture = true;
  },

  update: function () {
    var _this = this;
    _this.player.animations.play('wait');
    _this.mob.forEach(function(enemy, index) {
      enemy.animations.play('wait');
    });

    if (game.input.activePointer.isDown) {
      _this.player.setDest(game.input.x, game.input.y);
    }
    _this.player.update();
    game.physics.arcade.collide(_this.player, _this.mob, function () {
      _this.player.stop();
    });
    game.physics.arcade.collide(_this.player, _this.layer, function () {
      _this.player.stop();
    });
  }
};

function Player(x, y) {
  var player = game.add.sprite(x, y, 'characters');
  player.frame = 8;

  player.xDest = x;
  player.yDest = y;
  player.anchor.setTo(.5, 1);
  player.animations.add('wait', [8,9], 4);

  player.setDest = function(x, y) {
    player.xDest = x;
    player.yDest = y;
  };

  player.update = function () {
    var _this = this;
    if (Math.floor(_this.x / 10) == Math.floor(_this.xDest / 10)) {
      _this.body.velocity.x = 0;
    } else if (Math.floor(_this.x) <  Math.floor(_this.xDest)) {
      _this.body.velocity.x = 80;
      _this.scale.x = -1;
    } else if (Math.floor(_this.x) >  Math.floor(_this.xDest)) {
      _this.body.velocity.x = -80;
      _this.scale.x = 1;
    }
    if (Math.floor(_this.y / 10) == Math.floor(_this.yDest / 10)) {
      _this.body.velocity.y = 0;
    } else if (Math.floor(_this.y) <  Math.floor(_this.yDest)) {
      _this.body.velocity.y = 80;
    } else if (Math.floor(_this.y) >  Math.floor(_this.yDest)) {
      _this.body.velocity.y = -80;
    }
  }

  player.stop = function () {
    var _this = this;
    _this.xDest = _this.x;
    _this.yDest = _this.y;
  }

  return player;
};

function Enemy(x, y) {
  var enemy = game.add.sprite(x, y, 'characters'); enemy.xDest = x;
  enemy.yDest = y;
  enemy.animations.add('wait', [544, 545], 4);

  enemy.frame = 544;
  enemy.anchor.setTo(.5, 1);
  enemy.scale.x = -1;

  enemy.goToXY = function(x, y) {

  }
  enemy.update = function () {

  }
  enemy.stop = function () {

  }

  return enemy;
}
