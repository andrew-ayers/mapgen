function Canvas(width, height, element) {
	this.width = width;
	this.height = height;

	this.canvas = document.createElement('canvas');
	this.canvas.id = 'canvas';
	this.canvas.width = width;
	this.canvas.height = height;
	this.canvas.style.backgroundColor = 'grey';
	this.ctx = this.canvas.getContext('2d');
	//    document.getElementById('yo').appendChild(this.canvas);
	if (typeof element != 'undefined') {
		$(element).append(this.canvas);
	} else {
		$("body").append(this.canvas);
	}
	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
}
