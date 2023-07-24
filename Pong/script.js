import Ball from "./elements/Ball.js";
import Paddle from "./elements/Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreELem = document.getElementById("player-score")
const computerScoreELem = document.getElementById("computer-score")

let lastTime
function update(time) {
    if ( lastTime != null) {
        const delta = time - lastTime
       ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        
    if (isLose()) handleLose();

    }
      
    lastTime = time
    window.requestAnimationFrame(update)
}
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0

    }

function handleLose() {
   const rect = ball.rect()
   if (rect.right >= window.innerWidth) {
    playerScoreELem.textContent = parseInt(playerScoreELem.textContent) + 1
   } else {
    computerScoreELem.textContent = parseInt(computerScoreELem.textContent) + 1
   }
    ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)