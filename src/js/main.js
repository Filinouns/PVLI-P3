'use strict';

var PlayScene = require('./play_scene');
var GameOver = require('./gameover_scene');
var MenuScene = require('./menu_scene');
var FightScene = require('./fight_scene');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
      this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};

var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    this.load.onLoadStart.add(this.loadStart, this);

    //Imagenes para el play_scene
    this.game.load.image('menu', 'images/menu.jpg');
    this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'images/simples_pimples.png');
    this.game.load.atlas('player', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.atlas('enemy', 'images/enemy.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    //Imagenes para el fight_scene
    this.game.load.atlas('player_fight', 'images/player_fight.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.atlas('playerPet1', 'images/playerPet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.atlas('enemy_fight', 'images/enemy_fight.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.game.load.atlas('enemyPet1', 'images/enemyPet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    this.load.onLoadComplete.add(this.loadComplete, this);
  },

  loadStart: function () {
    console.log("Game Assets Loading ...");
  },

  loadComplete: function() {
    this.ready = true;
    this.game.state.start('play');
    console.log('Game assets ready!');
  }, 
    
  update: function(){
    this._loadingBar
  }
};

var wfconfig = {
  //El metodo que invoca Google Font al terminar de cargar la fuente
    active: function() { 
        console.log("font loaded");
        init(); //Llamada al metodo de creacion de phaser
    },
 
    google: {
        families: ['Sniglet'] //La fuente o fuentes a cargar
    }
};
 
window.onload = function () {
  WebFont.load(wfconfig);
};

window.init = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('menu', MenuScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('gameOver', GameOver);
  game.state.add('fight', FightScene);

  game.state.start('boot');
};
