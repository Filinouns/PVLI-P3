(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// Cambiar todo el codigo para que tengas que elegir entre 3 "pokemons" al empezar el combate y el "pokemon" del enemigo siempre sera aleatorio.
// La variable fightStage solo se utilizara la primera vez para explicarle al jugador las mecanicas de combate.

var fightStage = 0;
var initialHp = 100;
var initialArmor = 0;
var clicks = 0;

var FightScene = {
	_tutorial: false,
	_enemy: {},
	_enemyPet: {},
	_player: {},
	_playerPet: {},
	_buddy: {},
	_fightNumber: fightStage,
	_initialHp: initialHp,
	_initialArmor: initialArmor,

	enemyPet: function () {
		var random = this.getRandomArbitrary(0, 10);
		this._enemyPet = this.game.add.sprite(500, 300, 'enemyPet1')
		if (random >= 0 && random < 1){
			//this._enemyPetSprite = //Primer Sprite
		} else if (random >= 1 && random < 2) {
			//this._enemyPetSprite = //Segundo Sprite
		} else if (random >= 2 && random < 3) {
			//this._enemyPetSprite = //Tercer Sprite
		} else if (random >= 3 && random < 4) {
			//this._enemyPetSprite = //Cuarto Sprite
		} else if (random >= 4 && random < 5) {
			//this._enemyPetSprite = //Quinto Sprite
		} else if (random >= 5 && random < 6) {
			//this._enemyPetSprite = //Sexto Sprite
		} else if (random >= 6 && random < 7) {
			//this._enemyPetSprite = //Septimo Sprite
		} else if (random >= 7 && random < 8) {
			//this._enemyPetSprite = //Octavo Sprite
		} else {
			//this._enemyPetSprite = //this.game.add.sprite(500, 300, 'enemyPet1')
		}
	},

	dialogos: function () {
		var random = this.getRandomArbitrary(0, 10);

		if (random >= 0 && random < 1){
			return this.game.add.text(100, 100, 'Tienes la esperanza de llegar al otro lado? \n Menudo novato', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 1 && random < 2) {
			return this.game.add.text(100, 100, '¿Crees que puedes pasar por encima mio?', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 2 && random < 3) {
			return this.game.add.text(100, 100, 'Esos compañeros que tienes no \n te ayudaran en esta batalla', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 3 && random < 4) {
			return this.game.add.text(100, 100, 'Mmmmm que buena pinta tienen esos bocatas, Damelos!', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 4 && random < 5) {
			return this.game.add.text(100, 100, 'Sere el único que llege al otro lado de la montaña', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 5 && random < 6) {
			return this.game.add.text(100, 100, 'Bocatas, bocatas, bocatas, bocataaaaaas!!', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 6 && random < 7) {
			return this.game.add.text(100, 100, 'Tengo hambre, dame esos bocatas ahora!', {font: '30px Sniglet', fill: '#fff' });
		} else if (random >= 7 && random < 8) {
			return this.game.add.text(100, 100, 'Si fueras listo habrias vuelto con mami hace tiempo', {font: '30px Sniglet', fill: '#fff' });
		} else {
			return this.game.add.text(100, 100, 'Solo hay 3 cosas infinitas: el universo,\n la ustupidez humana \n y las ganas que tengo de quedarme esos bocatas', {font: '30px Sniglet', fill: '#fff' });
		}
	},

	create: function () {
		this.game.stage.backgroundColor = "#56b24d";

		// Texto para el inicio de combate
		this.fightText = this.game.add.text(300, 100, 'FIGHT!', {font: '30px Sniglet', fill: '#fff' });
		this.fightText.visible = false;
		this.textSpace = this.game.add.text(300, 450, 'Presiona "Espacio" para continuar', {font: '15px Sniglet', fill: '#fff' });

		// Variable para detectar cuando se pulsa el espacio
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.onSpacePress, this);

		// FightNumber
		switch(this._fightNumber) {
            case 0:
            	//Creamos las imagenes necesarias
            	this.text = this.game.add.text(175, 100, 'Bienvenido al sistema de combate \n de Mountain Meeting Tales', {font: '30px Sniglet', fill: '#fff' });
            	this._player = this.game.add.sprite(10, 10, 'player_fight');
            	this._playerPet = this.game.add.sprite(10, 300, 'playerPet1');
            	this._playerPet.visible = false;
            	this._enemy = this.game.add.sprite(500, 10, 'enemy_fight');
            	this.enemyPet();
            	this._enemyPet.visible = false;
            	break;
            case 1:
                this.text = this.dialogos();
                this.enemyPet();
                break;
        }

        // Inicializacion de la vida y armadura
		this._playerPet.hp = this._initialHp;
		this._playerPet.armor = this._initialArmor;
		this._enemyPet.hp = this._initialHp;
		this._enemyPet.armor = this._initialArmor;

        // Textos de la vida y la armadura
        this.enemyPetHp = this.game.add.text(625, 565, 'Hp enemigo: ' + this._enemyPet.hp + '/100', {font: '10px Sniglet', fill: '#fff' });
        this.enemyPetArmor = this.game.add.text(625, 575, 'Armor enemigo: ' + this._enemyPet.armor, {font: '10px Sniglet', fill: '#fff' });
        this.playerPetHp = this.game.add.text(625, 525, 'Hp aliado: ' + this._playerPet.hp + '/100', {font: '10px Sniglet', fill: '#fff' });
        this.playerPetArmor = this.game.add.text(625, 535, 'Armor aliado: ' + this._playerPet.armor, {font: '10px Sniglet', fill: '#fff' });

        //Botones de ataque y defensa
        this.buttonAtq = this.game.add.button(280, 550, 'button', this.actionOnAttack, this, 2, 1, 0);
        this.buttonAtq.anchor.set(0.5);
        var attText = this.game.add.text(0, 0, 'Atacar');
        attText.anchor.set(0.5);
        this.buttonAtq.addChild(attText);

        this.buttonDef = this.game.add.button(460, 550, 'button', this.actionOnDefense, this, 2, 1, 0);
        this.buttonDef.anchor.set(0.5);
        var defText = this.game.add.text(0, 0, 'Defense');
        defText.anchor.set(0.5);
        this.buttonDef.addChild(defText);
	},

	update: function () {
		// Actualizacion continua de los valores de vida y armadura.
		this.playerPetHp.setText('Hp aliado: ' + this._playerPet.hp + '/100');
		this.playerPetArmor.setText('Armor aliado: ' + this._playerPet.armor);
		this.enemyPetHp.setText('Hp enemigo: ' + this._enemyPet.hp + '/100');
		this.enemyPetArmor.setText('Armor enemigo: ' + this._enemyPet.armor);

		// Condicion de cierre del state
		if (this._enemyPet.hp < 1) {
			var button = this.game.add.button(100, 550, 'button', this.actionOnVictory, this, 2, 1, 0);
        	button.anchor.set(0.5);
        	var textVic = this.game.add.text(0, 0, "Victoria!");
        	textVic.anchor.set(0.5);
        	button.addChild(textVic);
        	this.buttonAtq.visible = false;
        	this.buttonDef.visible = false;
		} else if (this._playerPet.hp < 1) {
			var button = this.game.add.button(100, 550, 'button', this.actionOnDefeat, this, 2, 1, 0);
        	button.anchor.set(0.5);
        	var textDer = this.game.add.text(0, 0, "Reintentar");
        	textDer.anchor.set(0.5);
			button.addChild(textDer);
			this.buttonAtq.visible = false;
        	this.buttonDef.visible = false;
		}
	},

	shutdown: function () {
		fightStage = this._fightNumber;
		initialArmor = this._initialArmor;
		initialHp = this._initialHp;
	},

	tutorial: function () {
		switch (clicks){
			case 0:
				this.text.setText('Pulsa los botones situados en la parte inferior \n de la pantalla para llevar a cabo \n las diferentes acciones');
				this.text.visible = true;
				break;
			case 1:
				this.text.setText('Ten cuidado al realizar cada acción \n puede ser rápido \n pero DIFICIL!');
				this._tutorial = true;
				break;
		}
	},

	onSpacePress: function () {
		switch(this._fightNumber) {
            case 0:
            	if (!this._tutorial) {
            		this.tutorial();
            		clicks++;
            	} else if (this.fightText.visible) {
            		this.fightText.visible = false;
            	} else {
            		this.fightText.visible = true;
            		this.text.visible = false;
            		this.textSpace.visible = false;
            	}
            	break;
            case 1:
            	this.text.visible = false;
            	this.textSpace.visible = false;
                break;
        }
	},

	actionOnDefense: function () {
		if(!this.textSpace.visible){
			if(this._playerPet.armor < 6){
				this._playerPet.armor++;
				this.enemyAttack();
			} else {
				this.enemyAttack();
			}
		}
	},

	actionOnAttack: function () {
		if(!this.textSpace.visible){
			this._enemyPet.hp = this._enemyPet.hp - (10 - this._enemyPet.armor);
			this.enemyAttack();
		}
	},

	getRandomArbitrary: function (min, max) {
		return Math.random() * (max - min) + min;
	},

	enemyAttack: function () {
		var random = this.getRandomArbitrary(0, 3);
		if (random < 2) { //Ataca
			this._playerPet.hp = this._playerPet.hp - (10 - this._playerPet.armor);
		} else if (random >= 2) {
			if (this._enemyPet.armor < 5) {
				this._enemyPet.armor++;
			} else {
				this._playerPet.hp = this._playerPet.hp - (10 - this._playerPet.armor);
			}
		}
	},

	finalBossAttack: function () {

	},

	actionOnDefeat: function () {
		this._fightNumber = 1;
		this.game.state.start('fight');
	},

	actionOnVictory: function () {
		this._fightNumber = 1;
		this._initialHp = 100;
		this._initialArmor = 0;
		this.game.state.start('play');
	}
};

module.exports = FightScene;
},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(400, 300, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        var returnButton = this.game.add.button(400, 200, 'button', this.goMenu, this, 2, 1, 0);
        returnButton.anchor.set(0.5);

        var returnMenuText = this.game.add.text(0, 0, 'Return Main Menu');
        returnMenuText.font = 'Sniglet';
        returnMenuText.anchor.set(0.5);
        returnButton.addChild(returnMenuText);
    },
    
    goMenu: function () {
        this.game.state.start('menu');
    },

    actionOnClick: function () {
        this.game.state.start('play');
    }
};

module.exports = GameOver;
},{}],3:[function(require,module,exports){
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
    this.game.load.tilemap('tilemap', 'images/MMT/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'images/MMT/Tiles.png');
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

},{"./fight_scene":1,"./gameover_scene":2,"./menu_scene":4,"./play_scene":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0, 0, 800, 600);
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3, 'FIGHT':4}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
var playerPos = {x: 10, y: 10};
var enemyFighted = 0;

//Scena de juego.
var PlayScene = {
    _player: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _fightNumber: enemyFighted,
    _enemy1: {},
    _enemy2: {},
    _prueba: {}, //No se usa normalmente

  //Método constructor...
  create: function () {
      //Creacion e implementacion del tilemap
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');

      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('Paisaje');
      this.pared = this.map.createLayer('Pared');
      this._player = this.game.add.sprite(playerPos.x, playerPos.y, 'player');
      this.columnas = this.map.createLayer('Columnas');
      this.groundLayer = this.map.createLayer('Suelo');
      this.arboles = this.map.createLayer('Arboles');
      // Layers de plano de muerte y enemigos
      this.death = this.map.createLayer('Muerte');
      this.enemies = this.map.createLayer('Enemigos');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Muerte');
      this.map.setCollisionBetween(1, 5000, true, 'Suelo');
      this.death.visible = false;
      this.enemies.visible = false;
      //Cambia la escala a x3.
      /*this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);*/

      this.backgroundLayer.resizeWorld();
      this.groundLayer.resizeWorld();
      this.columnas.resizeWorld();
      this.arboles.resizeWorld();
      this.pared.resizeWorld();
      this.death.resizeWorld();
      this.enemies.resizeWorld();

      //this.groundLayer.resizeWorld(); //resize world and adjust to the screen

      //Creamos al player con un sprite por defecto.
      
      //this._prueba = this.game.add.sprite(30, 10, 'player_fight');

      //Creamos a los enemigos en un grupo con fisicas activadas por defecto.
      this._enemy1 = this.game.add.sprite(200, 250, 'enemy');
      this._enemy2 = this.game.add.sprite(1050, 250, 'enemy');
      /*this._enemies = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
      this._enemies.create(200, 250, 'enemy');
      this._enemies.create(750, 300, 'enemy');*/
      
      //nombre de la animación, frames, framerate, isloop
      this._player.animations.add('run', Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._player.animations.add('stop', Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._player.animations.add('jump', Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      this.configure();

      // Code for the pause menu
      this.pause = this.game.add.text(0, 0, 'Pause', {font: '30px Sniglet', fill: '#fff' });
      this.pause.inputEnabled = true;
      this.pause.fixedToCamera = true;
      this.pause.cameraOffset.setTo(700, 0);

      this.pause.events.onInputUp.add(function () {
        this.game.paused = true;
        this.menu = this.game.add.sprite(this.game.camera.x + 325, this.game.camera.y + 250, 'menu'); //Esta x e y a ojo
        this.menu.anchor.setTo(0.3, 0.3);

        this.continuetx = this.game.add.text(this.menu.x - 110, this.menu.y - 15, 'Continuar', {font: '30px Sniglet', fill: '#ff0044'});
        this.restarttx = this.game.add.text(this.menu.x - 110, this.menu.y + 25, 'Reiniciar', {font: '30px Sniglet', fill: '#ff0044'});
        this.exittx = this.game.add.text(this.menu.x - 110, this.menu.y + 65, 'Salir', {font: '30px Sniglet', fill: '#ff0044'});

        this.game.input.onDown.add(unpause, this);
      },this);

      // And finally the method that handels the pause menu
      function unpause(event) {
        var w = 800, h = 600;
        // Only act if paused (this.game.paused)
        if(this.game.paused) {
            // Calculate the corners of the menu
            var x1 = w/2 - 480/2, x2 = w/2 + 480/2, //El valor de la division es el tamaño de la imagen para el menu
                y1 = h/2 - 272/2, y2 = h/2 + 272/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2){
                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                if(x > 60 && y > 80 && x < 184 && y < 99){ //Continue
                	this.menu.destroy();
                	this.continuetx.destroy();
                	this.restarttx.destroy();
                	this.exittx.destroy();
            	    this.game.paused = false;
                } else if (x > 60 && y > 117 && x < 166 && y < 137){ //Restart level
                  this._fightNumber = 0;
                  this._player.x = 10;
                  this._player.y = 10;
                	this.game.paused = false;
                	this.game.state.start('play');
                } else if (x > 60 && y > 155 && x < 113 && y < 180) { //Restart
                  this._fightNumber = 0;
                  this._player.x = 10;
                  this._player.y = 10;
                	this.game.paused = false;
                	this.game.state.start('menu');
                }
            }
            else{
                // Remove the menu and the label
                this.menu.destroy();
                this.continuetx.destroy();
                this.restarttx.destroy();
                this.exittx.destroy();

                // Unpause the game
                this.game.paused = false;
            }
        }
      }
    },
    
    /* ---------------------------------------------------------------UPDATE-----------------------------------------------------------*/

    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._player, this.groundLayer);
        var collisionWithTilemap1 = this.game.physics.arcade.collide(this._enemy1, this.groundLayer);
        var movement = this.GetMovement();

        //transitions
        switch(this._playerState) {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._player.y;
                    this._player.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._player.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._player.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                var currentJumpHeight = this._player.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._player.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._player.animations.play('stop');
                    }
                }
                break;     
        }
        //States
        switch(this._playerState) {
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._player.scale.x < 0)
                        this._player.scale.x *= -1;
                }
                else{
                    moveDirection.x = -this._speed;
                    if(this._player.scale.x > 0)
                        this._player.scale.x *= -1; 
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection, 5, this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();
        //this.distanceEnemy(this._fightNumber);
    },

    //Funcion que utilizamos para guardar estas variables al cambiar de un state a otro.
    shutdown: function() {
      playerPos.x = this._player.x;
      playerPos.y = this._player.y;

      enemyFighted = this._fightNumber;
    },

    //Funciones para el cambio de escena con los enemigos
    distanceEnemy: function(x){
      if(this._player.x < this._enemy1.x && this._player.x > this._enemy1.x - 100 && x == 0){
        this._fightNumber++;
        this.game.state.start('fight');
      } else if (this._player.x < this._enemy2.x && this._player.x > this._enemy2.x - 100 && x == 1) {
        this._fightNumber++;
        this.game.state.start('fight');
      }
    },
    
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
      this._fightNumber = 0;
      this._player.x = 10;
      this._player.y = 10;
      this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._player, this.death))
            this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._player.body.blocked.down || this._player.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._player);
        
        this._player.body.bounce.y = 0.2;
        this._player.body.gravity.y = 20000;
        this._player.body.gravity.x = 0;
        this._player.body.velocity.x = 0;
        this.game.camera.follow(this._player);

		this.game.physics.arcade.enable(this._enemy1);
        this._enemy1.body.bounce.y = 0.2;
        this._enemy1.body.gravity.y = 20000;
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._player.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._player.x < xMin && point.x < 0) || (this._player.x > xMax && point.x > 0))
            this._player.body.velocity.x = 0;
    },

    OnEndPlayState: function () {
        this.game.world.setBounds(0, 0, 800, 600);
        this.tilemap.destroy();
        this.tiles.destroy();
    }
};

module.exports = PlayScene;

},{}]},{},[3]);
