const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


var dy = 1;
var friction = 1;

addEventListener('click', () =>{
  init();
});

function Ball(x, y, radius, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill();
    c.closePath();
}

Ball.prototype.update = function() {
   // 如果移动距离大于了canvas的高度
  if (this.y + this.radius + this.dy > canvas.height) {
      // 那么向相反的方向运动
      this.dy = -this.dy * friction;
  } else {
    // 否则dy要加一个距离
    //  dv = dt * g
    //  dy = dt * dv
    this.dy += dy;

    // s = 1/2 g * t&2  
  }

  if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }


    // 计算位移
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
}

var ball;


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function init() {
    var radius = randomIntFromRange(10, 40);
    var x = randomIntFromRange(radius, canvas.width - radius);
    // var y = randomIntFromRange(0, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = 'red'
    ball = new Ball(x, 0, radius, color, dx, dy, 0);
}


function animate() {
    requestAnimationFrame(animate); 
    c.clearRect(0, 0, canvas.width, canvas.height);
    ball.update()  // 基于浏览器帧速率刷新动画
}

init();
animate()
