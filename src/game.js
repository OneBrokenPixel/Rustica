var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

function preload() {

    // centre the canvas
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
    
    game.load.image('lammas', 'assets/Lammas.jpg');

}

function create() {
	
	var lammas = game.add.sprite(game.width/2, game.height/2, 'lammas');
	lammas.anchor.setTo(0.5, 0.5);
	
	lammas.scale.x = 2
	lammas.scale.y = 2
}

function update() {
}

function render() {
}

