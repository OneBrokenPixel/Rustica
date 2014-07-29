Rustica = {};
Rustica.UI = {};

Rustica.UI.Scrollpanel = function (game, x, y, width, height, backgroundImg, maskImg, trackImg, gripImg) {
    var game = game;

    //this.content = game.add.group();
    this._minGripSize = 30;
    this._maxGripSize = height - 10;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.contentHeight = 10;

    this._images = game.add.group();
    this._images.x = x;
    this._images.y = y;

    this.content = game.add.group();
    this.content.x = x;
    this.content.y = y;

    if (backgroundImg) {
        backgroundImg.x = 0;
        backgroundImg.y = 0;
        backgroundImg.width = width;
        backgroundImg.height = height;

        this._images.add(backgroundImg);
    }
    
    
    this._track = trackImg || new Phaser.Image(game, 0, 0, "ui", "grey_sliderVertical.png");
    game.add.existing(this._track);
    this._track.height = height - 10;
    this._track.x = x + width - 10;
    this._track.y = y + 10/2;
    
    
    this.grip = gripImg || new Phaser.Image(game, 0, 0, "grip");
    game.add.existing(this.grip);
    this.grip.x = this._track.x - this.grip.width - 3;
    this.grip.y = this._track.y;
    this.grip.height = this._track.height;

    this.grip.inputEnabled = true;
    this.grip.input.enableDrag(false, false, false, 255,
                               new Phaser.Rectangle(this.grip.x, this.grip.y, 
                                                    this.grip.width, this._track.height));
    this.grip.input.allowHorizontalDrag = false;

    
    var mask = new PIXI.Graphics();
    mask.beginFill();
    mask.drawRect(x-1, y+1, width+1, height-2);
    mask.endFill();
    this.content.mask = mask;
    

    return this;
};

Rustica.UI.Scrollpanel.prototype.constructor = Rustica.UI.Scrollpanel;

Rustica.UI.Scrollpanel.prototype = {
    add: function(items) {
        var i, item;
        for (i=0; i < arguments.length; i++) {
            item = arguments[i];

            this.content.add(item);
            item.x = 20;
            items.y = this.contentHeight;
            this.contentHeight += item.height + 10;
        }
        
        this.contentHeight += 10;

        // resize the grip
        var windowContentRatio = this.height / this.contentHeight;
        this.grip.height = this._maxGripSize * windowContentRatio;
    },

    remove: function(item) {
        console.log("unimplemented");
    },

    move: function(newX, newY) {
        console.log("unimplemented");
    },

    update: function() {
        if (this.grip.input.isDragged) {
            var windowScrollAreaSize = this.contentHeight - this.height;
            var trackScrollAreaSize = this._track.height - this.grip.height;
            var dragRatio = windowScrollAreaSize / trackScrollAreaSize;
            this.content.y = this._track.y - ((this.grip.y-this._track.y) * dragRatio);
        }
    }


};
