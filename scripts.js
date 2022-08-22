import { setUpGround, updateGround } from './ground.js';
import { setUpDino, updateDino, getDinoRects, getDinoRect } from './dino.js';
import { setUpCactus, updateCactus, getCactusRects } from './cactus.js';

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector('[data-world]');
const scoreElem = document.querySelector('[data-score');
const startScreenElem = document.querySelector('[data-start-screen');

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });

setUpGround()

let lastTime;
let speedScale;
let score;
function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  updateCactus(delta);
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
};

function checkLose() {
  const dinoRect = getDinoRect();
  return getCactusRects().some(rect => isCollision(rect, dinoRect));
};

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    );
};

// ground speed
function updateSpeedScale(delta) {
 speedScale += SPEED_SCALE_INCREASE;
};

// add and update score
function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

// ground starts to move at press of any key
function handleStart() {
  lastTime = null;
  speedScale = 1;
  setUpGround();
  setUpDino();
  setUpCactus();
  startScreenElem.classList.add("hide"); // hides the "Press Any Key to Start display"
  window.requestAnimationFrame(update);
};

function handleLose() {

};

function setPixelToWorldScale() {
  let worldToPixelScale
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  };

  worldElem.getElementsByClassName.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.getElementsByClassName.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
};