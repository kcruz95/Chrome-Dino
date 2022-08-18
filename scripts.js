import { setUpGround, updateGround } from './ground.js';
import { setUpDino, updateDino } from './dino.js';

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

  lastTime = time;
  window.requestAnimationFrame(update);
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
  startScreenElem.classList.add("hide"); // hides the "Press Any Key to Start display"
  window.requestAnimationFrame(update);
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