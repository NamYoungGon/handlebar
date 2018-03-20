(function (jq) {

	var nyg = function (query) {
		return function () {
			var tmp = new nyg.prototype.init(query);
			return tmp;
		}();
	}

	nyg.a = function () {
		console.log("a");
	}

	nyg.prototype.b = function () {
		console.log("prototype b");
	}

	nyg.prototype.init = function (query) {
		this.name = "nyg";
        	this.version = "1.0.0";
		
		return document.querySelectorAll(`${query}`);
	};

	nyg.prototype.init.prototype = nyg.prototype;

	window.nyg = nyg;

})(jQuery)
