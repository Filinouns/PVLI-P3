'use strict';

var fightStage = 0;

var FightScene = {
	_enemy: {},
	_enemyPet: {},
	_player: {},
	_playerPet: {},
	_buddy: {},
	_fightNumber: fightStage,

	create: function() {
		this.fightText = this.game.add.text(this.game.centerX, this.game.centerY, 'FIGHT!', {font: '30px Sniglet', fill: '#fff' });
		this.fightText.visible = false;
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.onSpacePress, this);

		// FightNumber
		switch(this._fightNumber) {
            case 0:
            	//Creamos las imagenes necesarias
            	this.text1 = this.game.add.text(500, 100, 'Bienvenido al sistema de combate de "Mountain Meeting Tales!"', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo1
            	this.text1_1 = this.game.add.text(500, 100, 'Blablabla', {font: '30px Sniglet', fill: '#fff' });
            	this.text1_1.visible = false;
            	this._player = this.game.add.sprite(10, 10, 'player_fight');
            	this._playerPet = this.game.add.sprite(10, 300, 'playerPet1');
            	this._playerPet.visible = false;
            	this._enemy = this.game.add.sprite(500, 10, 'enemy_fight');
            	this._enemyPet = this.game.add.sprite(500, 300, 'enemyPet1');
            	this._enemyPet.visible = false;

            	//Iniciamos las variables necesarias
            	this._playerPet.hp = 100;
            	this._enemyPet.hp = 100;

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

		console.log ('Fight scene');
		this.game.stage.backgroundColor = "#56b24d";

		//Boton Temporal
		var button = this.game.add.button(100, 550, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.set(0.5);
        var text = this.game.add.text(0, 0, "Volver al play");
        text.anchor.set(0.5);
        button.addChild(text);

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
		
	},

	shutdown: function () {
		fightStage = this._fightNumber;
	},

	onSpacePress: function () {
		console.log('Espacio pulsado!');
		switch(this._fightNumber) {
            case 0:
            	if(this.text1.visible){
            		this.text1.visible = false;
            		this.text1_1.visible = true;
            	} else if (this.text1_1.visible) {
            		this.text1_1.visible = false;
            		this.fightText = true;
            		this._playerPet.visible = true;
            		this._enemyPet.visible = true;
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

	},

	actionOnAttack: function () {

	},

	actionOnClick: function () {
		this._fightNumber++;
		this.game.state.start('play');
	}
};

module.exports = FightScene;