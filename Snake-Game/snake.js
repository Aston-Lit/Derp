$(document).ready(function(){

	//set up canvas
	var canvas = document.getElementById("snakeCanvas");
	var context = canvas.getContext("2d");

	//Set up grids
	var gridNum = 25;
	var gridSize = canvas.width / gridNum;

	//set up food and snake objects
	var snake = {
		tail: 1,
		x: 22,
		y: 6,
		//direction: right - 0, left - 1
		//up -2 , down - 3, stopped - 5
		direction: 5,
		alive: true
	}
 	
	var food = {
		x: 0,
		y: 0,
		alive: false
	}

	//store coordinates of the body part
	var snakeBody = [[15,6]]

	//set up keys
	var keyPressed = null;
	var leftKey = 65, upKey = 87, rightKey = 68, downKey = 83;

	//make custom insert method for Array
	Array.prototype.insert = function(index, item){
		//.splice(index to insert, no of items to delete, new items)
		this.splice(index, 0, item);
	}

	function update(){ //change direction 
		if (keyPressed) { 
			if(keyPressed ==rightKey && snake.direction != 1) snake.direction = 0; 
			if(keyPressed ==leftKey && snake.direction != 0) snake.direction = 1; 
			if(keyPressed ==upKey && snake.direction != 3) snake.direction = 2; 
			if(keyPressed ==downKey && snake.direction != 2) snake.direction = 3; 
		}

		//spawn food
		if(!food.alive){
			food.x = Math.floor(Math.random()*gridNum);
			food.y = Math.floor(Math.random()*gridNum);

		//check if on snake, if on snake collided=true
		var collided;
		do {
			collided = false;
			for(var i = 0; i < snake.tail; i++){
				if(food.x == snakeBody[i][0] && food.y == snakeBody[i][1]){
					food.x = Math.floor(Math.random()*gridNum);
					food.y = Math.floor(Math.random()*gridNum);
					collided = true;
					break;
				}
			}
		}while(collided)

		//set food alive
		food.alive = true;
		}

		//check if eating food
		if(snake.x == food.x && snake.y == food.y){
			food.alive = false;
			snake.tail++;
		}

		//check if hit itself
		if(snake.tail>1){
			for(var i = 1; i < snake.tail; i++){
				if(snake.x == snakeBody[i][0] && snake.y == snakeBody [i] [1]){
					snake.alive = false;
					clearInterval(updates);
				}
			}
		}

		//check if hit border
		if(snake.x < 0 || snake.x >= gridNum || snake.y < 0 || snake.y >= gridNum){

			snake.alive = false;
			clearInterval(updates);
		}

		//move the snake/player
		snakeBody.insert(0, [snake.x, snake.y])
		while(snakeBody.length > snake.tail +1){
			snakeBody.pop();
		}

		//direction: right - 0, left - 1
		//up -2 , down - 3, stopped - 5
		switch(snake.direction){
			//right
			case 0:
			snake.x += 1; break;
			//left
			case 1:
			snake.x -= 1; break;
			//up
			case 2:
			snake.y -= 1; break;
			//down
			case 3:
			snake.y += 1; break;


		}
		if(snake.alive){
			draw();
		}
	



	}

	function draw(){
		context.clearRect(0,0, canvas.width, canvas.height);
		//draw food
		context.fillStyle = "yellow";;
		context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

		//draw snake
		for(var i = 0; i < snake.tail; i++){
			context.fillStyle = "green";
			context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
		}
	}

	//keyboard
	$(window).on("keydown", function(event){
		keyPressed = event.which;
	})

	//run frame updates
	update();
	var updates = setInterval(update, 100);

	})