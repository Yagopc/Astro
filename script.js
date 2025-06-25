const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spaceship = new Image();
spaceship.src = 'nave.gif';

const ballImage = new Image();
ballImage.src = 'ball.gif';

let balls = [];
let score = 0;
let gameOver = false;

document.addEventListener('mousemove', moveSpaceship);
document.addEventListener('click', shootLaser);

function moveSpaceship(event) {
    spaceship.x = event.clientX - spaceship.width / 2;
}

function shootLaser() {
    // Lógica para disparar láser
}

function createBall() {
    const ball = {
        x: Math.random() * canvas.width,
        y: 0,
        speed: 2 + Math.floor(score / 10)
    };
    balls.push(ball);
}

function updateBalls() {
    balls.forEach((ball, index) => {
        ball.y += ball.speed;
        if (ball.y > canvas.height) {
            gameOver = true;
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceship, spaceship.x, canvas.height - spaceship.height - 10);
    balls.forEach(ball => {
        ctx.drawImage(ballImage, ball.x, ball.y);
    });
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
    if (!gameOver) {
        updateBalls();
        draw();
        requestAnimationFrame(gameLoop);
    } else {
        alert('Game Over');
    }
}

spaceship.onload = () => {
    spaceship.x = canvas.width / 2 - spaceship.width / 2;
    setInterval(createBall, 3000);
    gameLoop();
};
