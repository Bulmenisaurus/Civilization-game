
function generateblob(xpos,ypos, large, type = "hill"){
	
	let y = ypos
	let x= xpos
	let width=0
	let height=0
	
	if (type=="hill"){
	height = large ? getRandomInt(20,50):getRandomInt(5,10)
	
	
	width =large ? getRandomInt(20,50):getRandomInt(5,10)
	}
	else if (type == "lake"){
		const size = large ? getRandomInt(20,50):getRandomInt(5,10)
		width=size+getRandomInt(-10,10)
		height=size+getRandomInt(-10,10)

	}
	let maxx = x+width
	let minx = x-width
	
	for (i = y; i <y+height;i++){
		for (let j = minx; j<maxx;j++){
				if (type=="hill"){
				hillgrid[i].push((minx+maxx-j)*20)
				}
				else if (type=="lake"){
					rivergrid[i].push((minx+maxx-j)*20)
				}
				if (i==y && getRandomInt(0,1)==0){
					
					if (type=="hill"){
						hillgrid[i-1].push((minx+maxx-j)*20)
						}
						else if (type=="lake"){
							rivergrid[i-1].push((minx+maxx-j)*20)
						}
				}
				else if (i==y+height-1 && getRandomInt(0,1)==0){
					if (type=="hill"){
						hillgrid[i+1].push((minx+maxx-j)*20)
						}
						else if (type=="lake"){
							rivergrid[i+1].push((minx+maxx-j)*20)
						}
				}
			
			}
			//if(getRandomInt(0,100)==0){
			//generatevillage(maxx-3,i,1)
		//}
			maxx+=getRandomInt(-2,2)
		minx+=getRandomInt(-2,2)
		
		
	}
		
	
}
function generatevillage(xpos,ypos,type){
	let x = xpos
	let y = ypos
	const pieceindexes = []

	for (i=0,rand=getRandomInt(1,4);i<rand;i++){
		pieceindexes.push({index:12,change(){
			x+=1
			
	}
		})
	}
	for (i=0;i<10;i++){
		pieceindexes.push({index:4,change(){x+=1}})
		if(!hillgrid[y].includes(20*(x+i))){
			break
		}
		if(rivergrid[y].includes(20*(x+i))){
			return
		}
	}
	for (i=0;i<5;i++){
		pieceindexes.push({index:6,change(){x+=2;y+=2}})
	pieceindexes.push({index:1,change(){y-=2}})
	}
	const gridpositions=[]
	for (const el of pieceindexes){
		
		gridpositions.length=0
		
	for(i=0;i<p.pieceROM[el.index].piecepositions.length;i++){
		gridpositions.push({x:x*20+p.pieceROM[el.index].piecepositions[i].x*20,y:y*20+p.pieceROM[el.index].piecepositions[i].y*20})
		grid[y+p.pieceROM[el.index].piecepositions[i].y].push(x*20+p.pieceROM[el.index].piecepositions[i].x*20)
	}
	const oldresources = resources
	oldpop = unemployed
		p.pieceROM[el.index].effect()

		gridstats.push({
			letter:p.pieceROM[el.index].letter,
			population:p.population,
			employmentrequired: oldpop-unemployed,
			food:p.food,
			resources:p.resources,
			military:p.military,
			positions:[...gridpositions],
			resourcerefund: oldresources-resources,
			disabled: true
		})
		resources=oldresources
		unemployed=oldpop
		el.change()
	}
}
function generateriver(xpos,ypos, curve, times = 0){
	let x = xpos
	let rivertimes = times
	let rivercurve = curve
	let rand = 0
	for (let y = ypos;y<500;y++){
		if (getRandomInt(0+rivercurve,7) > 5){
			rivergrid[y].push(x*20)
			x+=1
			if (getRandomInt(0,100)==0&&rivertimes<7){rand =getRandomInt(-2,-5); generateriver(x,y,rand,rivertimes);rivercurve=rand*-1}
		}
		else if (getRandomInt(3,10-rivercurve) > 5){
			rivergrid[y].push(x*20)
			x-=1
			if (getRandomInt(0,100)==0&&rivertimes<7){rand =getRandomInt(2,5); generateriver(x,y,rand,rivertimes);rivercurve=rand*-1}
		}
		if (rivergrid[y].includes(x*20)&&y!=ypos){return}
		rivergrid[y].push(x*20)
		
	}
}
