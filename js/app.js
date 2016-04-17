(function(){
	'use strict';
	var timer;
	
	function measureLayout(portion){
		//width : height = 4 :3
		var winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
		 	winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
			boxWidth = Math.round(winWidth * portion),
			boxHeight = Math.round(boxWidth * (3/4)),
			paddingLeft = (winWidth - boxWidth)/2,
			paddingTop = (winHeight - boxHeight)/2;
		console.debug('win',winWidth, winHeight);	
		//console.debug('boxWidth:', boxWidth, 'boxHeight:', boxHeight);
		//console.debug('padding-left:', paddingLeft, 'padding-top:', paddingTop);
		return {
			boxWidth : boxWidth,
			boxHeight : boxHeight,
			paddingLeft : paddingLeft,
			paddingTop : paddingTop
		};
	} 

	function detectOrientation(){
		var orientation, winWidth, winHeight;
		console.debug('detectOrientation');
		if(window.orientation === undefined){
			console.debug('-> not on device');
			winWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			if(winWidth > winHeight){
				// Landscape
				orientation = 'LANDSCAPE';
			}else{
				// Portrait
				orientation = 'PORTRAIT';
			}

		}else{
			console.debug('-> on device');
			if (Math.abs(window.orientation) === 90) {
			// Landscape
				orientation = 'LANDSCAPE';
			} else {
				// Portrait
				orientation = 'PORTRAIT';
			}
		}		
		console.debug('orientation ==>', orientation);
		return orientation;
	}

	function setContent(){
		console.debug('set content!');
		var orientation,
			layout = {},
			boxEl = document.getElementById('box');
		
		orientation = detectOrientation()
		if(orientation === 'PORTRAIT'){
			//80%
			layout = measureLayout(0.8);
		}else{
			//70%
			layout = measureLayout(0.7);
		}
		console.debug(layout);
		boxEl.style.position = 'absolute';
		boxEl.style.width = layout.boxWidth + 'px';
		boxEl.style.height = layout.boxHeight + 'px';
		boxEl.style.top = layout.paddingTop + 'px';
		boxEl.style.left = layout.paddingLeft + 'px';
		boxEl.style.backgroundColor = 'black';

	}
	window.onload = function() {
		//detectOrientation();
		setContent();
	}

	window.onorientationchange = function(){
		console.debug('ondeviceorientation');
		//detectOrientation();
		setContent();
	 }

	window.onresize = function() {
		//detectOrientation();
		clearTimeout(timer);
		timer = setTimeout(function(){
			setContent();
		},600);
	}
})();