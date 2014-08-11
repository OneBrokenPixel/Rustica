/*Rustica = {};
Rustica.Game = {};

// Agent Constuctor
Rustica.Game.Agent = function(name, age, efficency) {

	    this.name = name;
	    this.age = age;
	    this.efficency = efficency;
	    this.timeIdle = 0.0;
	    this.timeWorking = 0.0;
    
    return this;
}

Rustica.Game.Agent.prototype.constructor = Rustica.Game.Agent;


Rustica.Game.AgentTaskQueue = function() {
	
	this.agentsWorking = [];
	this.agentsIdle = [];
}


Rustica.Game.AgentTaskQueue.prototype.constructor = Rustica.Game.AgentTaskQueue;

Rustica.Game.AgentTaskQueue.prototype.findAgent = function( agent ){
	
	var index = this.agentsWorking.indexOf(agent);

	return index == -1 ? this.agentsIdle.indexOf(agent) : index;
}


Rustica.Game.AgentTaskQueue.prototype.addAgent = function( agent ) {
	
	var searchResult = this.findAgent( agent );
	
	if( searchResult == -1 ){
		this.agentsIdle.push(agent);
	}
	
}
*/
