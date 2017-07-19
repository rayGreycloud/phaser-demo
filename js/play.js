// play.js
let playState = {
  player: null,
  mob: null,
  layer: null,

  create: function () {
    var _this = this;

    var map = game.add.tilemap('level');
    map.addTilesetImage('world', 'tiles');
    game.world.setBounds(0, 0, 480, 360);
    map.setCollision([217, 218, 219, 221]);
    _this.layer = map.createLayer('Tile Layer 1');

    _this.player = new Player(150, 100);
    game.camera.x = 300;
    game.camera.y = 200;
    game.add.existing(_this.player);
    game.physics.enable(_this.player, Phaser.Physics.ARCADE);

    _this.mob = game.add.group();
    // _this.mob.add(Enemy(100, 100));
    // _this.mob.add(Enemy(200, 100));
    // _this.mob.add(Enemy(100, 200));
    // _this.mob.add(Enemy(200, 200));
    _this.mob.add(Enemy(200, 300));
    _this.mob.add(Enemy(400, 100));

    _this.mob.forEach(function(enemy, index) {
      game.physics.enable(enemy, Phaser.Physics.ARCADE);
      enemy.body.immovable = true;
    });

    game.input.activePointer.capture = true;

    var text = game.add.text(0, 165, 'Life', { font: '8px', fill: '#ffffff', align: 'center' });
    text.fixedToCamera = true;
    var lifebar = game.add.sprite(20, 165, 'lifebar');
    lifebar.scale.setTo(0.25, 0.25);
    lifebar.fixedToCamera = true;
  },

  update: function () {
    var _this = this;
    _this.player.animations.play('wait');
    _this.mob.forEach(function(enemy, index) {
      enemy.animations.play('wait');
      enemy.update();
    });

    if (game.input.activePointer.isDown) {
      _this.player.setDest(game.input.x - game.world.worldPosition.x, game.input.y - game.world.worldPosition.y);
    }
    _this.player.update();
    game.physics.arcade.collide(_this.player, _this.mob, function (p, e) {
      p.stop();
      e.state = 'alarm';
    });
    game.physics.arcade.collide(_this.player, _this.layer, function () {
      _this.player.stop();
    });
  }
};

function Player(x, y) {
  var player = game.add.sprite(x, y, 'characters');
  player.speed = 80;
  player.frame = 8;

  player.xDest = x;
  player.yDest = y;
  player.anchor.setTo(.5, 1);
  player.animations.add('wait', [8,9], 4);

  player.sfx = {};
  player.sfx.collide = game.add.audio('hit');

  player.setDest = function(x, y) {
    player.xDest = x;
    player.yDest = y;
  };

  player.update = function () {
    var _this = this;
    move(_this);
    // Camera follow player
    game.camera.x = _this.x - 150;
    game.camera.y = _this.y - 100;
  }

  player.stop = function () {
    var _this = this;
    _this.xDest = _this.x;
    _this.yDest = _this.y;
    player.sfx.collide.play();
  }

  return player;
};

function Enemy(x, y) {
  var enemy = game.add.sprite(x, y, 'characters');

  enemy.state = 'patrol';
  enemy.xDest = x;
  enemy.yDest = y;
  enemy.animations.add('wait', [544, 545], 4);
  enemy.direction = 1;
  enemy.frame = 544;
  enemy.anchor.setTo(.5, 1);
  enemy.scale.x = -1;

  enemy.goToXY = function(x, y) {
    enemy.xDest = x;
    enemy.yDest = y;
  }

  enemy.update = function () {
    var _this = this;
    switch (_this.state) {
      case 'patrol':
        _this.speed = 40;
        _this.patrol();
        break;
      case 'alert':
        _this.speed = 0;
        _this.stop();
        break;
    }

    move(_this);
  }

  enemy.stop = function () {
    var _this = this;
    _this.xDest = x;
    _this.yDest = y;
  }

  enemy.patrol = function () {
    var _this = this;
    if (Math.floor(_this.x /10 ) == Math.floor(_this.xDest / 10 )) {
      _this.direction = _this.direction * -1;
      _this.goToXY(_this.x + _this.direction * 100);
    }
  }

  return enemy;
}

function move(_this) {
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
