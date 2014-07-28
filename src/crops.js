var cropModule = (function() {

    function Crop(name, growthTime, value) {
        this.name = name; // name of the crop
        this.growthTime = growthTime; // time in seconds untill it can be
                                        // harvested
        this.value = value; // value per unit.
    }
    ;

    Crop.prototype.toString = function() {
        return this.name + " " + this.growthTime + " " + this.value;
    };

    var crops = [ new Crop("Empty", 0.0, 0), new Crop("Wheat", 2.0, 1),
            new Crop("Potato", 1.0, 2), new Crop("Carrot", 0.5, 3) ];

    function Field() {
        this.crop = crops[0]; // crop that is here.
        this.size = 0; // number of units
        this.timeOfHarvest = 0.0; // time that the crop can be harvested.
    }
    ;

    Field.prototype.toString = function() {
        return this.crop + " " + this.size;
    };

    Field.prototype.resize = function(size) {
        this.size = size;
    };

    Field.prototype.plant = function(crop, time) {
        this.crop = crop;
        this.timeOfHarvest = time + this.crop.growthTime;
    };

    Field.prototype.harvest = function() {
        var totalValue = this.size * this.crop.value;
        this.crop = crops[0];
        this.timeOfHarvest = 0.0

        return totalValue;
    }

    var fields = [];

    return {

        addField : function() {
        },

        removeFieldAt : function(index) {
        },

        getField : function(index) {
            return fields[index];
        },

        getFields : function() {
            return fields;
        },

        getCrops : function() {
            return crops;
        }
    };

})();

console.log("Crops: " + cropModule.getCrops());
