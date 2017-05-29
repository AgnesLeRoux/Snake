var m = 10; //nbRows
var n = 10; //nbColumns

var scale= 10;
var zone = document.getElementById("zone");
var context = zone.getContext("2d");
 
zone.setAttribute("width",(n*scale)+"px");
zone.setAttribute("height",(m*scale)+"px");

var direction = "left"; //up, down, right, left

var tab = [];
var play = false;
var path = [];
var apple = [0,0]; 



function initializeTab()
{	
	path.push([3,3]);
	path.push([3,4]);
	path.push([3,5]);
	path.push([3,6]);
		
	for(var i=0; i<m; i++)
	{
		var line = [];
		for(var j=0; j<n; j++)
			line.push(false);
		tab.push(line);
	}
	
	for(var p=0; p<path.length; p++)
		tab[ path[p][0] ][ path[p][1] ] = true;
	
	generateNewApple();

	draw();
}

function generateNewApple()
{
	var idSquare = Math.floor(Math.random()*(m*n - path.length));

	var cpt = 0;
	var a;
	var b;
	label: 
	for(a=0 ; a < m ; a++)
		for(b=0 ; b < n ;b++)
		{
			if(cpt >= idSquare)
			{
				break label;
			}
			if(tab[a][b] == false)
				cpt++;
		}
	apple[0] = a;
	apple[1] = b;
}


initializeTab();

function draw()
{
	context.clearRect(0, 0, n*scale, m*scale);
	drawRectangle(apple,"red");
	for(var p=0; p<path.length; p++)
		drawRectangle(path[p], "black");

	
	/*
	for(var i=0 ; i<m ; i++)
		for(var j=0 ; j<n ;j++)
			if(tab[i][j])
			{
				drawRectangle([i,j],"black");
			}
			*/
}

function nextStep()
{
	
	var first = [path[0][0],path[0][1]];
	var a = path[path.length -1][0];
	var b = path[path.length -1][1];
	var last = [a,b];
	
	switch(direction)
	{
		case "up":
			first[0] = (first[0]-1+n)%n;
			break;	
		case "down":
			first[0] = (first[0]+1+n)%n;
			break;
		case "left":
			first[1] = (first[1]-1+n)%m;
			break;
		case "right":
			first[1] = (first[1]+1+n)%n;
	}
	
	tab[first[0]][first[1]] = true;
	if(first[0] == apple[0] && first[1] == apple[1])
	{
		generateNewApple();
		console.log("coucou");
	}
	else
	{
		tab[last[0]][last[1]] = false;
		path.pop();
	}
	path.unshift(first);
	
}

function nextStepDraw()
{
	nextStep();			
	draw();
}

var id;
document.addEventListener("keydown", function(e)
{
	//console.log(e.keyCode);
	if(e.keyCode==80)
	{
		play = !play;
		//console.log("play"+play);
			
		if(play)
		{
			id = setInterval(nextStepDraw, 500); //200
		}
		else
		{
			clearInterval(id);
		}
	}
});


function drawRectangle(coord,color)
{
	context.fillStyle = color;
	context.fillRect(scale*coord[1] , scale*coord[0],  scale, scale);
}

function clearRectangle(coord)
{
	context.clearRect(scale*coord[1] , scale*coord[0], scale, scale);
}

document.addEventListener("keydown",function(e)
{
	switch(e.keyCode)
 	{
    case  38:
 		if(direction != "down")
	 		direction = "up";
		 break;
  	case  40:
 		if(direction != "up")
	 		direction = "down";
 		break;
 	case  39:
		if(direction != "left")
			direction = "right";
 		break;
  	case  37:
		if(direction != "right")	
			direction = "left";
 		break;
	}
	//console.log(direction);
});
