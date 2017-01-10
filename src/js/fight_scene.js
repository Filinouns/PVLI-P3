var FightScene = {
	create: function() {
	  //Textos de dialogos
      this.text1 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo1
      this.text1.visible = false;
      this.text2 = this.game.add.text(100, 100, 'Probando shit', {font: '30px Sniglet', fill: '#fff' }); //tx enemigo2
      this.text2.visible = false;
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

		console.log ('fight scene');
		this.game.stage.backgroundColor = "#56b24d";
		var button = this.game.add.button(400, 300, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.set(0.5);
        var text = this.game.add.text(0, 0, "Volver al play");
        text.anchor.set(0.5);
        button.addChild(text);
	},

	shutdown: function() {

	},

	actionOnClick: function(){
		this.game.state.start('play');
	}
};

module.exports = FightScene;