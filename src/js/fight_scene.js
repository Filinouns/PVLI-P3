'use strict';

// Cambiar todo el codigo para que tengas que elegir entre 3 "pokemons" al empezar el combate y el "pokemon" del enemigo siempre sera aleatorio.
// La variable fightStage solo se utilizara la primera vez para explicarle al jugador las mecanicas de combate.

var fightStage = 0;
var initialHp = 100;
var initialArmor = 0;
var clicks = 0;
var style = {font: '30px Sniglet', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
var finalBoss = false;

var FightScene = {
	_boss: finalBoss,
	_tutorial: false,
	_enemy: {},
	_enemyPet: {},
	_enemyPetvars: {},
	_player: {},
	_playerPet: {},
	_playerPetvars: {},
	_buddy: {},
	_fightNumber: fightStage,
	_initialHp: initialHp,
	_initialArmor: initialArmor,

	create: function () {
		this.game.stage.backgroundColor = "#56b24d";

		// Texto para el inicio de combate
		this.fightText = this.game.add.text(300, 100, 'FIGHT!', style);
		this.fightText.visible = false;
		this.textSpace = this.game.add.text(275, 450, 'Presiona "Espacio" para continuar', {font: '15px Sniglet', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' });

		// Variable para detectar cuando se pulsa el espacio
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.onSpacePress, this);

		// FightNumber
		switch(this._fightNumber) {
            case 0:
            	//Creamos las imagenes necesarias
            	this.text = this.game.add.text(175, 100, 'Bienvenido al sistema de combate \n de Mountain Meeting Tales', style);
            	this._player = this.game.add.sprite(10, 10, 'player_fight');
            	//this._playerPet.visible = false;
            	this._enemy = this.game.add.sprite(750, 245, 'enemy');
            	this.enemyPet();
            	break;
            case 1:
                this.text = this.dialogos();
                this._enemy = this.game.add.sprite(750, 245, 'enemy');
                this.enemyPet();
                break;
            case 2:
                this.text = this.dialogos();
                this._enemy = this.game.add.sprite(750, 245, 'enemy');
                this.enemyPet();
                break;
            case 3:
                this.text = this.dialogos();
                this._enemy = this.game.add.sprite(750, 245, 'enemy');
                this.enemyPet();
                break;
            case 4:
                this.text = this.dialogos();
                this._enemy = this.game.add.sprite(750, 245, 'enemy');
                this.enemyPet();
                break;
            case 5: //Boss
                this.text = this.bossText();
                this._enemy = this.game.add.sprite(750, 300, 'buddy');
                this._enemy.scale.setTo(0.3, 0.3);
                this.enemyPet();
                break;
        }

        this._playerPet = this.game.add.sprite(200, 300, 'playerPet');
        this._enemy.visible = false;
        this._enemy.scale.x *= -1;
        this._enemyPet.visible = false;

        // Inicializacion de la vida y armadura
		this._playerPetvars.hp = this._initialHp;
		this._playerPetvars.armor = this._initialArmor;
		this._enemyPetvars.hp = this._initialHp;
		this._enemyPetvars.armor = this._initialArmor;

        // Textos de la vida y la armadura
        this.enemyPetHp = this.game.add.text(625, 565, 'Hp enemigo: ' + this._enemyPetvars.hp + '/100', {font: '10px Sniglet', fill: '#fff' });
        this.enemyPetArmor = this.game.add.text(625, 575, 'Armor enemigo: ' + this._enemyPetvars.armor, {font: '10px Sniglet', fill: '#fff' });
        this.playerPetHp = this.game.add.text(625, 525, 'Hp aliado: ' + this._playerPetvars.hp + '/100', {font: '10px Sniglet', fill: '#fff' });
        this.playerPetArmor = this.game.add.text(625, 535, 'Armor aliado: ' + this._playerPetvars.armor, {font: '10px Sniglet', fill: '#fff' });

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
		this.playerPetHp.setText('Hp aliado: ' + this._playerPetvars.hp + '/100');
		this.playerPetArmor.setText('Armor aliado: ' + this._playerPetvars.armor);
		this.enemyPetHp.setText('Hp enemigo: ' + this._enemyPetvars.hp + '/100');
		this.enemyPetArmor.setText('Armor enemigo: ' + this._enemyPetvars.armor);

		this._enemyPet.animations.play('idle');

		//Poner aqui una cuenta atras que cada x tiempo haga la animacion de ataque

		// Condicion de cierre del state
		if (this._enemyPetvars.hp < 1) {
			var button = this.game.add.button(100, 550, 'button', this.actionOnVictory, this, 2, 1, 0);
        	button.anchor.set(0.5);
        	var textVic = this.game.add.text(0, 0, "Victoria!");
        	textVic.anchor.set(0.5);
        	button.addChild(textVic);
        	this.buttonAtq.visible = false;
        	this.buttonDef.visible = false;
		} else if (this._playerPetvars.hp < 1) {
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
		finalBoss = this._boss;
	},

	/*-----------------------------------------------------------Creacion objetos------------------------------------------------------------*/

	enemyPet: function () { //Se podran crear todas las animaciones a la vez?
		var random = this.getRandomArbitrary(0, 5); //random de 0 a 5

		if(this._boss){ // Sprite boss
			this._enemyPet = this.game.add.sprite(550, 300, 'drakePet');
			this._enemyPet.scale.x *= -1;
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,5,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,5,'',1),4,true);
			random = 7;
		}

		if (random < 1){ //Sprite avestruz
			this._enemyPet = this.game.add.sprite(550, 300, 'chocoPet');
			this._enemyPet.scale.x *= -1;
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,4,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,3,'',1),4,true);
		} else if (random < 2) { //Sprite hipopotamo
			this._enemyPet = this.game.add.sprite(450, 300, 'hippoPet');
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,4,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,4,'',1),4,true);
		} else if (random < 3) { // Sprite rinoceronte
			this._enemyPet = this.game.add.sprite(550, 300, 'rinhoPet');
			this._enemyPet.scale.x *= -1;
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,7,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,4,'',1),4,true);
		} else if (random < 4) { //Sprite tigre
			this._enemyPet = this.game.add.sprite(450, 300, 'taigerPet');
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,4,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,5,'',1),4,true);
		} else if (random < 5) { //Sprite lobo
			this._enemyPet = this.game.add.sprite(550, 300, 'wolfiePet');
			this._enemyPet.scale.x *= -1;
			this._enemyPet.animations.add('attack', Phaser.Animation.generateFrameNames('attack',1,5,'',1),4,false);
			this._enemyPet.animations.add('idle', Phaser.Animation.generateFrameNames('estar',1,4,'',1),4,true);
		}/* else { //Shiny xD (random = 5)
			return this.game.add.sprite(450, 300, 'shiny');
		}*/
	},

	/*--------------------------------------------------------Textos--------------------------------------------------*/

	dialogos: function () {
		var random = this.getRandomArbitrary(0, 10);

		if (random >= 0 && random < 1){
			return this.game.add.text(100, 100, 'Tienes la esperanza de llegar al otro lado? \n Menudo novato', style);
		} else if (random >= 1 && random < 2) {
			return this.game.add.text(100, 100, '¿Crees que puedes pasar por encima mio?', style);
		} else if (random >= 2 && random < 3) {
			return this.game.add.text(100, 100, 'Esos compañeros que tienes no \n te ayudaran en esta batalla', style);
		} else if (random >= 3 && random < 4) {
			return this.game.add.text(100, 100, 'Mmmmm que buena pinta tienen esos bocatas,\n Damelos!', style);
		} else if (random >= 4 && random < 5) {
			return this.game.add.text(100, 100, 'Sere el único que llege \n al otro lado de la montaña', style);
		} else if (random >= 5 && random < 6) {
			return this.game.add.text(100, 100, 'Bocatas, bocatas, bocatas, bocataaaaaas!!', style);
		} else if (random >= 6 && random < 7) {
			return this.game.add.text(100, 100, 'Llevo 3 dias sin comer...\n dame algun bocata porfavor... \n aaagg estos no son comestibles \n ¡Maldito!', style);
		} else if (random >= 7 && random < 8) {
			return this.game.add.text(100, 100, 'Si fueras listo habrias vuelto \n con mami hace tiempo', style);
		} else {
			return this.game.add.text(100, 100, 'Solo hay 3 cosas infinitas: el universo,\n la ustupidez humana \n y las ganas que tengo de quedarme esos bocatas', style);
		}
	},

	bossText: function () {
		return this.game.add.text(100, 100, 'Al fin has llegado Jonny \n llevo esperandote horas', style);
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

	finalText: function () {
		switch (clicks) {
			case 0:
				this.text.setText('Anda pasa esos bocatas que tenia unas ganas ya...');
				break;
			case 1:
				this.text.setText('Vas a pelear contra mi por la mejor ración');
				break;
			case 2:
				this.text.setText('Y si no te gusta aprende a \n llegar antes la proxima vez!');
				break;
		}
	},

	onSpacePress: function () {
		switch(this._fightNumber) {
            case 0:
            	if (!this._tutorial) {
            		this.tutorial();
            		clicks++;
            	} else if (this._enemyPet.visible) {
            		this.fightText.visible = false;
            	} else {
            		this.fightText.visible = true;
            		this.text.visible = false;
            		this.textSpace.visible = false;
            		clicks = 0;
            		this.startBattle();
            		//batalla
            	}
            	break;
            case 1:
            	this.text.visible = false;
            	this.textSpace.visible = false;
            	this.startBattle();
                break;
            case 2:
            	this.text.visible = false;
            	this.textSpace.visible = false;
            	this.startBattle();
                break;
            case 3:
            	this.text.visible = false;
            	this.textSpace.visible = false;
            	this.startBattle();
                break;
            case 4:
            	this.text.visible = false;
            	this.textSpace.visible = false;
            	this.startBattle();
                break;
            case 5: //Boss
            	if (clicks <= 2){
            		this.finalText();
            		clicks++;
            	} else {
            		clicks = 0;
            		this.text.visible = false;
            		this.textSpace.visible = false;
            		this.startBattle();
            	}
                break;
        }
	},

	getRandomArbitrary: function (min, max) {
		return Math.random() * (max - min) + min;
	},

	/*-----------------------------------------------------Combate------------------------------------------------*/

	startBattle: function () {
		this._enemyPet.visible = true;
		this._enemy.visible = true;
	},

	enemyAttack: function () {
		var random = this.getRandomArbitrary(0, 3);
		if (random < 2) { //Ataque de mascotas normales
			if (this._fightNumber < 5) {
				this._playerPetvars.hp = this._playerPetvars.hp - (10 - this._playerPetvars.armor);
			} else { //Ataque del boss
				this._playerPetvars.hp = this._playerPetvars.hp - (11 - this._playerPetvars.armor);
				if (random < 0.3) {
					console.log("defensa extra");
					this._enemyPetvars.armor++;
				}
			}
		} else if (random >= 2) {
			if (this._enemyPetvars.armor < 5) {
				this._enemyPetvars.armor++;
			} else {
				this._playerPetvars.hp = this._playerPetvars.hp - (10 - this._playerPetvars.armor);
			}
		}
	},

	actionOnDefense: function () {
		if(!this.textSpace.visible){
			if(this._playerPetvars.armor < 6){
				this._playerPetvars.armor++;
				this.enemyAttack();
			} else {
				this.enemyAttack();
			}
		}
	},

	actionOnAttack: function () {
		if(!this.textSpace.visible){
			this._enemyPetvars.hp = this._enemyPetvars.hp - (10 - this._enemyPetvars.armor);
			this.enemyAttack();
		}
	},

	actionOnDefeat: function () {
		this.game.state.start('fight');
	},

	actionOnVictory: function () {
		switch(this._fightNumber) {
			case 0: 
				this._fightNumber = 1;
				break;
			case 1: 
				this._fightNumber = 2;
				break;
			case 2: 
				this._fightNumber = 3;
				break;
			case 3: 
				this._fightNumber = 4;
				break;
			case 4: 
				this._fightNumber = 5;
				this._boss = true;
				break;
			case 5: 
				this._fightNumber = 0;
				this._boss = false;
				break;
		}

		this._initialHp = 100;
		this._initialArmor = 0;
		this.game.state.start('play');
	}
};

module.exports = FightScene;