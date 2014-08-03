var game = new Phaser.Game(1024, 800, Phaser.AUTO, "game", {preload:preload, create:create, update:update, render:render});

function preload() {

    // centre the canvas
    game.scale.pageAlignHorizontally = true;
    game.scale.refresh();
    
    game.load.atlasXML("ui",  "assets/ui/greySheet.png", "assets/ui/greySheet.xml" );
    game.load.image("background", "assets/ui/background.png");
    game.load.image("panel", "assets/ui/panel.png");
    game.load.image("panelMask", "assets/ui/panelMask.png");
    game.load.image("grip", "assets/ui/grip.png.");

    game.load.image("hline", "assets/ui/hline.png");
    game.load.image("tab", "assets/ui/tab.png");
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



    var panel = new Phaser.Image(game, 0,0, "panel");
    
    this.scrollpanel = new Rustica.UI.Scrollpane(game, 20, 50, panel.width, panel.height, panel);

    for (i=0; i<100; i++) {
        var button = new Phaser.Button(game, 0, 0, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        this.scrollpanel.addItem(button);
    }


    var tabback = new Phaser.Image(game, 0, 0, "panel");
    var tabs = new Rustica.UI.TabWindow(game, 290, 50, panel.width+120, panel.height);
    var tab1 = tabs.addPane("tab one");//, tabback);
    var tab2 = tabs.addScrollpane("tab two");//, new Phaser.Image(game, 0, 0, "panel"));
    var tab3 = tabs.addPane("tab three");

    for (i=0; i<100; i++) {
        var button = new Phaser.Button(game, 0, 0, "ui", buttonDown, this, 
                                       "grey_button00.png", "grey_button00.png", 
                                       "grey_button00.png", "grey_button00.png");
        button.width *= 0.85;
        tab2.addItem(button);
    }

    //tabs.switchTab("tab ");
}

function update() {

    //this.scrollpanel.update();
}

function render() {
}

function buttonDown() {
    console.log("pressed");
}
