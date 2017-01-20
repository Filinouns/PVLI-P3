var VictoryScene = {
    create: function () {
        console.log("Victory");
        this.game.world.setBounds(0, 0, 800, 600);

        var logo = this.game.add.sprite(0, 0, 'victory');
        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
        button.anchor.set(0.5);
        var text = this.game.add.text(0, 0, "Main Menu");
        text.anchor.set(0.5);
        button.addChild(text);
    },

    actionOnClick: function () {
        this.game.state.start('menu');
    }
};

module.exports = VictoryScene;