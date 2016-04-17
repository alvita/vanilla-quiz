(function(window){
	'use strict';

	function Model(){

	}

	Model.prototype.read = function(callback){
		console.debug('model read!!');
		var i, ext = '.png', prefix = 'images/', images = [];
		for(i=0; i < 12; i++){
			images.push(prefix + i + ext);
		}
		images = window.shuffleArray(images);
		console.debug('print shuffleImages: ' , images);
		callback.apply(this, [ images ] );
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;
}(window));