var game = new Phaser.Game(1024, 800, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});



Rustica.UI.ProgressBar = function (game, x, y, width, height, backgroundImg, progressBarImg, progress, progressBarOffset) {
    Rustica.UI.Pane.call(this, game, x, y, width, height, backgroundImg);
    
    this.progressBarImg = null;
    this.progressBarOffset = { left:0, right:0, top:0, bottom:0};
    
    if(progressBarImg){
    	this.changeProgressBar(progressBarImg);
    }
    	
    if(progress){
    	this.setProgress(progress);
    }	
	else{
		this.setProgress(0);
	}
    
	if( progressBarOffset ){
		this.progressBarOffset = progressBarOffset;
	}
	
	console.log(this.progressBarOffset);
	
    return this;
};

Rustica.UI.ProgressBar.prototype = Object.create(Rustica.UI.Pane.prototype);
Rustica.UI.ProgressBar.prototype.constructor = Rustica.UI.Scrollpane;

Rustica.UI.ProgressBar.prototype.setProgress = function(progress) {
	this.progressBarImg.width = this.width * progress.clamp(0,1);
}

Rustica.UI.ProgressBar.prototype.changeProgressBar = function (progressBarImg) {

	if (this.progressBarImg)
        this.progressBarImg.destroy();

    this.progressBarImg = progressBarImg;
    this.progressBarImg.x = this.progressBarOffset["left"];
    this.progressBarImg.y = this.progressBarOffset["top"];
    this.progressBarImg.width = this.width - (this.progressBarOffset["left"]+this.progressBarOffset["right"]);
    this.progressBarImg.height = this.height - (this.progressBarOffset["top"]+this.progressBarOffset["bottom"]);
    this.add(this.progressBarImg);
};



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
	cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());
    var panel = new Phaser.Image(game, 0,0, "panel");
    
    this.scrollpanel = new Rustica.UI.Scrollpane(game, 20, 50, panel.width, panel.height, panel);

    for (i=0; i<100; i++) {
        var button = new Phaser.Button(game, 0, 0, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        this.scrollpanel.addItem(button);
    }
*/
	var bgImg = new Phaser.Image(game, 0,0, "grey_sliderHorizontal.png");
	var barImg = new Phaser.Image(game, 0,0, "grey_button00.png");
	this.progressBar = new Rustica.UI.ProgressBar(game,20,50,100,10,bgImg,barImg,0.5, { left:2, right:2, top:2, bottom:2});

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
