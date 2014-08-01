Rustica.UI.TabWindow = function (game, x, y, width, height, backgroundImg) {
    Phaser.Group.call(this, game);

    this.game = game;

    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.tabIndex = 0;
    this.tabPanels = {};
    this.currentTabPanel = null;

    this.newTabX = 0;
    this.tabWidth = 100;
    this.tabHeight = 30;

    this.hlineLeft = new Phaser.Image(game, 0, this.tabHeight, "hline");
    this.hlineLeft.width = width;
    this.add(this.hlineLeft);

    this.hlineRight = new Phaser.Image(game, 0, this.tabHeight, "hline");
    this.hlineRight.width = 0;
    this.hlineRight.x = this.hlineLeft.x + width;
    this.add(this.hlineRight);
};

Rustica.UI.TabWindow.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.TabWindow.prototype.constructor = Rustica.UI.TabWindow;


Rustica.UI.TabWindow.prototype.addPanel = function (name, panel) {

    // tabPanel.btn : the button at the top of the window used to switch between panels
    // tabPanel.content : what gets displayed when you switch to that panel
    // tabPanel : the tabBtn and the tabContent as a whole
    
    // create the tab panel as an object
    var tabPanel = {};

    tabPanel.btn = new Phaser.Button(this.game, this.newTabX, 0, "tab", this.switchTab, this);
    tabPanel.name = name;   // try and keep this unique between tabpanels
    tabPanel.btn.name = tabPanel.name;
    tabPanel.index = this.tabIndex;

    var panel = panel;
    if (panel) {
        panel.move(this.x, this.y);
        panel.resize(this.w, this.h);
    }
    else {
        panel = new Rustica.UI.Scrollpanel(this.game, this.x, this.y+this.tabHeight, 
                                           this.w, this.h-this.tabHeight);
    }
    tabPanel.content = panel;

    // add it to our list of panels
    this.tabPanels[tabPanel.name] = tabPanel;

    // draw the tab button
    this.add(tabPanel.btn);

    var text = new Phaser.Text(this.game, 0, 0, name, {font: "18px Arial"});
    text.anchor.setTo(0.5, 0.5);
    text.x = tabPanel.btn.x + tabPanel.btn.width/2;
    text.y = tabPanel.btn.height/2 + 2;
    this.add(text);

    // if it's the first tab added, display it
    if (this.tabIndex === 0) {
        this.switchTab(tabPanel.btn);
    }

    // update vars ready for next tab to be added
    this.newTabX += this.tabWidth;
    this.tabIndex += 1;

    return tabPanel.content;
    
};

Rustica.UI.TabWindow.prototype.switchTab = function (tabBtn) {

    // left horiz border
    var lwidth = tabBtn.x;
    this.hlineLeft.width = lwidth;

    var tabPanel = this.tabPanels[tabBtn.name];

    // show tab's content
    if (this.currentTabPanel != null) {
        this.currentTabPanel.content.callAll("kill");
        this.currentTabPanel.callAll("kill");
    }

    this.currentTabPanel = tabPanel.content;
    this.currentTabPanel.callAll("revive");
    
    // right horiz border
    var rwidth = this.width - tabBtn.x - this.tabWidth;
    this.hlineRight.width = rwidth;
    this.hlineRight.x = tabBtn.x + this.tabWidth;;
};


Rustica.UI.Tabpanel = function (game) {
    Phaser.Group.call(this, game);
};

Rustica.UI.Tabpanel.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.Tabpanel.prototype.constructor = Rustica.UI.Tabpanel;

