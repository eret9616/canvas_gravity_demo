const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let raf = null


// 1 设置fps变量
let fps = 0
// 2 上次计算fps的时间 // 间隔1s
let lastCalculateFpsTime = 0;
// 3 上一个frame的时间
let lastFrameTime = 0;


let duration = 5 // 5s


let elapsedTime = 0
function getElapsedTime(elpased){
  // console.log('=========elapsed');
  // console.log(elpased);
  elapsedTime += elpased;
  // console.log(elapsedTime);
  // console.log('=============');
  if(elapsedTime >= duration){
      stop()
  }
}


function calculateFps(frameTime) {
  //  fps= 每秒播放了多少个frame  
  //  calculateFps函数，会在每个frame之间执行，
  //  按理来说每隔16.67ms会执行一次，
  //  但是实际可能会有渲染延迟
  // frame - lastFrame 不一定等于16.67 可能会大
  if (lastFrameTime && (fps === 0 || frameTime - lastCalculateFpsTime > 1000)) { 
    //真实fps = 1000/ （真实frameTime-真实lastFrameTime)
    fps = 1000 / (frameTime - lastFrameTime); 
    lastCalculateFpsTime = frameTime;
  }
}



// 自由落体
// v = gt
// s = dt*v 

// g = 9.8m/s^2

var gravity = 1;
var friction = 1;

addEventListener('click', () =>{
  init();
});

function Ball(x, y, radius, color, dy, dx) {
    this.x = x;
    this.y = y;
    this.vy =0; // 垂直方向速度
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

Ball.prototype.update = function(elapsed) {

  console.log('========elapsed'); // 真实经过的秒数
  console.log(elapsed);
  console.log('===============');

  let dt = (elapsed) ? elapsed/1000:0 //elapsed是毫秒, 而速度单位是m/s，所以要除1000

  // getElapsedTime(t)
  console.log('============t');
  console.log(dt);
  console.log('==============');

  // update方法 在每帧更新小球位置时，我们将上一帧经过的时间传给ball.update
   // 如果移动距离大于了canvas的高度
  if (this.y + this.radius + this.dy > canvas.height) {
      // 那么向相反的方向运动
      this.dy = -this.dy * friction;
  } else {
    // 否则dy要加一个距离
    //  dv = dt * g
    //  dy = dt * dv

    this.vy += 9.8 * dt // v = gt 
    dy = this.vy * dt
 
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
    elapsedTime = 0;
    var radius = randomIntFromRange(10, 40);
    var x = randomIntFromRange(radius, canvas.width - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    var color = 'red'
    ball = new Ball(x, 0, radius, color, dx, dy, 0);
}

//       animate函数会接受一个当前帧开始执行的时间戳的参数
function animate(frameTime) {
    // todo：这里可以执行一些动画的更新

    calculateFps(frameTime)

    console.log('---------test');
    console.log('-----lastCalculateFpsTime');
    console.log(lastCalculateFpsTime);
    console.log('---lastFrame');
    console.log(lastFrameTime);
    console.log('-------------');
    // console.log('======fps');
    // console.log(fps);
    // console.log('==========');
    raf = requestAnimationFrame(animate);
    lastFrameTime = frameTime;
    
    c.clearRect(0, 0, canvas.width, canvas.height);

              // fps是 帧数/秒
    ball.update( 1000/fps)
}

function stop(){
  cancelAnimationFrame(raf)
}


init();
animate(performance.now())
