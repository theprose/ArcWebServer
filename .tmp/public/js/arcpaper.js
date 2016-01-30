BigBang = {
	timeScale: 30.0,
	hasOccurred: false,
	isExpanding: false,
	isContracting: false,
	dimensions: [0, 0],
	bodies: [],
	
	//execute the big bang
	explode: function() {
		BigBang.hasOccurred = true;
	},
	
	//prime the big bang
	prime: function(closestOrbit, orbitIncrement, maxOrbits) {
		var bodiesPerOrbit = 4;
		var radialIncrement = 2 * Math.PI / bodiesPerOrbit;
		
		for(i = 0; i < maxOrbits; i++) {
			
			for(j = 0; j < bodiesPerOrbit; j++) {
				var theta = (Math.random() * (j+1) * radialIncrement) + (j * radialIncrement);
				BigBang.bodies.push(new OrbitalBody(theta, closestOrbit, 2));
			}
			
			closestOrbit += orbitIncrement;
		}
		
		BigBang.dimensions = [$(window).width(), $(window).height()];
	},
	
	expandUniverse: function() {
		BigBang.isExpanding = true;
		BigBang.isContracting = false;
	},
	
	contractUniverse: function() {
		BigBang.isExpanding = false;
		BigBang.isContracting = true;
	},
	
	tick:function() {
		for(i in BigBang.bodies) {
			var body = BigBang.bodies[i];
			body.travel();
		}
	}
}

OrbitalBody = function(theta, dist, size) {

	//necessary variables
	this.currentOrbit = 10;
	this.stableOrbit = dist;
	this.angularPosition = theta;
	this.angularVelocity = Math.PI / this.currentOrbit;
	this.stableSize = size;
	this.currentSize = size;
	
	//initial position
	var x = Math.cos(theta) * 1 + view.center.x;
	var y = Math.sin(theta) * 1 + view.center.y;	
	
	//primary body view
	this.view = new Path.Circle({
		center: [x, y],
		radius: size,
		fillColor: 'white'
	});
	
	//update the angular position to a new theta
	this.updateAngularPosition = function(theta) {
		this.angularPosition = theta;
		var x = Math.cos(theta) * this.currentOrbit + view.center.x;
		var y = Math.sin(theta) * this.currentOrbit + view.center.y;
		
		this.view.position = [x, y];
	}
	
	//automatically travel based on angular velocity
	this.travel = function() {
		
		//big bang
		if(this.currentOrbit < this.stableOrbit && BigBang.hasOccurred) {
			var diff = this.stableOrbit - this.currentOrbit;
			var delta = diff / BigBang.timeScale;
			this.currentOrbit += delta;
		}
		
		//universe expanding
		if(BigBang.isExpanding) {
			var diff = Math.max(BigBang.dimensions[0], BigBang.dimensions[1]) - this.currentSize;
			var delta = Math.floor(diff / BigBang.timeScale);
			this.currentSize += delta;
			this.updateSize();
		
		//universe contracting
		} else if(BigBang.isContracting) {
			var diff =  this.stableSize - this.currentSize;
			var delta = Math.floor(diff / BigBang.timeScale);
			this.currentSize += delta;
			this.updateSize();
		}
		
		this.angularVelocity = Math.PI / this.currentOrbit;
		var newTheta = this.angularPosition + this.angularVelocity;
		this.updateAngularPosition(newTheta);
		
		this.view.fillColor += 1;
	}
	
	//update view to currentSize
	this.updateSize = function() {
		this.view.bounds.width = this.currentSize * 2;
		this.view.bounds.height = this.currentSize * 2;
	}
	
	return this;
}

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	//path.position = view.center;
}

//animations
function onFrame(event) {
	BigBang.tick();
}

//initial run
BigBang.prime(40, 40, 15);