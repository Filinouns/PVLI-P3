'use strict';

// Cambiar todo el codigo para que tengas que elegir entre 3 "pokemons" al empezar el combate y el "pokemon" del enemigo siempre sera aleatorio.
// La variable fightStage solo se utilizara la primera vez para explicarle al jugador las mecanicas de combate.

var fightStage = 0;
var initialHp = 100;
var initialArmor = 0;

var FightScene = {
	_enemy: {},
	_enemyPet: {},
	_player: {},
	_playerPet: {},
	_buddy: {},
	_fightNumber: fightStage,
	_initialHp: initialHp,
	_initialArmor: initialArmor,

	create: function() {
		this.game.stage.backgroundColor = "#56b24d";

		// Texto para el inicio de combate
		this.fightText = this.game.add.text(300, 100, 'FIGHT!', {font: '30px Sniglet', fill: '#fff' });
		this.fightText.visible = false;

		// Variable para detectar cuando se pulsa el espacio
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.onSpacePress, this);

		// FightNumber
		switch(this._fightNumber) {
            case 0:
            	//Creamos las imagenes necesarias
            	this.text1 = this.game.add.text(175, 100, 'Bienvenido al sistema de combate', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo1
            	this.text1_1 = this.game.add.text(225, 150, 'de Mountain Meeting Tales!', {font: '30px Sniglet', fill: '#fff' });
            	this.textSpace = this.game.add.text(300, 450, 'Presiona "Espacio" para continuar', {font: '15px Sniglet', fill: '#fff' });
            	this.text1_3 = this.game.add.text(500, 100, 'Blablabla', {font: '30px Sniglet', fill: '#fff' });
            	this.text1_3.visible = false;
            	this._player = this.game.add.sprite(10, 10, 'player_fight');
            	this._playerPet = this.game.add.sprite(10, 300, 'playerPet1');
            	this._playerPet.visible = false;
            	this._enemy = this.game.add.sprite(500, 10, 'enemy_fight');
            	this._enemyPet = this.game.add.sprite(500, 300, 'enemyPet1');
            	this._enemyPet.visible = false;
            	break;
            case 1:
                this.text2 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo2
    			this.text2.visible = true;

                break;
            case 2:
                
                break;
            case 3:
                
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

		//Textos de dialogos
    	this.text3 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo3
    	this.text3.visible = false;
    	this.text4 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo4
    	this.text4.visible = false;
    	this.text5 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo5
    	this.text5.visible = false;
    	this.text6 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo6
    	this.text6.visible = false;
    	this.text7 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo7
    	this.text7.visible = false;
    	this.text8 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx colega
    	this.text8.visible = false;

        //Botones de ataque y defensa
        var buttonAtq = this.game.add.button(280, 550, 'button', this.actionOnAttack, this, 2, 1, 0);
        buttonAtq.anchor.set(0.5);
        var attText = this.game.add.text(0, 0, 'Atacar');
        attText.anchor.set(0.5);
        buttonAtq.addChild(attText);

        var buttonDef = this.game.add.button(460, 550, 'button', this.actionOnDefense, this, 2, 1, 0);
        buttonDef.anchor.set(0.5);
        var defText = this.game.add.text(0, 0, 'Defense');
        defText.anchor.set(0.5);
        buttonDef.addChild(defText);
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
		} else if (this._playerPet.hp < 1) {
			var button = this.game.add.button(100, 550, 'button', this.actionOnDefeat, this, 2, 1, 0);
        	button.anchor.set(0.5);
        	var textDer = this.game.add.text(0, 0, "Derrota");
        	textDer.anchor.set(0.5);
			button.addChild(textDer);
		}
	},

	shutdown: function () {
		fightStage = this._fightNumber;
		initialArmor = this._initialArmor;
		initialHp = this._initialHp;
	},

	onSpacePress: function () {
		switch(this._fightNumber) {
            case 0:
            	if(this.text1.visible){
            		this.text1.visible = false;
            		this.text1_1.visible = false;
            		this.text1_3.visible = true;
            	} else if (this.text1_3.visible) {
            		this.text1_3.visible = false;
            		this.fightText.visible = true;
            		this._playerPet.visible = true;
            		this._enemyPet.visible = true;
            	} else {
            		this.fightText.visible = false;
            		this.textSpace.visible = false;
            	}
            	break;
            case 1:

                break;
            case 2:
                
                break;
            case 3:
                
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
		this._fightNumber = 0;
		this.game.state.start('gameOver');
	},

	actionOnVictory: function () {
		this._fightNumber++;
		this._initialHp = 100;
		this._initialArmor = 0;
		this.game.state.start('play');
	}
};

module.exports = FightScene;