Rustica.UI.TabWindow = function (game, x, y, width, height) {
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

    this.hlineLeft = new Phaser.Image(game, 0, -1, "hline");
    this.hlineLeft.width = width;
    this.add(this.hlineLeft);

    this.hlineRight = new Phaser.Image(game, 0, -1, "hline");
    this.hlineRight.width = 0;
    this.hlineRight.x = this.hlineLeft.x + width;
    this.add(this.hlineRight);
};

Rustica.UI.TabWindow.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.TabWindow.prototype.constructor = Rustica.UI.TabWindow;

Rustica.UI.TabWindow.prototype.addPane = function (name, backgroundImg) {
    var pane = new Rustica.UI.Pane(this.game, this.x, this.y, this.w, this.h, backgroundImg);
    this._addTab(name, pane);
    return pane;
};

Rustica.UI.TabWindow.prototype.addScrollpane = function (name, backgroundImg, maskImg) {
    var pane = new Rustica.UI.Scrollpane(this.game, this.x, this.y, this.w, this.h, backgroundImg, maskImg);
    this._addTab(name, pane);
    return pane;
};

Rustica.UI.TabWindow.prototype._addTab = function (name, pane) {

    // tabPanel.btn : the button at the top of the window used to switch between panels
    // tabPanel.content : what gets displayed when you switch to that panel
    // tabPanel : the tabBtn and the tabContent as a whole
    
    // create the tab panel as an object
    var tabPanel = {};

    tabPanel.btn = new Phaser.Button(this.game, this.newTabX, -this.tabHeight, "tab", this.switchTab, this);
    tabPanel.name = name;   // try and keep this unique between tabpanels
    tabPanel.btn.name = tabPanel.name;
    tabPanel.index = this.tabIndex;
    tabPanel.pane = pane;

    // add it to our list of panels
    this.tabPanels[tabPanel.name] = tabPanel;

    // draw the tab button
    this.add(tabPanel.btn);

    var text = new Phaser.Text(this.game, 0, 0, name, {font: "18px Arial"});
    text.anchor.setTo(0.5, 0.5);
    text.x = tabPanel.btn.x + tabPanel.btn.width/2;
    text.y = -this.tabHeight + tabPanel.btn.height/2 + 2;
    this.add(text);

    this.switchTab(tabPanel.btn);

    // update vars ready for next tab to be added
    this.newTabX += this.tabWidth;
    this.tabIndex += 1;

    return tabPanel.pane;
    
};

Rustica.UI.TabWindow.prototype.switchTab = function (tab) {

    var tabPanel;
    if (typeof tab === "string")
        tabPanel = this.tabPanels[tab];
    else if (typeof tab === "object")
        tabPanel = this.tabPanels[tab.name];

    // left horiz border
    var lwidth = tabPanel.btn.x;
    this.hlineLeft.width = lwidth;

    // show tab's content
    if (this.currentTabPanel != null) {
        this.currentTabPanel.pane.content.callAll("kill");
        this.currentTabPanel.pane.callAll("kill");
    }

    this.currentTabPanel = tabPanel;
    this.currentTabPanel.pane.content.callAll("revive");
    this.currentTabPanel.pane.callAll("revive");
    
    // right horiz border
    var rwidth = this.width - tabPanel.btn.x - this.tabWidth;
    this.hlineRight.width = rwidth;
    this.hlineRight.x = tabPanel.btn.x + this.tabWidth;;
};
