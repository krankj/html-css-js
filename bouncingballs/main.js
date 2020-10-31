const canvas = document.querySelector('canvas');
const span = document.querySelector('span')
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function Ball(x, y, velX, velY,color,size, exists){
	Shape.call(this,x,y,velX,velY,exists);
	this.color = color;
	this.size = size;
}

function EvilCircle(x,y,exists){
	Shape.call(this,x,y,40,40,exists);
	this.color = 'white';
	this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, "constructor", {
	value: EvilCircle,
	enumerable: false,
	writable: true
})

EvilCircle.prototype.draw = function(){
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0 , 2 * Math.PI);
	ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
	if((this.x + this.size) >= width){
    this.x  = width - this.size;
	}

    if((this.x - this.size) <= 0){
      this.x = 0 + this.size;
    }

    if((this.y + this.size ) >= height){
    	this.y = height - this.size;
    }

    if((this.y - this.size) <=0){
    	this.y = 0 + this.size;
    }

}

function handleKeyPress(){
  let map = {};
  window.onkeydown = window.onkeyup = function(e){
    map[e.key] = e.type === 'keydown'
  }
  return map;
}

EvilCircle.prototype.setControls = function() {
	let _this = this;
  let map = {};
  window.onkeydown = window.onkeyup = function(e){
    console.log("Event type is", e.type)
    map[e.key] = e.type === 'keydown';
    if(map['a']){
      _this.x -= _this.velX;
    }
    if(map['w']){
      _this.y -= _this.velY;
    }
    if (map['d']) {
      _this.x += _this.velX;
    }if (map['s']) {
      _this.y += _this.velY;
    }
  }
  
  //   window.onkeydown = function(e) {
  //   if (e.key === 'a') {
  //     _this.x -= _this.velX;
  //   }  if (e.key === 'd') {
  //     _this.x += _this.velX;
  //   } if (e.key === 'w') {
  //     _this.y -= _this.velY;
  //   } if (e.key === 's') {
  //     _this.y += _this.velY;
  //   }
  // }
}

EvilCircle.prototype.collisionDetect = function(){
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size) {
       balls[j].exists = false;
      }
    }
  }
}

Ball.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ball.prototype,'constructor',{
	value: Ball,
	enumerable: false,
	writable: true
})

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0 , 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = Math.abs(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = Math.abs(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    true
  );

  balls.push(ball);
}


let evilCircle = new EvilCircle(
	random(0 + 10,width - 10),
    random(0 + 10,height - 10),
    true);
evilCircle.setControls();

function loop() {
  let j = 0;
 ctx.fillStyle = 'rgba(0,0,0,0.25)'; // the balls leave behind a trail since we are running these frames in a loop. Remove the requestAnimationFrame and see what color this is.
 ctx.fillRect(0, 0, width, height);
 evilCircle.draw();
 evilCircle.checkBounds();
 evilCircle.collisionDetect();

  for (let i = 0; i < balls.length; i++) {
  	if(balls[i].exists){
      j++;
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
}
  }
  span.textContent = j;



requestAnimationFrame(loop);


}

loop();
