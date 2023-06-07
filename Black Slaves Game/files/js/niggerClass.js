class Nigger{

	constructor({}){
		for (var arg in arguments[0]) this[arg] = arguments[0][arg]
		this.speed = 10
	}

	Update(){
		if (Game.aCoords.filter(i=>i[2]==2).length==0) return
		
		var loc = this.FindLabour()
		var angle = Math.atan2(loc[1]-this.y, loc[0]-this.x)
		var velocity = {
			x: Math.cos(angle)*this.speed,
			y: Math.sin(angle)*this.speed
		}
		this.x+=velocity.x
		this.y+=velocity.y

		var dx = Math.abs(loc[0]+Game.iScale/2-this.x-this.width/2)
		var dy = Math.abs(loc[1]+Game.iScale/2-this.y-this.height/2)
		var dist = Math.sqrt(dx*dx+dy*dy)
		if (dist<=(Game.iScale+this.width)/2) Game.aNiggers.splice(Game.aNiggers.indexOf(this), 1)
	}

	FindLabour(){
		return Game.aCoords.filter(i=>i[2]==2).filter(
			i=>Math.sqrt(Math.pow(Math.abs(i[0]*Game.iScale-this.x), 2)+Math.pow(Math.abs(i[1]*Game.iScale-this.y), 2)) ==
			Game.aCoords.filter(i=>i[2]==2).map(i=>Math.sqrt(Math.pow(Math.abs(i[0]*Game.iScale-this.x), 2)+Math.pow(Math.abs(i[1]*Game.iScale-this.y), 2))).sort()[0]
		)[0].map(i=>i*Game.iScale)
	}
}