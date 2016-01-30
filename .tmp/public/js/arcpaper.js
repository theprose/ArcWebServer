BigBang = {
	timeScale: 30.0,
	hasOccurred: false,
	isStable: false,
	isExpanding: false,
	isContracting: false,
	isExpanded: false,
	isContracted: true,
	bodies: [],
	completionCount: 0,
	isFrozen: false,
	maxBodySize: Math.max(view.size.width, view.size.height) / 2,
	deepestBlue: new Color('white') - new Color('#00aced'),
	whiteColor: new Color('white'),
	
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
				
				//angle
				var theta = (Math.random() * (j+1) * radialIncrement) + (j * radialIncrement);
				
				//size
				var maxSize = 10; 
				var minSize = 2;
				var distOffset = i / maxOrbits;
				var size = (Math.random() * (maxSize - minSize) * distOffset) + minSize;
				
				//color
				var color = new Color('white') - BigBang.deepestBlue * Math.random() * distOffset;
				BigBang.bodies.push(new OrbitalBody(theta, closestOrbit, size, color));
			}
			
			closestOrbit += orbitIncrement;
		}		
	},
	
	//inflate the orbital bodies
	expandUniverse: function() {		
		BigBang.isExpanding = true;
		BigBang.isContracting = false;
		BigBang.completionCount = 0;
	},
	
	//contract the orbital bodies
	contractUniverse: function() {		
		BigBang.isFrozen = false;
		BigBang.isExpanding = false;
		BigBang.isContracting = true;
		BigBang.completionCount = 0;
	},
	
	tick:function() {
		if(BigBang.isFrozen) return;
		
		for(i in BigBang.bodies) {
			var body = BigBang.bodies[i];
			body.travel();
		}
	},
	
	cleanupAnimations: function() {
		BigBang.completionCount++;

		console.log(BigBang.completionCount);
		if(BigBang.completionCount == BigBang.bodies.length) { 
			if(BigBang.isExpanding) { 
				BigBang.isFrozen = true;
				BigBang.isExpanded = true;
				BigBang.isContracted = false;
			} else if(BigBang.isContracting) {
				BigBang.isExpanded = false;
				BigBang.isContracted = true;
			}
			
			BigBang.isExpanding = false;
			BigBang.isContracting = false;
			BigBang.isStable = true;
		}
	}
}

OrbitalBody = function(theta, dist, size, color) {

	//necessary variables
	this.currentOrbit = 10;
	this.stableOrbit = dist;
	this.angularPosition = theta;
	this.angularVelocity = Math.PI / this.currentOrbit;
	this.stableSize = size;
	this.currentSize = 2;
	this.stableColor = color;
	
	//initial position
	var x = Math.cos(theta) * 1 + view.center.x;
	var y = Math.sin(theta) * 1 + view.center.y;	
		
	//primary body view
	this.view = new Path.Circle({
		center: [x, y],
		radius: 2,
		fillColor: this.stableColor
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
		
		//big bang is occurring - explode outward
		if(this.currentOrbit < this.stableOrbit && BigBang.hasOccurred) {
			
			//change orbit
			var diff = this.stableOrbit - this.currentOrbit;
			var delta = Math.ceil(diff / BigBang.timeScale);
			this.currentOrbit += delta;
			
			//change size
			var diff = this.stableSize - this.currentSize;
			var delta = diff / BigBang.timeScale;
			this.currentSize += delta;
			this.updateSize();
			
			//change color
			
			//cleanup
			if(this.currentOrbit == this.stableOrbit) BigBang.cleanupAnimations();
		}
		
		//universe expanding - increase size
		if(BigBang.isExpanding) {
			
			//change size
			var diff = BigBang.maxBodySize - this.currentSize;
			var delta = Math.ceil(diff / BigBang.timeScale);
			this.currentSize += delta;
			this.updateSize();
			
			//change color
			var dc = (BigBang.whiteColor - this.stableColor) / (BigBang.timeScale / 2);
			this.view.fillColor += dc;

			if(!delta) BigBang.cleanupAnimations(); 
		
		//universe contracting - reduce size
		} else if(BigBang.isContracting) {
			var diff =  this.stableSize - this.currentSize;
			var delta = Math.floor(diff / BigBang.timeScale);
			this.currentSize += delta;
			this.updateSize();
			
			//change color
			var dc = (this.view.fillColor - this.stableColor) / BigBang.timeScale;
			this.view.fillColor -= dc;
			
			if(!delta) BigBang.cleanupAnimations(); 
		}
		
		//update angular position
		this.angularVelocity = Math.PI / this.currentOrbit;
		var newTheta = this.angularPosition + this.angularVelocity;
		this.updateAngularPosition(newTheta);		
	}
	
	//inflate size towards max
	this.inflateToMaxTick = function() {
		
	}
	
	//update view to currentSize
	this.updateSize = function() {
		var newSize = this.currentSize * 2;
		this.view.bounds.width = newSize;
		this.view.bounds.height = newSize;
	}
	
	return this;
}

function onResize(event) {
	// Whenever the window is resized
	BigBang.maxBodySize = Math.max(view.size.width, view.size.height) / 2;
}

//animations
function onFrame(event) {
	BigBang.tick();
}

//initial run
BigBang.prime(40, 40, 15);