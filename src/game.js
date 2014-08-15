var game = new Phaser.Game(1024, 800, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

Rustica.UI.ProgressBar = function (game, x, y, width, height, backgroundImg, progressBarImg, progress, progressBarOffset) {
    Rustica.UI.Pane.call(this, game, x, y, width, height, backgroundImg);
    
    this.progressBarImg = null;
    this.progressBarWidth = 0;
    this.progressBarOffset = { left:0, right:0, top:0, bottom:0};
    
    if( progressBarOffset ){
		this.progressBarOffset.left = progressBarOffset.left;
        this.progressBarOffset.right = progressBarOffset.right;
        this.progressBarOffset.top = progressBarOffset.top;
        this.progressBarOffset.bottom = progressBarOffset.bottom; 
	}

    if(progressBarImg){
    	this.changeProgressBar(progressBarImg);
    }
    	
    if(progress){
    	this.setProgress(progress);
    }	
	else{
		this.setProgress(0);
	}
 	
	
    return this;
};

Rustica.UI.ProgressBar.prototype = Object.create(Rustica.UI.Pane.prototype);
Rustica.UI.ProgressBar.prototype.constructor = Rustica.UI.ProgressBar;

Rustica.UI.ProgressBar.prototype.setProgress = function(progress) {
	this.progressBarImg.width = Math.floor(this.progressBarWidth * progress.clamp(0,1));
}

Rustica.UI.ProgressBar.prototype.changeProgressBar = function (progressBarImg) {

	if (this.progressBarImg)
        this.progressBarImg.destroy();

    this.progressBarImg = progressBarImg;
    this.progressBarImg.x = this.progressBarOffset["left"];
    this.progressBarImg.y = this.progressBarOffset["top"];
    this.progressBarWidth = this.width - (this.progressBarOffset["left"]+this.progressBarOffset["right"]);
    this.progressBarImg.width = this.progressBarWidth;
    this.progressBarImg.height = this.height - (this.progressBarOffset["top"]+this.progressBarOffset["bottom"]);
    this.add(this.progressBarImg);
};


Rustica.Game.Field = function(game) {
	var pane = new Phaser.Image(game, 0,0, "cropUI", "crop_pane.png");
	pane.z = -10;
	Rustica.UI.Pane.call(this, game, 0, 0, pane.width, pane.height, pane);

	this.sizeText = new Phaser.Text(game, 0, 0, "Size: ", { font: "12pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 1 });
	this.costText = new Phaser.Text(game, 0, 0, "Cost: ", { font: "12pt Courier", fill: "#19cb65", stroke: "#119f4e", strokeThickness: 1 });

	var bgImg = new Phaser.Image(game, 0,0, "cropUI", "progressBar_Bg.png");
	var fgImg = new Phaser.Image(game, 0,0, "cropUI", "progressBar_Fg.png");
	
	this.progressBar = new Rustica.UI.ProgressBar(game,0,0,bgImg.width,bgImg.height,bgImg,fgImg,0, { left:2, right:2, top:2, bottom:2});
	
	this.deleteField = new Phaser.Button(game, 0, 0, "cropUI", buttonDown, this, 
    "cross.png", "cross.png", 
    "cross.png", "cross.png");

	//deleteField.anchor.setTo(1, 0);

	this.prevCropButton = new Phaser.Button(game, 0, 0, "cropUI", buttonDown, this, 
		    "left.png", "left.png", 
		    "left.png", "left.png");
	this.nextCropButton = new Phaser.Button(game, 0, 0, "cropUI", buttonDown, this, 
		    "right.png", "right.png", 
		    "right.png", "right.png");
	
		    
	this.cropImage = new Phaser.Image(game, 0,0, "cropUI", "wheat.png");
	
	this.applyAction = new Phaser.Button(game, 0, 0, "cropUI", buttonDown, this, 
    "Plant_Button.png", "Plant_Button.png", 
    "Plant_Button.png", "Plant_Button.png");

	this.addItem(this.sizeText,10,0);
	this.addItem(this.costText,10,14);
	this.addItem(this.progressBar,10,34);
	
	this.addItem(this.deleteField,0,0);
	this.addItem(this.prevCropButton,100,0);
	this.addItem(this.cropImage, 140,0);
	this.addItem(this.nextCropButton,190,0);
	this.addItem(this.applyAction,190,50);

	return this;
}

Rustica.Game.Field.prototype = Object.create(Rustica.UI.Pane.prototype);
Rustica.Game.Field.prototype.constructor = Rustica.Game.Field;


function preload() {

    // centre the canvas
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
       
    game.load.atlasXML("ui",  "assets/ui/greySheet.png", "assets/ui/greySheet.xml" );
    
    game.load.atlasJSONHash("cropUI", "assets/ui/CropPane.png", "assets/ui/CropPane.json");
    
    game.load.image("background", "assets/ui/background.png");
    game.load.image("panel", "assets/ui/panel.png");
    game.load.image("panelMask", "assets/ui/panelMask.png");
    game.load.image("grip", "assets/ui/grip.png.");

    game.load.image("hline", "assets/ui/hline.png");
    game.load.image("tab", "assets/ui/tab.png");

}

function create() {
	
		/*
	crop = cropModule.getCrop("Wheat");

	cropModule.addField()
	cropModule.getField(0).resize(9);
	cropModule.getField(0).plant(crop,game.time.totalElapsedSeconds());
    
    
*/
	var panel = new Phaser.Image(game, 0,0, "panel");
    this.scrollpanel = new Rustica.UI.Scrollpane(game, 20, 50, 400, panel.height, panel);

	this.field = new Rustica.Game.Field(game);
	this.scrollpanel.addItem(this.field);    

}

var process = 0

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
