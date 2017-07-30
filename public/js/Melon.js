var Melon = function() {};

Melon.Class = function() {};
Melon.Class.extend = function(prop) {
	var fnTest = /\b_super\b/,
	_super = this.prototype;

	// Instantiate a base class (but only create the instance,
	// don't run the init constructor)
	initializing = true;
	var prototype = new this();
	initializing = false;

	// Copy the properties over onto the new prototype
	for ( var name in prop) {
		// Check if we're overwriting an existing function
		prototype[name] = typeof prop[name] == 'function'
				&& typeof _super[name] == 'function'
				&& fnTest.test(prop[name]) ? (function(name, fn) {
			return function() {
				var tmp = this._super;

				// Add a new ._super() method that is the same method
				// but on the super-class
				this._super = _super[name];

				// The method only need to be bound temporarily, so we
				// remove it when we're done executing
				var ret = fn.apply(this, arguments);
				this._super = tmp;

				return ret;
			};
		})(name, prop[name]) : prop[name];
	}

	// The dummy class constructor
	function Class() {
		// All construction is actually done in the init method
		
		if (!initializing && this.init)
			this.init.apply(this, arguments);
	}
	
	// Populate our constructed prototype object
	Class.prototype = prototype;

	// Enforce the constructor to be what we expect
	Class.prototype.constructor = prop.init;

	// And make this class extendable
	Class.extend = Melon.Class.extend;

	return Class;
};

jQuery.extend(Melon, {
	extend: function(prop) { return Melon.Class.extend.call(Melon.Class, prop); }
});

// 공통 function
Melon.Common = Melon.extend({
	init: function() {
		this.name = '';
	},
	setName: function(name) {
		this.name = name;
	},
	getName: function() {
		return this.name;
	}
});

(function(){
	Melon.Grid = Melon.Common.extend({
		init: function() {
			this.setName('Grid');
		},
		test: function() {
			
		}
	});
})();