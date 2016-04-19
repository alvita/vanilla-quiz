(function(window){
	'use strict';

	function View(){
		var me = this;
		//me.template = template;
		me.$box = qs('.box');
		me.$timer = qs('.timer');
		me.DURATION = 24;
		me.TICK = 2;
		me.images = []; // after shuffle 
		//console.debug('View conttructor: $timer ', me.$box);
	}

	View.prototype.render = function (viewCmd, parameter) {
		var me = this;
		console.debug('viewCmd', viewCmd);
		var viewCommands = {
			startCountdown: function () {	
				me._startTimer(me.DURATION, me.$timer);
			}
		};

		viewCommands[viewCmd]();
	};

	View.prototype.setImages = function(data){
		var me = this;
		me.images = data;
		console.debug('already set images! ', me.images);
	};

	View.prototype._startTimer = function(duration, display){
		var me = this,
			timer = duration;
		var interval = setInterval(function(){
			display.innerHTML = timer;

			if(timer%me.TICK === 0){
				//console.debug('append image!', me.images);
				if(me.images.length > 0){ // in case of all items shift
					me._appendImage(me.images[0]);
				}
			}

			timer = timer - 1;
			if (timer < 0) {
				//timer = duration;
				clearTimeout(interval);
			} 
		},1000);
	}

	View.prototype._appendImage = function(image){
		var me = this;
		//appends
		//console.debug('img src: ',new DynamicImage());
		var imgEl = document.createElement("img");
		imgEl.setAttribute("src", image);
		me.$box.appendChild(imgEl);
		//remove  first item from array
		me.images.shift();

	}

	// Export to window
	window.app = window.app || {};
	window.app.View = View;
}(window));