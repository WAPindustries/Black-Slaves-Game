function Init(){

	[...container.childNodes].forEach(elem=>container.removeChild(elem))

	Array(canvas, slave_count, info_bg, score_bg).forEach(elem=>container.appendChild(elem))
	
	info_bg.appendChild(info_mask)
	info_bg.appendChild(info_text)
	info_bg.appendChild(info_btn)

	score_bg.appendChild(score_mask)
	score_bg.appendChild(scorescreen)

	slave_count.innerHTML = "Child Labourers: " + Game.iNiggers
	FitText(slave_count, 100)

	Game.CreateMap()
	Game.SpawnNiggers()
	Game.Render()


	document.getElementById("song").loop = true
	document.getElementById("song").volume = 0.4
	document.getElementById("song").play()

	TriggerChoice(Game.aChoices[Game.iProgress])
}


function GameStart(){

	document.body.appendChild(container)
	Array(startscreen, startmask, startbtn).forEach(elem=>container.appendChild(elem))
	FitText(startbtn, 100)
}


// main container
const container = document.createElement("div")
container.style = "position: absolute; margin: auto; top: 0; right: 0; left:0; bottom:0"
container.style.width = 900
container.style.height = 600



// game start ui
const startscreen = document.createElement("canvas")
startscreen.width = parseInt(container.style.width, 10)
startscreen.height = parseInt(container.style.height, 10)
startscreen.style = "position: absolute; background-image: url('files/assets/shocked.jpg'); background-size: 100% 100%; border-radius: 15px; outline: 2px solid white"

const startmask = document.createElement("canvas")
startmask.width = startscreen.width
startmask.height = startscreen.height
startmask.style = "position: absolute; background-color: black; opacity: 0.6; border-radius: 15px; outline: 2px solid white"

const startbtn = document.createElement("button")
startbtn.id = "start"
startbtn.style = "position: absolute; top: 0; bottom:0; right:0; left:0; margin: auto; border-radius: 15px; background: none; border: none; color: white"
startbtn.style.width = startscreen.width/5
startbtn.style.height = startscreen.height/7
startbtn.innerHTML = "Start"
startbtn.onclick = ()=>Init()


//game ui
const canvas = document.createElement("canvas")
canvas.style = "position: absolute; margin: auto; outline: 2px solid white; border-radius: 15px"
canvas.style.width = canvas.width = parseInt(container.style.width, 10)
canvas.style.height = canvas.height = parseInt(container.style.height, 10)

const context = canvas.getContext('2d')


const slave_count = document.createElement("div")
slave_count.style = `position: absolute; margin: auto; user-select: none;
						outline: 2px solid white; background: black; border-bottom-left-radius: 20px; border-top-right-radius: 15px;
						text-align: center; color: white; padding: 15px`
slave_count.style.width = canvas.width/3
slave_count.style.height = canvas.height/10

slave_count.style.left = canvas.width-parseInt(slave_count.style.width, 10)


const info_bg = document.createElement("div")
info_bg.style = "position: absolute; margin: auto; display: none; background-image: url('files/assets/shocked.jpg'); background-size: 100% 100%; border-radius: 20px"
info_bg.style.width = canvas.width*2/3
info_bg.style.height= canvas.height*2/3
info_bg.style.left = canvas.width/2-parseInt(info_bg.style.width, 10)/2
info_bg.style.top = canvas.height/2-parseInt(info_bg.style.height, 10)/2

const info_mask = document.createElement("canvas")
info_mask.width = parseInt(info_bg.style.width, 10)
info_mask.height = parseInt(info_bg.style.height, 10)
info_mask.style = "opacity: 0.6; border-radius: 20px;"
info_mask.getContext('2d').fillStyle = "black"
info_mask.getContext('2d').fillRect(0,0,info_mask.width, info_mask.height)

const info_text = document.createElement("div")
info_text.style = `position: absolute; margin: auto; user-select: none; border: 2px solid white; 
					border-radius: 20px; text-align: center; color: white; padding: 15px; font-size: 50px;`
info_text.style.width = canvas.width*2/3
info_text.style.height = canvas.height*2/3
info_text.style.left = 0
info_text.style.top = 0

const info_btn = document.createElement("div")
info_btn.style = "position: absolute; margin: auto; user-select: none; border: none;"
info_btn.style.background = "url('files/assets/arrow.png')"
info_btn.style.backgroundSize = "100% 100%"
info_btn.id = "start"
info_btn.style.width = parseInt(info_bg.style.width, 10)/14
info_btn.style.height = parseInt(info_bg.style.height, 10)/7
info_btn.style.right = parseInt(info_text.style.border, 10)*3
info_btn.style.bottom = parseInt(info_text.style.border, 10)*3

info_btn.onclick = ()=> {
	DisplayInfo(Game.sText, Game.iTextIndex+=1)
}



// game end ui

const score_bg = document.createElement("div")
score_bg.style = `display: none;position: absolute;top: 0; right:0; bottom:0; left:0; margin: auto; 
					background-image: url('files/assets/shocked.jpg'); background-size: 100% 100%; border-radius: 20px; outline: 5px solid black`
score_bg.style.width = canvas.width/2
score_bg.style.height = canvas.height/2

const scorescreen = document.createElement("div")
scorescreen.style = `position: absolute; top: 0; right:0; bottom:0; left:0; margin: auto; color: black;
						text-align: center;line-height: 100px; border-radius: 20px; color: white; outline: 5px solid black`
scorescreen.style.width = parseInt(score_bg.style.width, 10)
scorescreen.style.height = parseInt(score_bg.style.height, 10)
scorescreen.style.fontSize = parseInt(score_bg.style.height, 10)/5


const score_mask = document.createElement("div")
score_mask.style.width = parseInt(score_bg.style.width, 10)
score_mask.style.height =  parseInt(score_bg.style.height, 10)
score_mask.style = "position: absolute; top: 0; right:0; bottom:0; left:0; margin: auto; opacity: 0.6; background: black; border-radius: 20px; outline: 5px solid black"