const letters = '젊음의늙음';
const mainTitle = document.querySelector('#mainTitle');

let interval = null;

function initHackerText() {
  execHakerText();

  setInterval(() => {
    execHakerText();
  }, 5000);
}

function execHakerText() {
  let interation = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    mainTitle.innerText = mainTitle.innerText
      .split('')
      .map((letter, index) => {
        if (letter === ' ') {
          return mainTitle.dataset.value[index];
        }
        if (index < interation) {
          return mainTitle.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 5)];
      })
      .join('');

    if (interation >= mainTitle.dataset.value.length) {
      clearInterval(interval);
    }

    interation += 1 / 3;
  }, 50);
}
