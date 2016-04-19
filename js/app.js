(function(){
	'use strict';
	var timer;
	const PORTRAIT_RECT_PERCENTAGE = 0.8,
		  LANDSCAPE_RECT_PERCENTAGE = 0.7;


	function Application() {
		console.debug('Application constructor!!', window.app);	
		this.model = new window.app.Model();	
		this.view = new window.app.View();
		this.controller = new window.app.Controller(this.model, this.view);
	}
	
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
		// window.boxWidth = boxWidth;
		// window.boxHeight = boxHeight;

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
		window.currentOrientation = orientation; // for image ratio
		return orientation;
	}

	function setContent(){
		console.debug('set content!');
		var orientation,
			layout = {},
			boxEl = document.getElementById('box'),
			existImages = window.qsa('img'),
			existImglen = existImages.length,
			imageEl, 
			i = 0;
		
		orientation = detectOrientation();
		if(orientation === 'PORTRAIT'){
			//80%
			layout = measureLayout(PORTRAIT_RECT_PERCENTAGE);
			//window.pwidth = layout.boxWidth; //keep for ratio
		}else{
			//70%
			layout = measureLayout(LANDSCAPE_RECT_PERCENTAGE);
			//window.lwidth = layout.boxWidth;
		}
		window.landscapeRatio = 1;
		window.portraitRatio = PORTRAIT_RECT_PERCENTAGE / LANDSCAPE_RECT_PERCENTAGE;
	
		console.debug('init ratio : Landscape>>', window.landscapeRatio, ' Portrait>>', window.portraitRatio);
		//console.debug('all images: ', window.qsa('img'));
		
		for(i; i < existImglen; i++){
			imageEl = existImages[i];
			//console.debug('oo', imageEl.getAttribute("originalwidth"));
			if(imageEl.getAttribute("originalwidth") === null){
				imageEl.setAttribute("originalwidth", imageEl.width);
			}
			if(window.currentOrientation === 'PORTRAIT'){
				imageEl.width = imageEl.getAttribute("originalwidth") * window.portraitRatio ;
			}else{
				imageEl.width = imageEl.getAttribute("originalwidth") * window.landscapeRatio ;
			}
		}
		console.debug(layout);
		boxEl.style.position = 'absolute';
		boxEl.style.width = layout.boxWidth + 'px';
		boxEl.style.height = layout.boxHeight + 'px';
		boxEl.style.top = layout.paddingTop + 'px';
		boxEl.style.left = layout.paddingLeft + 'px';
		boxEl.style.backgroundColor = 'black';

	}

	var app =  new Application();

	window.onload = function() {

		//detectOrientation();
		setContent();
		app.controller.shuffleImages();
		app.controller.startCountdown();

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