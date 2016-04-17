(function(window){
	'use strict';

	function Controller(model, view){
		var me = this;
		me.model = model;
		me.view = view;

		// me.view.bind('showImage', function(){
		// 	me.showImage();
		// });
	}

	Controller.prototype.startCountdown = function(){
		var me = this;
		me.view.render('startCountdown');

	};

	Controller.prototype.shuffleImages = function(){
		var me = this;
		me.model.read(function(data){
		
			console.debug('controller read model ', data);
			me.view.setImages(data);
		})
	};

	// Export to window
	window.app = window.app || {};
	window.app.Controller = Controller;


}(window));