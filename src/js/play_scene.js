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

  //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      this._player = this.game.add.sprite(playerPos.x, playerPos.y, 'player');

      //Creamos a los enemigos en un grupo con fisicas activadas por defecto.
      this._enemy1 = this.game.add.sprite(200, 250, 'enemy');
      this._enemy2 = this.game.add.sprite(1050, 250, 'enemy');
      /*this._enemies = this.game.add.physicsGroup(Phaser.Physics.ARCADE);
      this._enemies.create(200, 250, 'enemy');
      this._enemies.create(750, 300, 'enemy');*/

      //Creacion e implementacion del tilemap
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('patrones', 'tiles');

      //Creacion de las layers
      this.backgroundLayer = this.map.createLayer('BackgroundLayer');
      this.groundLayer = this.map.createLayer('GroundLayer');
      //plano de muerte
      this.death = this.map.createLayer('Death');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.death.visible = false;
      //Cambia la escala a x3.
      this.groundLayer.setScale(3,3);
      this.backgroundLayer.setScale(3,3);
      this.death.setScale(3,3);
      
      //this.groundLayer.resizeWorld(); //resize world and adjust to the screen
      
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
        this.distanceEnemy(this._fightNumber);
    },

    //Funcion que utilizamos para guardar estas variables al cambiar de un state a otro.
    shutdown: function() {
      playerPos.x = this._player.x;
      playerPos.y = this._player.y;

      enemyFighted = this._fightNumber;
    },

    //Funciones para el cambio de escena con los enemigos, no se hacerlo todo en una asique habra varias (bastante feote)
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
        
        if((this._player.x < xMin && point.x < 0)|| (this._player.x > xMax && point.x > 0))
            this._player.body.velocity.x = 0;
    },

    OnEndPlayState: function () {
        this.game.world.setBounds(0, 0, 800, 600);
        this.tilemap.destroy();
        this.tiles.destroy();
    }
};

module.exports = PlayScene;
