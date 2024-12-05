var canvas = document.getElementById('gameCanvas'); // create canvas
var ctx = canvas.getContext('2d'); // get canvas context
var w = canvas.width; // get canvas width
var h = canvas.height; // get canvas height

var cell_size = 20;
var food;
var snake;
var direction;
var score;

// create rect
ctx.strokeStyle = 'black';
ctx.strokeRect(0, 0, w, h);

function init(){
	// create a snake
	create_snake();
	// create a food
	create_food();

	score = 0;
	direction = 'right';
	window.onkeydown = keyEvent;
	// start the game
	if(typeof game_loop != 'undefined')
		clearInterval(game_loop);
	game_loop = setInterval(paintCanvas, 80);
}
init();

function create_snake(){
	var snake_length = 3;
	snake = [];
	for(var i = snake_length-1; i>=0; i--){
		snake.push({
			x:i,
			y:0
		});
	}
}

function create_food(){
	food = {
		x: Math.round(Math.random()*(w-cell_size)/cell_size),
		y: Math.round(Math.random()*(h-cell_size)/cell_size)
	}
}

function paintCanvas(){
	ctx.fillStyle = '#f4a261';
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = '#e76f51';
	ctx.strokeRect(0, 0, w, h);

	var hx = snake[0].x;
	var hy = snake[0].y;

	if(direction == 'right')
		hx++;
	else if(direction == 'right')
		hx++;
	else if(direction == 'left')
		hx--;
	else if(direction == 'up')
		hy--;
	else if(direction == 'down')
		hy++;

	// set canvas borders condition
	if(hx == -1 || hx == w/cell_size || hy == -1 || hy == h/cell_size || check_collision(hx,hy,snake)) {
		init();
		return;
	}

	if(hx == food.x && hy == food.y){ // snake eat the food
		score++; // increase score points eating food
		create_food(); //generate new random food
	} else {
		snake.pop();
	}
	var new_head = {x: hx, y: hy};
	snake.unshift(new_head);

	for(var i = 0; i < snake.length; i++){
		paint_cell(snake[i].x, snake[i].y);
	}

	paint_cell(food.x, food.y);

	// score text
	ctx.fillStyle = '#264653';
	ctx.font = '20px Montserrat';
	ctx.fillText('score', 20, 480);
	ctx.fillText(score, 80, 480);
}

function paint_cell(x,y) {
	ctx.fillStyle = '#264653';
	ctx.fillRect(x*cell_size, y*cell_size, cell_size, cell_size);
	ctx.strokeStyle = '#f4a261';
	ctx.strokeRect(x*cell_size, y*cell_size, cell_size, cell_size);
}

function check_collision(x,y,array){
	for(var i = 0; i < array.length; i++) {
		if(array[i].x == x && array[i].y == y) {
			return true;
		}
	}
	return false;
}

function keyEvent(e) {
	var key = e.which; // get which key has benn pressed
	if(key == '37' && direction!='right') // left arrow key
		direction = 'left';
	else if (key == '38' && direction!='down') // up arrow key
		direction = 'up';
	else if (key == '39' && direction!='left') // right arrow key
		direction = 'right';
	else if (key == '40' && direction!='up') // down arrow key
		direction = 'down';
}
