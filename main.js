function Painter(ctx) {
	this.ctx = ctx;
	this.radius = 0;
	this.width = 0;
	this.height = 0;
	this.color = "#000";
	this.x = undefined;
	this.y = undefined;
	this.painting = true;
}

Painter.prototype = {
	drawRect: function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	drawLine: function(x,y){
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = this.radius;
		this.ctx.lineCap = "round";

		if(this.x == undefined || this.y == undefined){
			this.x = x;
			this.y = y;
		}

		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(x,y);
		this.ctx.stroke();

		this.x = x;
		this.y = y;
	},
	move: function(x ,y) {
		this.x = x;
		this.y = y;
	},
	start: function() {
		this.painting = true;
	},
	stop: function() {
		this.painting = false;
		this.x = undefined;
		this.y = undefined;
	}
}

function Caint(canvas) {
	var ctx = canvas.getContext("2d");
	var background = "#f5f5f5";
	var foreground = "#333";

	var painter = new Painter(ctx);
	painter.radius = 3;
	painter.color = foreground;

	var cancel = function(e) {
		e.preventDefault();
		return false;
	}

	this.upListener = function(e) {
		painter.stop();
	}

	this.downListener = function(e) {
		switch(e.button) {
			case 0:
				painter.start();
				break;
			case 2:
				break;
		}
		this.draw(e);

		return false;
	}.bind(this);
	
	this.moveListener = function(e) {
		this.draw(e);
	}.bind(this);

	this.draw = function(e) {
		var x = e.pageX;
		var y = e.pageY;

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		if(painter.painting) {
			painter.drawLine(x,y);
		}
	}

	canvas.style.backgroundColor = background;
	canvas.style.margin = "auto";
	canvas.style.display = "block";
	canvas.style.cursor = "default";

	canvas.addEventListener("mousedown", this.downListener);
	document.addEventListener("mouseup", this.upListener);
	canvas.addEventListener("mousemove", this.moveListener);
	canvas.addEventListener("contextmenu", cancel);
	canvas.addEventListener("selectstart", cancel);

	document.body.style,backgroundColor = foreground;
}

new Caint(document.getElementById("canvas"));