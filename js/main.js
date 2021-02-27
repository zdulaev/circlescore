let ex = document.querySelector('#game');
let ctx = game.getContext('2d');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Circle {
  constructor(x, y, r, color) {
    this.cx = x;
    this.cy = y;
    this.r = r;
    this.color = color;
  }
  move(x, y) {
    const MAX_X = ctx.canvas.width - this.r;
    const MAX_Y = ctx.canvas.height - this.r;
    
    this.cx = Math.min(MAX_X, Math.max(this.r, this.cx + x));
    this.cy = Math.min(MAX_Y, Math.max(this.r, this.cy + y));
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
  
  static intersecting(a, b) {
    let distance = ((a.cx - b.cx) ** 2 + (a.cy - b.cy) ** 2) ** 0.5;
    
    return distance < a.r + b.r;
  }
}

const R = 10;
let score = 0;

let player = new Circle(20, 20, R, "#090");

let targets = [];

for (let i = 0; i < 50; i++) {
  let x = randInt(R, ctx.canvas.width - R);
  let y = randInt(R, ctx.canvas.height - R);
  targets.push(new Circle(x, y, R, "#ee0"));
}


// Функция перерисовки canvas
redraw();
function redraw() {
  // Очистить весь канвас
  ctx.clearRect(0, 0, 800, 400);
  // рисуем игрока
  player.draw(ctx);
  
  for (let i = targets.length - 1; i >= 0; i--) {
    if (!Circle.intersecting(player, targets[i])) {
      targets[i].draw(ctx); 
      continue;
    }
    
    targets.splice(i, 1);
    first("#score").textContent = ++score;
  }
}



// ------Обработка нажатий на кнопки-------
// Движение вверх
first('#BtnMoveUp').addEventListener('click', () => move(0, -1));
first('#BtnMoveDown').addEventListener('click', () => move(0, 1));
first('#BtnMoveLeft').addEventListener('click', () => move(-1, 0));
first('#BtnMoveRight').addEventListener('click', () => move(1, 0));

function move(dirX, dirY) {
  player.move(dirX * R, dirY * R);
  redraw();
}

function first(selector) {
  return document.querySelector(selector);
}