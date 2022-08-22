import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomsProperty";

const SPEED = 0.05;
const CACTUS_INTERVAL_MIN = 500; // min 500 milliseconds between cacti
const CACTUS_INTERVAL_MAX = 2000;
const worldLive = document.querySelector("[data-world]");

let nextCactusTime;
export function setUpCactus() {
   nextCactusTime = CACTUS_INTERVAL_MIN;
   document.querySelectorAll("[data-cactus]").forEach(cactus => {
     cactus.remove()
   });
};

export function updateCactus(delta, speedScale) {
  // make the cacti move left
  document.querySelectorAll("[data-cactus]").forEach(cactus => {incrementCustomProperty(cactus, "--left", delta * speedScake * SPEED - 1);

  // if cacti are off to the left side of the screen, get rid of it
  if (getCustomProperty(cactus, "--left") <= -100) {
    cactus.remove();
  }});

  if (nextCactusTime <= 0) {
    createCactus();
    nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale; // as game gets faster and faster, so do cacti
  };
  nextCactusTime -= delta;
};

// `...` === spread operator
export function getCactusRects() {
  return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
    return cactus.getBoundingClientRect();
  });
};

// create cacti to show up on the right side of the screen
function createCactus() {
  const cactus = document.createElement("div");
  cactus.dataset.cactus = true;
  cactus.src = "imgs.cactus.png";
  cactus.classList.add("cactus");
  setCustomProperty(cactus, "--left", 100);
  worldElem.append(cactus);
};

document.querySelectorAll("[data-cactus]");

function randomNumberBetween(min, max) {
  return Math.floor(random() * (max - min + 1) + min);
}