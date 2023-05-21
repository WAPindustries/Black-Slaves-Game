function Rng(ubound, lbound=0){
	return Math.floor(Math.random()*ubound+lbound)
}


function ChangeNiggers(val, step=1e+4, text){
	Game.iNiggers+=(Game.iNiggers>val ? -step:step)
	slave_count.innerHTML = "Child Labourers: " + Game.iNiggers
	if (Game.iNiggers!=val) setTimeout(()=>ChangeNiggers(val, step, text), 1)
	else {
		Game.EndAudio()
		Game.sResult = undefined
		if (text!=undefined){
			DisplayInfo(text, 0)
			return
		}
		TriggerChoice(Game.aChoices[++Game.iProgress])
		document.getElementById("song").play()
	}
}


function TriggerChoice(choices){

	if (choices==undefined) {
		setTimeout(GameEnd, 1000)
		return
	}

	for (var choice of choices.sort(()=>Math.random()-0.5)){
		
		let choicebox = document.createElement("div")
		choicebox.style = `position: absolute; margin: auto;
							 border: 2px solid white; border-radius: 20px;
							 text-align: center; user-select: none; 
							 color: white; padding: 15px; background: grey`
		choicebox.style.width = parseInt(container.style.width, 10)*4.5/7
		choicebox.style.height = parseInt(container.style.height, 10)*1/9

		choicebox.style.left = parseInt(container.style.left, 10)+parseInt(container.style.width, 10)/2-parseInt(choicebox.style.width, 10)/2

		let dist = parseInt(choicebox.style.height, 10)+20
		choicebox.style.top = parseInt(container.style.top, 10)+parseInt(container.style.height, 10)/2-choices.length/2*dist+choices.indexOf(choice)*dist

		choicebox.innerHTML = choice[0]
		choicebox.func = choice[1]
		choicebox.id = "choicebox"

		choicebox.onclick = ()=>{RemoveChoice(); choicebox.func()}

		container.appendChild(choicebox)
		FitText(choicebox, 100)

	}
}


function RemoveChoice(){

	for (var elem of [...container.childNodes]){
		if (elem.id=="choicebox") container.removeChild(elem)
	}

}


function SoyJack(){
	const sj = setInterval(()=>{
		if ([...container.childNodes].some(i=>i.id=="choicebox") || Game.iProgress>=Game.aChoices.length) clearInterval(sj)
		Game.bSoyJacking = Game.bSoyJacking ? false:true
	}, 500)
}


function Type(string, text, textindex, index=0){
	if (index>=string.length) {
		setTimeout(()=>DisplayInfo(text, textindex+1), 1000)
		return
	}
	info_text.innerHTML += string[index]
	setTimeout(()=>Type(string, text, textindex, index+1), 50)
}

function DisplayInfo(text, index=0){
	info_bg.style.display = "block"
	info_text.innerHTML = "</br></br>"
	if (text[index]==undefined) {
		info_bg.style.display = "none"
		setTimeout(FuckingExplode, 500)
		setTimeout(()=>TriggerChoice(Game.aChoices[++Game.iProgress]), 3000)
		return
	}
	Type(text[index], text, index)
}


function Succeed(val, step, text){
	Game.sResult = "succeeded.webp"

	Game.iSpawnTime *= 1.5
	Game.iSpawnRate = Game.iNiggers==0 ? 0:Math.floor(Game.iSpawnRate/2)

	ChangeNiggers(val, step, text)
	Game.PlayAudio("files/assets/succeeded.mp3", false)
}

function Fail(val, step){

	document.getElementById("song").pause()

	Game.sResult = "failed.png"

	Game.iSpawnTime/=2
	Game.iSpawnRate*=2

	SoyJack()
	ChangeNiggers(val, step)
	Game.PlayAudio("files/assets/failed.mp3", true)
}


function FuckingExplode(){
	var coords = Game.aCoords.filter(i=>i[2]==2)[Math.floor(Math.random()*Game.aCoords.filter(i=>i[2]==2).length)]
	var tile = coords[1]*Game.iWidth+coords[0]
	coords[2] = 4
	Game.aOverworld[tile] = 4
	Game.PlayAudio("files/assets/pipe.mp3", false)

	Game.PlayAudio("files/assets/heeheeheehaw.mp3", false)
	HEEHEEHEEHAW("cryemote.png")

	GenSmoke(coords, 3)
}

function GenSmoke(coords, rep){
	if (rep<=0) return
	Game.aSmoke.push(
		new Smoke({
			x: coords[0]*Game.iScale+Math.random()*Game.iScale-Game.iScale*0.5,
			y: coords[1]*Game.iScale+Game.iScale/2,
			width: 70,
			height: 50,
			decay: Math.random()*0.05+0.01,
			rise: Math.random()*8+5
		})
	)
	setTimeout(()=>GenSmoke(coords, rep-1), 1000)
}


function HEEHEEHEEHAW(img){
	Game.oEmote = {
		image: `files/assets/${img}`,
		width: 0,
		height: 0
	}

	const ExpandEmote = setInterval(()=>{
		Game.oEmote.width+=Game.iEmoteChange
		Game.oEmote.height+=Game.iEmoteChange
		if (Game.oEmote.width>=Game.iScale){
			clearInterval(ExpandEmote)
			setTimeout(
				()=>{
					const CompressEmote = setInterval(()=>{
						Game.oEmote.width-=Game.iEmoteChange
						Game.oEmote.height-=Game.iEmoteChange
						if (Game.oEmote.width<=0) clearInterval(CompressEmote)
					}, 1)
				}
			, 1500)
		}
	}, 1)
}

function ShowScore(count=0){
	if (Game.iNiggers==0) scorescreen.innerHTML = `</br>Child Labourers: </br>0`
	if (count>Game.iNiggers || Game.iNiggers==0) return FlashScore()
	scorescreen.innerHTML = `</br>Child Labourers: </br> ${count}`
	setTimeout(()=>ShowScore(count+1e+5), 1)
}

function FlashScore(){
	setInterval(()=>{
		scorescreen.style.color = scorescreen.style.color=="white" ? "black":"white"
	}, 800)
}

function GameEnd(){

	let changespeed = 5

	score_bg.style.display = "block"
	score_bg.style.width = score_bg.style.height = 0;
	[...score_bg.childNodes].forEach((elem)=>{elem.style.width=0;elem.style.height=0})
	// scorescreen.innerHTML = "</br>Child Labourers: </br> 0"

	const ExpandScore = setInterval(()=>{
		score_mask.style.width = scorescreen.style.width = score_bg.style.width = parseInt(score_bg.style.width, 10)+changespeed
		score_mask.style.height = scorescreen.style.height = score_bg.style.height = parseInt(score_bg.style.height, 10)+changespeed
		score_bg.style.backgroundImage = `url('files/assets/shocked.jpg')` 
		score_bg.style.backgroundSize = "100% 100%";

		if (parseInt(score_bg.style.width, 10)>=canvas.width/2) {
			clearInterval(ExpandScore)
			ShowScore()
		}
	}, 1)

}