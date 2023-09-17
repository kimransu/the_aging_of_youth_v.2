const workBtn = document.querySelector('.work-btn');
const aboutBtn = document.querySelector('.about-btn');
const galleryScreen = document.querySelector('#gallery');
const tilesScale = document.querySelectorAll('.tile');
const aboutScreen = document.querySelector('#about');

const SELECTED = 'selected';
const SCREEN_UP = 'screen-up';
const SCREEN_FADE_OUT = 'screen-fade-out';
const SCALE_ZERO = 'scale-zero';

workBtn.classList.add(SELECTED);
aboutScreen.classList.add(SCREEN_FADE_OUT);

workBtn.addEventListener('click', (e) => {
  workBtn.classList.add(SELECTED);
  aboutBtn.classList.remove(SELECTED);
  aboutScreen.classList.add(SCREEN_FADE_OUT);
  setTimeout(() => {
    galleryScreen.classList.remove(SCREEN_UP);
    setTimeout(() => {
      for (let i = 0; i < tilesScale.length; i++) {
        let tileScale = tilesScale[i];
        tileScale.classList.remove(SCALE_ZERO);
      }
    }, 200);
  }, 1000);
});

aboutBtn.addEventListener('click', (e) => {
  aboutBtn.classList.add(SELECTED);
  workBtn.classList.remove(SELECTED);
  aboutScreen.classList.remove(SCREEN_FADE_OUT);

  for (let i = 0; i < tilesScale.length; i++) {
    let tileScale = tilesScale[i];
    tileScale.classList.add(SCALE_ZERO);
  }
  setTimeout(() => {
    galleryScreen.classList.add(SCREEN_UP);
  }, 500);
});
