const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const shipImage = new Image();
shipImage.src = 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Shuttle.png';

const enemyImage = new Image();
enemyImage.src = 'https://pngimg.com/d/rockets_PNG13281.png';

const bulletImage = new Image();
bulletImage.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Voskhod_Rocket.png';

const explosionImage = new Image();
explosionImage.src = 'https://pngimg.com/d/explosion_PNG15382.png';  // Placeholder explosion image

let ship = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  lives: 3,
  score: 0
};

let bullets = [];
let enemies = [];
let explosions = [];
let enemySpawnRate = 20;
let frameCount = 0;
let difficultyIncrement = 0.1;

function drawShip() {
  ctx.drawImage(shipImage, ship.x, ship.y, ship.width, ship.height);
}

function moveShip() {
  ship.x += ship.dx;
  ship.y += ship.dy;

  if (ship.x < 0) ship.x = 0;
  if (ship.x + ship.width > canvas.width) ship.x = canvas.width - ship.width;
  if (ship.y < 0) ship.y = 0;
  if (ship.y + ship.height > canvas.height) ship.y = canvas.height - ship.height;
}

function drawBullets() {
  bullets.forEach(bullet => {
    ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function moveBullets() {
  bullets = bullets.filter(bullet => bullet.y > 0);
  bullets.forEach(bullet => bullet.y -= bullet.speed);
}

function spawnEnemy() {
  const x = Math.random() * (canvas.width - 50);
  const y = -50;
  const width = 50;
  const height = 50;
  const speed = 2;

  enemies.push({ x, y, width, height, speed });
  console.log('Enemy spawned:', { x, y, width, height, speed });  // Debug
}

function drawEnemies() {
  enemies.forEach(enemy => {
    // Draw smoke and fire effects (placeholder)
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    ctx.rotate(Math.PI);  // Rotate by 180 degrees
    ctx.drawImage(enemyImage, -enemy.width / 2, -enemy.height / 2, enemy.width, enemy.height);
    ctx.restore();
  });
}

function moveEnemies() {
  enemies.forEach(enemy => enemy.y += enemy.speed);
  enemies = enemies.filter(enemy => enemy.y < canvas.height);
}

function detectCollisions() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y) {
        explosions.push({ x: enemy.x, y: enemy.y, width: 50, height: 50, timer: 0 });
        bullets.splice(bulletIndex, 1);
        enemies.splice(enemyIndex, 1);
        ship.score += 10;
      }
    });
  });

  enemies.forEach((enemy, enemyIndex) => {
    if (enemy.x < ship.x + ship.width &&
        enemy.x + enemy.width > ship.x &&
        enemy.y < ship.y + ship.height &&
        enemy.y + enemy.height > ship.y) {
      explosions.push({ x: ship.x, y: ship.y, width: 50, height: 50, timer: 0 });
      enemies.splice(enemyIndex, 1);
      ship.lives -= 1;
      if (ship.lives <= 0) {
        alert('Game Over! Your Score: ' + ship.score);
        window.location.href = '../index.html';
      }
    }
  });
}

function drawExplosions() {
  explosions.forEach((explosion, index) => {
    ctx.drawImage(explosionImage, explosion.x, explosion.y, explosion.width, explosion.height);
    explosion.timer++;
    if (explosion.timer > 20) {
      explosions.splice(index, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + ship.score, 10, 20);
}

function drawLives() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Lives: ' + ship.lives, canvas.width - 100, 20);
}

function applyNoirFilter() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function update() {
  moveShip();
  moveBullets();
  moveEnemies();
  detectCollisions();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawShip();
  drawBullets();
  drawEnemies();
  drawExplosions();
  drawScore();
  drawLives();

  applyNoirFilter();

  frameCount++;
  if (frameCount % enemySpawnRate === 0) {
    spawnEnemy();
    enemySpawnRate = Math.max(20, enemySpawnRate - difficultyIncrement);  // Decrease the spawn rate to increase difficulty
    ship.speed = Math.max(2, ship.speed - difficultyIncrement / 10);       // Slow down ship
  }

  console.log('Frame count:', frameCount, 'Enemy spawn rate:', enemySpawnRate);  // Debug

  requestAnimationFrame(update);
}

function handleKeyDown(e) {
  if (e.key === 'ArrowLeft') ship.dx = -ship.speed;
  if (e.key === 'ArrowRight') ship.dx = ship.speed;
  if (e.key === 'ArrowUp') ship.dy = -ship.speed;
  if (e.key === 'ArrowDown') ship.dy = ship.speed;
  if (e.key === ' ') {
    bullets.push({
      x: ship.x + ship.width / 2 - 5,
      y: ship.y,
      width: 10,
      height: 20,
      speed: Math.max(3, 7 - difficultyIncrement)  // Slow down bullets over time
    });
  }
}

function handleKeyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') ship.dx = 0;
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') ship.dy = 0;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function showControls() {
  alert("Controls:\nArrow Keys: Move\nSpace: Shoot\n\nGood luck, pilot!");
}

function detectNonPC() {
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("This game is PC-only. Redirecting to homepage.");
    window.location.href = '../index.html';
  }
}

window.onload = () => {
  detectNonPC();
  showControls();
  update();
};
