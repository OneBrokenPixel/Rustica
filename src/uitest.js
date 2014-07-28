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

    //var background = game.add.image(game.width/2, game.height/2, "background");
    //background.anchor.setTo(0.5, 0.5);

    panel = game.add.image(20,25, "panel");
    
    panelGroup = game.add.group();
    panelGroup.x = panel.x;
    panelGroup.y = panel.y;

    scrollLine = game.add.image(0, 0, "ui", "grey_sliderVertical.png");
    scrollLine.height = panel.height - 10;
    scrollLine.x = panel.x + panel.width - 10;
    scrollLine.y = panel.y + 10/2;

    //scrollCircle = game.add.image(0,0,"ui", "grey_sliderEnd.png");
    //scrollCircle.width *= 2.2;
    //scrollCircle.height *= 2.2;
    scrollCircle = game.add.image(0,0,"grip");
    scrollCircle.x = scrollLine.x - scrollCircle.width - 3;
    scrollCircle.y = scrollLine.y;
    
    var i, y=10;
    for (i=0; i < 100; i++) {
        var button = new Phaser.Button(game, 15, y, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        panelGroup.add(button);
        y += button.height + 10;
    }
    y += 10;
    
    /*
    panelMask = game.add.image(0,0,"panelMask");
    panelMask.anchor.setTo(0.5, 0.5);
    panelMask.x = panel.x + panel.width/2;
    panelMask.y = panel.y + panel.height/2;
    panelMask.z = 1;
    */

    
    var myMask = new PIXI.Graphics();
    myMask.beginFill();
    myMask.drawRect(panel.x-1, panel.y+1, panel.width+1, panel.height-2);
    myMask.endFill();
    panelGroup.mask = myMask;

    scrollCircle.inputEnabled = true;
    scrollCircle.input.enableDrag(false, false, false, 255, 
                                  new Phaser.Rectangle(scrollCircle.x, scrollCircle.y, 
                                                       scrollCircle.width, scrollLine.height));
    scrollCircle.input.allowHorizontalDrag = false;


    contentSize = y;
    windowSize = panel.height;
    trackSize = scrollLine.height;
    windowContentRatio = windowSize/contentSize;

    scrollCircle.height = trackSize * windowContentRatio;
    windowScrollAreaSize = contentSize - windowSize;
    trackScrollAreaSize = trackSize - scrollCircle.height; 

    dragRatio = windowScrollAreaSize / trackScrollAreaSize;

    this.scrollpanel = new Rustica.UI.Scrollpanel(game, 300, 25, panel.width, panel.height, 
                                                 new Phaser.Image(game, 0, 0, "panel"));

    for (i=0; i<20; i++) {
        var button = new Phaser.Button(game, 15, y, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        this.scrollpanel.add(button);
    }
    
}

function update() {
    panelGroup.y = scrollLine.y - ((scrollCircle.y-scrollLine.y) * dragRatio);
    this.scrollpanel.update();
}

function render() {
}

function buttonDown() {
    console.log("pressed");
}
