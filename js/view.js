(function(window){
	'use strict';

	function View(){
		var me = this;
		//me.template = template;
		me.$box = qs('.box');
		me.$timer = qs('.timer');
		//console.debug('View conttructor: $timer ', me.$box);
	}

	View.prototype.render = function (viewCmd, parameter) {
		var me = this;
		console.debug('viewCmd', viewCmd);
		var viewCommands = {
			startCountdown: function () {	
				me._startTimer(5, me.$timer);
			}
		};

		viewCommands[viewCmd]();
	};

	View.prototype._startTimer = function(duration, display){
		var timer = duration;
		var interval = setInterval(function(){
			display.innerHTML = timer;
			if (--timer < 0) {
				//timer = duration;
				clearTimeout(interval);
			}
		},1000);

	}

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));