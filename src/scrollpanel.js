Rustica = {};
Rustica.UI = {};

Rustica.UI.Scrollpanel = function (tosay) {
    this.msg = tosay;
    console.log("i've been called");
    return this;
};


Rustica.UI.Scrollpanel.prototype = {
    sayMsg: function (nextMsg) {
        nextMsg = nextMsg || "";
        console.log(nextMsg + this.msg);
    },

    getMsg: function () {
        return this.msg;
    }
};

Rustica.UI.Scrollpanel.prototype.constructor = Rustica.UI.Scrollpanel;

/** object that inherits from Scrollpanel */
ScrollpanelChild = function(msg) {
    Rustica.UI.Scrollpanel.call(this, msg);
    this.childMsg = "child " + msg;

    //return this;
};

ScrollpanelChild.prototype = Object.create(Rustica.UI.Scrollpanel.prototype);
ScrollpanelChild.prototype.constructor = ScrollpanelChild;

ScrollpanelChild.prototype.getChildMsg = function () {
    return this.childMsg;
};

