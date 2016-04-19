function DynamicImage(width, height, src){
	this.src = src;
	this.width = width;
	this.height = height;
	this.pwidth = null;
	this.lwidth = null;
	this.pheight = null;
	this.lheight = null;
	// this.potraitRatio = []; 
	// this.landscapeRatio = [];
	if(width === undefined || height === undefined){
		console.warn('[ Must Have ] width & height in DynamicImage')
	}
	//console.log('image:',window.orientation, window.boxWidth, window.boxHeight);
}

DynamicImage.prototype.getWidth = function(){
	var width;
	if(window.currentOrientation === 'PORTRAIT'){
		width = (this.pwidth === null) ? this.width * window.portraitRatio : this.pwidth;
	}else{
		width = (this.lwidth === null) ? this.width * window.landscapeRatio : this.lwidth;
	}
	return width;
}


DynamicImage.prototype.getHeight = function(){
	var height;
	if(window.currentOrientation === 'PORTRAIT'){
		height = (this.pheight === null) ? this.height * window.portraitRatio : this.pheight;
	}else{
		height = (this.lheight === null) ? this.height * window.landscapeRatio : this.lheight;
	}
	return height;

}

DynamicImage.prototype.createImage = function(){
	var me = this,
		imgEl = document.createElement("img");
		
		imgEl.setAttribute("src", me.src);
		imgEl.setAttribute("width", me.getWidth);
		imgEl.setAttribute("height", me.getHeight);
	return imgEl;

}