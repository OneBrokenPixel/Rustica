var game = new Phaser.Game(800, 600, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

var crop;

function preload() {

    // centre the canvas
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
    
    game.load.image('lammas', 'assets/Lammas.jpg');
    
    game.load.atlasXML("ui",  "assets/ui/greySheet.png", "assets/ui/greySheet.xml" );
    game.load.image("background", "assets/ui/background.png");
    game.load.image("panel", "assets/ui/panel.png");
    game.load.image("panelMask", "assets/ui/panelMask.png");
    game.load.image("grip", "assets/ui/grip.png.");

    game.load.image("hline", "assets/ui/hline.png");
    game.load.image("tab", "assets/ui/tab.png");

}

function create() {
	
	var lammas = game.add.sprite(game.width/2, game.height/2, 'lammas');
	lammas.anchor.setTo(0.5, 0.5);
	
	lammas.scale.x = 2
	lammas.scale.y = 2
		/*
	crop = cropModule.getCrop("Wheat");

	cropModule.addField()
	cropModule.getField(0).resize(9);
	cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());*/
	
    var panel = new Phaser.Image(game, 0,0, "panel");
    
    this.scrollpanel = new Rustica.UI.Scrollpane(game, 20, 50, panel.width, panel.height, panel);

    var button = new Phaser.Button(game, 0, 0, "ui", buttonDown, this, 
                                   "grey_button00.png", "grey_button00.png", 
                                   "grey_button00.png", "grey_button00.png");
    button.width *= 0.85;
    this.scrollpanel.addItem(button);

}

function update() {
	/*
	if( cropModule.getField(0).isHarvestTime( game.time.totalElapsedSeconds() ) ) {
		profit = profit + cropModule.getField(0).harvest();
		cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());
		
		console.log("Wheat Harvested: " + profit);
	}
	*/
	
}

function render() {
}

function buttonDown() {
    console.log("pressed");
}
