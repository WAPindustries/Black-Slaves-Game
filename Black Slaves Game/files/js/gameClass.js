class Game{

	static iNiggers = 1e+6
	static aNiggers = []

	static aSmoke = []

	static iProgress = 0
	
	static sText = null
	static iTextIndex= 0

	static bSoyJacking = false
	static sResult

	static iChangeRate = 500

	static oEmote = {
		image: "files/assets/cryemote.png",
		width: 0,
		height: 0,
	}
	static iEmoteChange = 2

	static aChoices = [
		[
		    ["Implement child labour laws", ()=>Succeed(-4000)],
		    ["Force all children to drop out of school", ()=>Fail(+25000)],
		    ["Invest in investigative journalism", ()=>Succeed(-18000)],
		],
		[
		    ["Improve access to education", ()=>Succeed(-15000)],
		    ["Legalise child labour", ()=>Succeed(-4000)],
		    ["Give more sweets to experienced kidnappers", ()=>Fail(+10000)],
		],
		[
		    ["Increase enforcement of child labour laws", ()=>Succeed(-18000)],
		    ["Execute all existing parents", ()=>Fail(+30000)],
		    ["Cut off children's arms", ()=>Fail(+10000)],
		],
		[
		    ["Promote social protection programmes in rural areas in India", ()=>Succeed(-18000)],
		    ["Legalise child labour", ()=>Succeed(-4000)],
		    ["Ask online influencers to talk about child labour in India", ()=>Succeed(-100)],
		],
		[
		    ["Start a war", ()=>Fail(+15000)],
		    ["Educate parents about the negative impacts of child labour", ()=>Succeed(-4000)],
		    ["Educate consumers about ethical purchasing decisions", ()=>Succeed(-11000)],
		]
	]


	static GetImage(src){
		var image = new Image()
		image.src = src
		return image
	}

	static CreditAudio
	static PlayAudio(src, loop){
		Game.CreditAudio = new Audio(src)
		Game.CreditAudio.loop = loop
		Game.CreditAudio.play()
	}
	static EndAudio(){
		Game.CreditAudio.pause()
		Game.CreditAudio.currentTime = 0
	}


	static dTexture = {
		0: "grass.jpg",
		1: "kingtower.webp",
		2: "princesstower.webp",
		3: "soil.avif",
		4: "rubble.png"
	}


	static iScale = 100
	static iWidth = 9
	static iHeight = 8
	static aBackground = Array(Game.iWidth*Game.iHeight).fill(0)
	static aOverworld = Array(Game.iWidth*Game.iHeight)


	static aCoords = [
		[4, 2, 1],

		[2, 0, 2],
		[2, 3, 2],
		[7, 2, 2],
		[6, 4, 2],
		[5, 1, 2],
	]

	static CreateMap(){
		for (var coord of Game.aCoords) Game.aOverworld[coord[1]*Game.iWidth+coord[0]] = coord[2]
	}
	

	static iSpawnTime = 3000
	static iSpawnRate = 8
	static SpawnNiggers(){
		if (Game.aCoords.filter(i=>i[2]==2).length==0) return
		
		for (var i=0;i<Game.iSpawnRate;i++){
			Game.aNiggers.push(new Nigger({
					x: Rng(2)*canvas.width, 
					y: Rng(canvas.height)+Rng(2)*canvas.width,
					width: Game.iScale,
					height: Game.iScale,
				})
			)
		}
		setTimeout(Game.SpawnNiggers, Game.iSpawnTime)
	}


	static Render(){
		setTimeout(Game.Render, 100)
		context.clearRect(0,0,canvas.width, canvas.height)
		Game.RenderMap()

		Game.RenderNiggers()

		Game.RenderSmoke()
		context.globalAlpha = 1

		Game.RenderEmote()

		if (Game.sResult) context.drawImage(Game.GetImage(`files/assets/${Game.sResult}`), 0,0, canvas.width, canvas.height)
		if ([...container.childNodes].some(i=>i.id=="choicebox") || Game.iProgress>=Game.aChoices.length) Game.bSoyJacking = false
		if (Game.bSoyJacking) context.drawImage(Game.GetImage("files/assets/soyjak.png"), 0,0,canvas.width, canvas.height)
	}

	static RenderNiggers(){
		for (var nigger of Game.aNiggers){
			nigger.Update()
			context.drawImage(
				Game.GetImage("files/assets/slave.png"),
				nigger.x, nigger.y,
				nigger.width, nigger.height
			)
		}
	}

	static RenderSmoke(){
		for (var smoke of Game.aSmoke){
			smoke.Update()
		}
		for (var smoke of Game.aSmoke){
			smoke.Render()
		}
	}


	static RenderEmote(){
		var coords = Game.aCoords.filter(i=>i[2]==1)[0]
		context.drawImage(
			Game.GetImage(Game.oEmote.image),
			(coords[0]+1)*Game.iScale,
			coords[1]*Game.iScale,
			Game.oEmote.width,
			Game.oEmote.height
		)
	}


	static RenderMap(){

		for (var map of Array(Game.aBackground, Game.aOverworld)){
			for (var i=0;i<Game.iHeight;i++){
				for (var j=0;j<Game.iWidth;j++){

					var tile = map[i*Game.iWidth+j]
					
					if (tile==undefined) continue

					context.drawImage(
						Game.GetImage(`files/assets/${Game.dTexture[tile]}`),
						j*Game.iScale,
						i*Game.iScale,
						Game.iScale,
						Game.iScale
					)

				}
			}
		}
	}
	

}