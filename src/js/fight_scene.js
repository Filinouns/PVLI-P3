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