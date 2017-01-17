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
    _enemy3: {},
    _enemy4: {},
    _enemy5: {},
    _prueba: {}, //No se usa normalmente

  //Método constructor...
  create: function () {
      //Creacion e implementacion del tilemap
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');

      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('Paisaje');
      this.pared = this.map.createLayer('Pared');
      this.columnas = this.map.createLayer('Columnas');
      //Creamos al player con un sprite por defecto. (lo creamos aqui para que las layers que se añaden despues queden por delante delñ player).
      this._player = this.game.add.sprite(playerPos.x, playerPos.y, 'player');
      this.groundLayer = this.map.createLayer('Suelo');
      this.arboles = this.map.createLayer('Arboles');
      // Layers de plano de muerte y enemigos
      this.death = this.map.createLayer('Muerte');
      this.enemies = this.map.createLayer('Enemigos');
      this.enemies.visible = true;
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

      //Creamos a los enemigos en un grupo con fisicas activadas por defecto.
      this._enemy1 = this.game.add.sprite(450, 185, 'enemy');
      this._enemy2 = this.game.add.sprite(1050, 325, 'enemy');
      this._enemy3 = this.game.add.sprite(650, 620, 'enemy');
      this._enemy4 = this.game.add.sprite(450, 810, 'enemy');
      this._enemy5 = this.game.add.sprite(1650, 810, 'enemy');
      this._boss = this.game.add.sprite(2600, 10, 'enemy');
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
        var colenmy1 = this.game.physics.arcade.collide(this._enemy1, this.groundLayer, this.collision(colenmy1));
        var colenmy2 = this.game.physics.arcade.collide(this._enemy2, this.groundLayer, this.collision(colenmy2));
        var colenmy3 = this.game.physics.arcade.collide(this._enemy3, this.groundLayer, this.collision(colenmy3));
        var colenmy4 = this.game.physics.arcade.collide(this._enemy4, this.groundLayer, this.collision(colenmy4));
        var colenmy5 = this.game.physics.arcade.collide(this._enemy5, this.groundLayer, this.collision(colenmy5));
        var colboss = this.game.physics.arcade.collide(this._boss, this.groundLayer, this.collision(colboss));
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
                if((currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight) && !collisionWithTilemap){
                    this._playerState = PlayerState.JUMP;
                }
                else {
                  this._playerState = PlayerState.FALLING;
                }
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
                else if (movement === Direction.LEFT){
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

    collision: function(aux) {
      if(aux == this.colenmy1) {
        this._enemy1.body.blocked.down;
      } else if (aux == this.colenmy2) {
        this._enemy2.body.blocked.down;
      } else if (aux == this.colenmy3) {
        this._enemy3.body.blocked.down;
      } else if (aux == this.colenmy4) {
        this._enemy4.body.blocked.down;
      } else if (aux == this.colenmy5) {
        this._enemy5.body.blocked.down;
      } else if (aux == this.colboss) {
        this._boss.body.blocked.down;
      }
    },

    //Funciones para el cambio de escena con los enemigos
    distanceEnemy: function(aux){
      if(this._player.x < this._enemy1.x && this._player.x > this._enemy1.x - 100 && aux == 0){
        this._fightNumber = 1;
        this.game.state.start('fight');
      } else if (this._player.x < this._enemy2.x && this._player.x > this._enemy2.x - 100 && aux == 1) {
        this._fightNumber = 2;
        this.game.state.start('fight');
      } else if (this._player.x < this._enemy3.x + 100 && this._player.x > this._enemy3.x && aux == 2) {
        this._fightNumber = 3;
        this.game.state.start('fight');
      } else if (this._player.x < this._enemy4.x && this._player.x > this._enemy4.x - 100 && aux == 3 && this._player.y + 100 > this._enemy4.y) {
        this._fightNumber = 4;
        this.game.state.start('fight');
      } else if (this._player.x < this._enemy5.x && this._player.x > this._enemy5.x - 100 && aux == 4) {
        this._fightNumber = 5;
        this.game.state.start('fight');
      } else if (this._player.x < this._boss.x && this._player.x > this._boss.x - 100 && aux == 5) {
        this._fightNumber = 0;
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
        this.game.world.setBounds(0, 0, 3168, 1200);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._player);
        
        this._player.body.collideWorldBounds = true;
        this._player.body.bounce.y = 0.2;
        this._player.body.gravity.y = 20000;
        this._player.body.gravity.x = 0;
        this._player.body.velocity.x = 0;
        this.game.camera.follow(this._player);

        //Fisicas para los enemigos
		    this.game.physics.arcade.enable(this._enemy1);
        this._enemy1.body.bounce.y = 0.2;
        this._enemy1.body.gravity.y = 2000;
        this.game.physics.arcade.enable(this._enemy2);
        this._enemy2.body.bounce.y = 0.2;
        this._enemy2.body.gravity.y = 2000;
        this.game.physics.arcade.enable(this._enemy3);
        this._enemy3.body.bounce.y = 0.2;
        this._enemy3.body.gravity.y = 2000;
        this.game.physics.arcade.enable(this._enemy4);
        this._enemy4.body.bounce.y = 0.2;
        this._enemy4.body.gravity.y = 2000;
        this.game.physics.arcade.enable(this._enemy5);
        this._enemy5.body.bounce.y = 0.2;
        this._enemy5.body.gravity.y = 2000;
        this.game.physics.arcade.enable(this._boss);
        this._boss.body.bounce.y = 0.2;
        this._boss.body.gravity.y = 2000;
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
