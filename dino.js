import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCustomsProperty.js";

const dinoElem = document.querySelector("[data-dino");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2; //makes the dino "move"
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function setUpDino() {
  isJumping = false; // if the dino is not jumping (false), the img animates
  dinoFrame = 0
  currentFrameTime = 0;
  yVelocity = 0;
  setCustomProperty(dinoElem, "--bottom", 0);
  // allows dino to jump with the press of the space button
  // removeEventListener comes first to reset upon losing
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
};

export function updateDino(delta, speedScale) {
  handleRun(delta, speedScale);
  handleJump(delta, speedScale);
};

function handleRun(delta, speedScale) {
  if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return
  };

  // animates the dino imgs
  if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
  };
  currentFrameTime += delta * speedScale;
};

function handleJump(delta, speedScale) {
  if (!isJumping)
  return;

  incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

  if (getCustomProperty(dinoElem, "--bottom") <- 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false
  };

  yVelocity -= GRAVITY * delta;
};

function onJump(e) {
  if (e.code !== "Space" || isJumping)
  return;

  yVelocity = JUMP_SPEED;
  isJumping = true;
}