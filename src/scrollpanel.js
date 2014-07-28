Rustica = {};
Rustica.UI = {};

Rustica.UI.Scrollpanel = function (tosay) {
    this.msg = tosay;

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
