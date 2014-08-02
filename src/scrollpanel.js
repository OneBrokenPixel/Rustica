Rustica = {};
Rustica.UI = {};

Rustica.UI.Pane = function (game, x, y, width, height, backgroundImg) {
    Phaser.Group.call(this, game);

    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.content = game.add.group();
    this.add(this.content);   // make Pane this.content's parent
    this.content.x = 0;
    this.content.y = 0;

    this.borders = false;   // not used


    if (backgroundImg) {
        backgroundImg.x = 0;
        backgroundImg.y = 0;
        backgroundImg.width = this.w;
        backgroundImg.height = this.h;
        
        this.add(backgroundImg);
    }
    

};

Rustica.UI.Pane.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.Pane.prototype.constructor = Rustica.UI.Pane;

Rustica.UI.Pane.prototype.addItem = function(item, x, y) {
    this.content.add(item);
    item.x = x;
    item.y = y;
};

Rustica.UI.Scrollpane = function (game, x, y, width, height, backgroundImg, maskImg, trackImg, gripImg) {
    Rustica.UI.Pane.call(this, game, x, y, width, height, backgroundImg);

    this._minGripSize = 30;
    this._maxGripSize = height - 10;
    this._dragRatio = 0;

    this.contentHeight = 20;

    this.track = trackImg || this.create(0, 0, "ui", "grey_sliderVertical.png");
    this.track.height = height - 10;
    this.track.x = width - 10;
    this.track.y = 5;
   
    //this._trackHeight = this.track.height;

    this.grip = gripImg || this.create(0, 0, "grip"); 
    this.grip.x = this.track.x - this.grip.width - 3;
    this.grip.y = this.track.y;
    this.grip.height = this.track.height;

    this.grip.inputEnabled = true;
    this.grip.input.enableDrag(false, false, false, 255,
                               new Phaser.Rectangle(this.grip.x, this.grip.y, 
                                                    this.grip.width, this.track.height));
    this.grip.input.allowHorizontalDrag = false;
    
        
    /*
    panelMask = game.add.image(0,0,"panelMask");
    panelMask.anchor.setTo(0.5, 0.5);
    panelMask.x = panel.x + panel.width/2;
    panelMask.y = panel.y + panel.height/2;
    panelMask.z = 1;
    */

    var mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRect(x, y, width, height);
    mask.endFill();
    this.mask = mask;
    
    return this;
};

Rustica.UI.Scrollpane.prototype = Object.create(Phaser.Group.prototype);
Rustica.UI.Scrollpane.prototype.constructor = Rustica.UI.Scrollpane;

Rustica.UI.Scrollpane.prototype.addItem =  function (item) {
    
    // add item to content group
    this.content.add(item);
    item.x = 20;
    item.y = this.contentHeight;
    this.contentHeight += item.height + 10;

    // resize the grip
    var windowContentRatio = this.h / this.contentHeight;
    this.grip.height = this.track.height * windowContentRatio;

    this.grip.height = this.grip.height > this._maxGripSize ? this._maxGripSize : this.grip.height;
    this.grip.height = this.grip.height < this._minGripSize ? this._minGripSize : this.grip.height;
        
    // calculate scroll amount
    var windowScrollAreaSize = this.contentHeight - this.h;
    var trackScrollAreaSize = this.track.height - this.grip.height;
    this._dragRatio = windowScrollAreaSize / trackScrollAreaSize;
    
};

Rustica.UI.Scrollpane.prototype.removeItem = function (item) {
    console.log("unimplemented");
};


Rustica.UI.Scrollpane.prototype.move = function (newX, newY) {
    this.x = newX;
    this.y = newY;

    this.mask = null;

    // redraw mask
    var mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRect(this.x, this.y, this.w, this.h);
    mask.endFill();

    this.mask = mask;
};

Rustica.UI.Scrollpane.prototype.update = function () {
    if (this.grip.input.isDragged && this.grip.height < this._maxGripSize) {
        // move content group upwards by drag ratio
        this.content.y = 0 - (this.grip.y-this.track.y) * this._dragRatio;
    }
};

Rustica.UI.Scrollpane.prototype.resize = function (width, height) {
    this._maxGripSize = height - 10;
    this.w = width;
    this.h = height;

    this.track.height = height - 10;
    this.track.x = width - 10;

    // redraw mask
    this.mask = null;
    var mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRect(this.x, this.y, this.w, this.h);
    mask.endFill();

    this.mask = mask;
}

Rustica.UI.Scrollpane.prototype.addBorder = function () {
    this.borders = true;
    
};

Rustica.UI.Scrollpane.prototype.addBackground = function (backgroundImg) {

};
