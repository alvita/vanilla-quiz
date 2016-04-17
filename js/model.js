(function(window){
	'use strict';

	function Model(){

	}

	Model.prototype.read = function(){
		console.debug('model read!!');
		var i, ext = '.png', prefix = 'images/', images = [];
		for(i=0; i < 12; i++){
			images.push(prefix + i + ext);
		}
		console.debug('print model' , images);
	};

	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;
}(window));