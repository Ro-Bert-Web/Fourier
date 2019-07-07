class Complex{
	constructor(r = 0, a = 0){
		this.r = r;
		this.a = a;
	}
	mod(){
		if(this.r < 0){
			this.r *= -1;
			this.a += Math.PI;
		}
		while(this.a < 0){
			this.a += Math.PI * 2;
		}
		this.a %= Math.PI * 2;
		return this;
	}
	fromRect(x, y){
		this.r = Math.sqrt(x * x + y * y);
		this.a = 0;
		if(this.r > 0){
			this.a = Math.acos(x / this.r);
			if(y < 0){
				this.a = 2 * Math.PI - this.a;
			}
		}
		this.mod();
		return this;
	}
	set(r, a){
		this.r = r;
		this.a = a;
		this.mod();
	}
	setR(r){
		this.r = r;
		this.mod();
	}
	setA(a){
		this.a = a;
		this.mod();
	}
	add(cmp){
		let result = new Complex();
		let x = this.getX() + cmp.getX();
		let y = this.getY() + cmp.getY();
		result.fromRect(x, y);
		result.mod();
		return result;
	}
	mlt(cmp){
		let result = new Complex();
		result.setR(this.r * cmp.r);
		result.setA(this.a + cmp.a);
		this.mod();
		return result;
	}
	getX(){
		return this.r * Math.cos(this.a);
	}
	getY(){
		return this.r * Math.sin(this.a);
	}
}