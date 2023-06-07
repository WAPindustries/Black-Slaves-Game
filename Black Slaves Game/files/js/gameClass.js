class Game{

	static iNiggers = 10e+6
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
			["Consumer education to make ethical purchase decisions", ()=>
				Succeed(7e+6, 
					["Consumer demand for goods by these companies has decreased.",
					"Quantity of goods produced will also decrease.",
					"The number of child labourers required will decrease to meet a lower demand."]
				)
			],
			["Bring in more children from other districts", ()=>Fail(11e+6)],
			["Force children to drop out of school", ()=>Fail(11e+6)],
		],

		[
			["Invest in investigative journalism targeted at companies with child labour in the district", ()=>
				Succeed(Game.iNiggers-4e+6,
					["Raises public awareness about these companies using child labour.",
					"Demand for the goods and services produced by these companies will decrease.",
					"This gives the government the opportunity to shut down the company's production involved with child labour."]
				)
			],
			["Schools were destroyed due to landslide", ()=>Fail(13e+6)],
			["Remove child labour laws", ()=>Fail(13e+6)]
		],

		[
			["Stricter enforcement of child labour laws", ()=>
				Succeed(Game.iNiggers-3e+6, 
					["Accessible education provides children with a viable alternative to engaging in labor.",
					"Children can dedicate their time to acquiring knowledge, developing skills, and preparing for future opportunities.",
					"When education is readily available and of good quality, children and their families are more likely to choose education over work.",
					"This reduces supply of goods that would involve child labour."]
				)
			],
			["Execute all parents", ()=>Fail(15e+6)],
			["Establish policies that promote child labour", ()=>Fail(15e+6)],
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
		[2, 4, 2],
		[7, 2, 2],
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