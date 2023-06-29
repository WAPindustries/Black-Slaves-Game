class Smoke{

	constructor({}){
		for (var arg in arguments[0]) this[arg] = arguments[0][arg]
			this.opacity = 1
	}

	Update(){
		this.y-=this.rise
		this.opacity-=this.decay
		if (this.opacity<=0) Game.aSmoke.splice(Game.aSmoke.indexOf(this), 1)
	}
	Render(){
		context.globalAlpha = this.opacity
		context.drawImage(smokeimage, this.x, this.y, this.width, this.height)
	}

}

const smokeimage = Game.GetImage("files/assets/smoke.png")