// 1. 갤러리타일 클릭시 갤러리카드 등장 + 갤러리페이지 블러처리
const imgTiles = document.querySelectorAll('.tile');
const imgCardScreen = document.querySelector('.gallery-card');
const imgBtn = document.querySelector('.img-btn');
const infoBtn = document.querySelector('.info-btn');
const card = document.querySelector('.card');
const escGuide = document.querySelector('.esc-guide');
const bgOveray = document.querySelector('.overay');

const CARD_SHOW = 'card-show';
const HIDDEN = 'hidden';
const CARD_FLIPE = 'card-flip';
const ESC_SHOW = 'esc-show';

for (let i = 0; i < imgTiles.length; i++) {
  let imgTile = imgTiles[i];

  imgTile.addEventListener('click', (e) => {
    card.classList.remove(CARD_FLIPE);
    imgCardScreen.classList.add(CARD_SHOW);
    bgOveray.classList.remove(HIDDEN);
    escGuide.classList.add(ESC_SHOW);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !bgOveray.classList.contains(HIDDEN)) {
    closeModal();
  }
});

bgOveray.addEventListener('click', (e) => {
  closeModal();
});

// 이미지 팝업 닫기
function closeModal() {
  imgCardScreen.classList.remove(CARD_SHOW);
  bgOveray.classList.add(HIDDEN);
}

imgBtn.addEventListener('click', (e) => {
  card.classList.add(CARD_FLIPE);
});
infoBtn.addEventListener('click', (e) => {
  card.classList.remove(CARD_FLIPE);
});
