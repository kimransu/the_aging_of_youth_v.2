const thumbImgBoxes = document.querySelectorAll('.thumb-img-box');
const thumbImgs = document.querySelectorAll('.thumb-img');
const workDetailScreen = document.querySelector('.work-detail-page');
const closeBtn = document.querySelector('#closeBtn');
const workBg = document.querySelector('#work');
const workImage = document.querySelector('#workImage');
const workTitle = document.querySelector('#workTitle');
const workPrompt = document.querySelector('#workPrompt');

const MOUSE_OVER = 'mouse-over';
const SCREEN_SHOW = 'screen-show';
const SCREEN_BIG = 'screen-big';

// 최초 실행 시 동작하는 함수
initThumbImageBox();

for (let i = 0; i < thumbImgBoxes.length; i++) {
  let thumbImgBox = thumbImgBoxes[i];
  let thumbImg = thumbImgs[i];

  thumbImgBox.addEventListener('mouseover', (e) => {
    // 모든 이미지에 mouse-over 클래스 제거
    removeAllMouseOver();

    // 현재 마우스로 선택된 이미지에게 mouse-over 클래스 주기
    thumbImgBox.classList.add(MOUSE_OVER);
    thumbImg.classList.add(MOUSE_OVER);

    let workBgUrl = thumbImg.src;

    //::before를 입력할 style element 생성
    let beforeStyle = document.createElement('style');

    //원하는 before 스타일작성
    beforeStyle.textContent = `#work::before {
      background-image: url('${workBgUrl}');
    }`;

    //<head> tag에 입력
    document.head.appendChild(beforeStyle);
  });

  // 썸네일이미지 클릭 시 디테일페이지 나타남
  thumbImgBox.addEventListener('click', (e) => {
    const imgSeq = thumbImgBox.dataset.imgSeq;
    setImageInfo(imgSeq);
    workDetailScreen.classList.add(SCREEN_SHOW);

    setTimeout(() => {
      workDetailScreen.classList.add(SCREEN_BIG);
    }, 100);
  });
}

function setImageInfo(imgSeq) {
  const imgInfo = imageInfo[imgSeq];
  workImage.src = imgInfo.src;
  workTitle.innerText = imgInfo.title;
  workPrompt.innerText = imgInfo.prompt;
}

// 최초 실행 시 첫 번째 이미지에 mouse-over 효과 주기
function initThumbImageBox() {
  thumbImgBoxes[0].classList.add(MOUSE_OVER);
  thumbImgs[0].classList.add(MOUSE_OVER);
  let workBgUrl = thumbImgs[0].src;

  //::before를 입력할 style element 생성
  let beforeStyle = document.createElement('style');

  //원하는 before 스타일작성
  beforeStyle.textContent = `#work::before {
    background-image: url('${workBgUrl}');
  }`;

  //<head> tag에 입력
  document.head.appendChild(beforeStyle);
}

// 모든 이미지에서 mouse-over 클래스 제거하기
function removeAllMouseOver() {
  thumbImgBoxes.forEach((thumbImgBox) => {
    thumbImgBox.classList.remove(MOUSE_OVER);
  });

  thumbImgs.forEach((thumbImg) => {
    thumbImg.classList.remove(MOUSE_OVER);
  });
}

// 닫기버튼 클릭 시 디테일페이지 사라짐
closeBtn.addEventListener('click', (e) => {
  workDetailScreen.classList.remove(SCREEN_BIG);
  setTimeout(() => {
    workDetailScreen.classList.remove(SCREEN_SHOW);
  }, 800);
});
