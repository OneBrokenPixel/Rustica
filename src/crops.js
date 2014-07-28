
function Field() {
    this.size = 0;
};

Field.prototype.toString = function() {
    return "Field: " + this.size;
};

Field.prototype.resize = function(size) {
	this.size = size;
}



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

    var crops = [ new Crop("Empty", 0.0, 0), 	new Crop("Wheat", 2.0, 1),
                  new Crop("Potato", 1.0, 2), 	new Crop("Carrot", 0.5, 3) ];

    function CropField() {
        this.crop = crops[0]; // crop that is here.
        this.timeOfHarvest = 0.0; // time that the crop can be harvested.
    }
    ;

    CropField.prototype = new Field();
    
    CropField.prototype.toString = function() {
        return this.crop + " " + this.size;
    };

    CropField.prototype.plant = function(crop, time) {
        this.crop = crop;
        this.timeOfHarvest = time + this.crop.growthTime;
    };

    CropField.prototype.harvest = function() {
        var totalValue = this.size * this.crop.value;
        this.crop = crops[0];
        this.timeOfHarvest = 0.0

        return totalValue;
    }

    var cropFields = [];

    return {

        addField : function() {
    		cropFields.push(new CropField())
        },

        removeFieldAt : function(index) {
        	if(index >= 0 && index < cropFields.length) {
        		var array = cropFields.splice(index, 1);
        		return array[0];
        	}
        	else{
        		return null;
        	}
        	
        },

        getField : function(index) {
        	if(index >= 0 && index < cropFields.length) {
        		return cropFields[index];
        	}
        	else
        	{
        		return null;
        	}
        	
        },

        getFields : function() {
            return cropFields;
        },

        getCrop : function(index) {
        	if(index >= 0 && index < crops.length){
        		return crops[index];
        	}
        	else {
        		return null;
        	}
        },

        getCrops : function() {
            return crops;
        }
    };

})();

console.log("Crops: " + cropModule.getCrops());
