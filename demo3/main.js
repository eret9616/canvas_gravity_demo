const canvas = document.querySelector('#canvas')

let raf = null
let lastFrame = 0;
let fps = 0
let lastCalculateFpsTime = 0;
function calculateFps(frame) {
      fps = 1000 / (frame - lastFrame);
}

// let duration = 5000 // 5s ease-in
// let duration = 1000 // 2s ease-out
let duration = 3000 // 2s  ease-in-out

let c = canvas.getContext('2d')
c.beginPath()
positionX = 30
c.arc(positionX,30, 30, 0, Math.PI * 2, false)
c.fillStyle = 'red'
c.fill();
c.closePath();


function animate(frame){
    if(frame >=duration){
        cancelAnimationFrame(raf)
        return
    }
    calculateFps(frame)
    
    c.clearRect(0, 0, canvas.width, canvas.height);

    let elapsed = (1000/fps/1000)
    let compeletePercent = frame/duration
    // console.log(compeletePercent);
    // 加入时间扭曲函数
    // let effectPercent = easeIn(2)(compeletePercent) // 5s
    // let effectPercent = easeOut(1)(compeletePercent) // 1s
    let effectPercent = easeInOut(1)(compeletePercent)
    elapsed = elapsed * effectPercent / compeletePercent

    if(fps && elapsed>0){
        // console.log(elapsed);
        let v = 1000
        let dx = v*elapsed
        console.log(dx);
        // console.log(dx);
          positionX+=dx
    }

    c.beginPath()
    c.arc(positionX,30, 30, 0, Math.PI * 2, false)
    c.fillStyle = 'red'
    c.fill();
    c.closePath();
    raf = requestAnimationFrame(animate)
    lastFrame = frame;
}

animate(performance.now())