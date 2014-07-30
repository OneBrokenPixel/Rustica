var game = new Phaser.Game(1024, 600, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

function preload() {

    // centre the canvas
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
    
    game.load.atlasXML("ui",  "assets/ui/greySheet.png", "assets/ui/greySheet.xml" );
    game.load.image("background", "assets/ui/background.png");
    game.load.image("panel", "assets/ui/panel.png");
    game.load.image("panelMask", "assets/ui/panelMask.png");
    game.load.image("grip", "assets/ui/grip.png.");
}

var panel;        // window
var panelGroup;   // content

var scrollLine;   // track
var scrollCircle; // grip

var contentRatio;
var contentSize;
var windowSize;
var trackSize;
var windowContentRatio;
var windowScrollAreaSize;
var trackScrollAreaSize;
var gripPositionOnTrack;
var mouseY;
var dragRatio;

function create() {
    game.stage.backgroundColor = "#FFFFFF";
    
    /*
    panelMask = game.add.image(0,0,"panelMask");
    panelMask.anchor.setTo(0.5, 0.5);
    panelMask.x = panel.x + panel.width/2;
    panelMask.y = panel.y + panel.height/2;
    panelMask.z = 1;
    */


    var panel = new Phaser.Image(game, 0,0, "panel");
    this.scrollpanel = new Rustica.UI.Scrollpanel(game, 300, 25, panel.width, panel.height, panel);

    for (i=0; i<100; i++) {
        var button = new Phaser.Button(game, 0, 0, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        this.scrollpanel.addItem(button);
    }
    


}

function update() {

    //this.scrollpanel.update();
}

function render() {
}

function buttonDown() {
    console.log("pressed");
}
