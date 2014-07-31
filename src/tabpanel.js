Rustica.UI.TabWindow = function (game, x, y, width, height, backgroundImg) {
    Phaser.Group.call(this, game);

    this.game = game;

    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.tabs = [];
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


Rustica.UI.TabWindow.prototype.addPanel = function (name) {
    var lwidth = this.newTabX;
    this.hlineLeft.width = lwidth;
    
    var tabBtn = new Phaser.Image(this.game, this.newTabX, 0, "tab");
    this.add(tabBtn);
    var text = new Phaser.Text(this.game, 0, 0, name, {font: "18px Arial"});
    text.anchor.setTo(0.5, 0.5);
    text.x = tabBtn.x + tabBtn.width/2;
    text.y = tabBtn.height/2;
    console.log(text.width);

    this.add(text);
    this.newTabX += this.tabWidth;

    var rwidth = this.width - this.newTabX;
    this.hlineRight.width = rwidth;
    this.hlineRight.x = this.newTabX;
    
};

Rustica.UI.TabWindow.prototype.switchPanel = function (tab) {

};


Rustica.UI.Tabpanel = function (game) {
    Phaser.Group.call(this, game);
};

Rustica.UI.Tabpanel.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.Tabpanel.prototype.constructor = Rustica.UI.Tabpanel;

