let background = "#000000";
let circleColor = "#444444";
let radiusColor = "#888888";
let lineColor = "#888800";

class Fourier{
	constructor(canvas, ctx, n = []){
		this.canvas = canvas;
		this.ctx = ctx;
		this.n = n;
		this.t = 0.0;
		this.h = [];
	}
	solve(){
		let result = new Complex();
		for(let i = 0; i < this.n.length; i++){
			let n = Math.ceil(i / 2) * Math.pow(-1, i);
			let v = this.n[i].mlt(new Complex(1, 2 * Math.PI * n * this.t));
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = circleColor;
			this.ctx.arc(result.getX(), result.getY(), v.r, 0, 2 * Math.PI);
			this.ctx.stroke();
			this.ctx.beginPath();
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = radiusColor;
			this.ctx.moveTo(result.getX(), result.getY());
			result = result.add(v);
			this.ctx.lineTo(result.getX(), result.getY());
			this.ctx.stroke();
		}
		return result;
	}
	step(dt){
		this.ctx.beginPath();
		this.ctx.fillStyle = background;
		this.ctx.rect(-this.canvas.width / 2, -this.canvas.height / 2, this.canvas.width, this.canvas.height);
		this.ctx.fill();
		let point = this.solve();
		this.h.push(point);
		if(this.h.length > 0.9 / dt){
			this.h.splice(0, 1);
		}
		this.t += dt;
		this.t %= 1;
		this.ctx.beginPath();
		this.ctx.lineWidth = 3;
		this.ctx.strokeStyle = lineColor;
		this.ctx.moveTo(this.h[0].getX(), this.h[0].getY());
		for(let i = 1; i < this.h.length; i++){
			this.ctx.lineTo(this.h[i].getX(), this.h[i].getY());
		}
		this.ctx.stroke();
	}
	phase(c, rate){
		for(let i = 0; i < this.n.length && i < c.length; i++){
			this.n[i] = new Complex((this.n[i].r + c[i].r * rate) / (1 + rate), (this.n[i].a + c[i].a * rate) / (1 + rate));
		}
		for(let i = this.n.length; i < c.length; i++){
			this.n.push(c[i].mlt(new Complex(1, 0)));
		}
		if(this.n.length > c.length){
			this.n.splice(c.length, this.n.length - c.length);
		}
	}
}

function calc(p, n, scale = 1){
	let result = new Complex();
	for(let i = 0; i < p.length; i++){
		let x = p[i].mlt(new Complex(1 / p.length, -2 * Math.PI * n * i / p.length));
		result = result.add(x);
	}
	result.r *= scale;
	return result;
}
function calculate(p, x, scale = 1, center = false){
	let n = [];
	n.push(calc(p, 0, scale));
	for(let i = 1; i <= x; i++){
		n.push(calc(p, -i, scale));
		n.push(calc(p, i, scale));
	}
	if(center == true){
		n[0] = new Complex(0, 0);
	}
	return n;
}