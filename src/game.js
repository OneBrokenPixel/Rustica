var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

var crop;

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
	
	crop = cropModule.getCrop("Wheat");

	cropModule.addField()
	cropModule.getField(0).resize(9);
	cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());
}

function update() {
	
	if( cropModule.getField(0).isHarvestTime( game.time.totalElapsedSeconds() ) ) {
		profit = profit + cropModule.getField(0).harvest();
		cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());
		
		console.log("Wheat Harvested: " + profit);
	}
	
	
}

function render() {
}

