const counter = document.querySelector('#value');
const loadingBox = document.querySelector('#loading');
const tiles = document.querySelectorAll('.tile');
const scrollWrap = document.querySelector('#scrollWrap');
const mainScreen = document.querySelector('#main');
const cardImage = document.querySelector('.card-img');
const infoImage = document.querySelector('.info-img');
const tag = document.querySelector('.tag');
const prompt = document.querySelector('.prompt');
const goLeftBtn = document.querySelector('.go-left');
const goRightBtn = document.querySelector('.go-right');

const AGE_FADE_OUT_CLASS = 'age-fade-out';
const MAIN_SHOW = 'main-show';
const SCROLL_WRAP_SHOW = 'scroll-wrap-show';
const DISPLAY_NONE = 'd-none';

const speed = 100;

// 이미지 이름 뒤에 붙은 숫자를 저장하는 배열
const imageIdxList = [];

const animate = () => {
  const value = +counter.getAttribute('full-age');
  const data = +counter.innerText;

  const time = value / speed;
  if (data < value) {
    counter.innerText = Math.ceil(data + time);
    setTimeout(animate, 10);
  } else {
    counter.innerText = value;
    loadingBox.classList.add(AGE_FADE_OUT_CLASS);

    setTimeout(() => {
      scrollWrap.classList.add(SCROLL_WRAP_SHOW);
      mainScreen.classList.add(MAIN_SHOW);
      loadingBox.classList.add(DISPLAY_NONE);

      initHackerText();
    }, 2000);
  }
};

// 이미지 초기화
function initImages() {
  getRandomNumbers(24, 1, 24);
  setMainImages();
  setImages();
  animate();
}

// 1 ~ 20까지의 숫자 중 무작위로 10개 조회(중복 없음)
function getRandomNumbers(count, min, max) {
  const numbers = []; // min부터 max까지의 숫자를 순차적으로 저장
  for (let i = min; i <= max; i++) {
    numbers.push(i); // 이 곳에서 숫자를 저장
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const getNumber = numbers.splice(randomIndex, 1);
    imageIdxList.push(getNumber[0]);
  }
}

function setMainImages() {
  let imageNumber =
    imageIdxList[Math.floor(Math.random() * imageIdxList.length)];
  if (imageNumber < 10) {
    imageNumber = '0' + imageNumber;
  }
  const imagePath = './images/main' + imageNumber + '.jpeg';
  mainScreen.style.backgroundImage = `url('${imagePath}')`;
}

setInterval(setMainImages, 6000);

// 이미지를 tiles에 적용
function setImages() {
  for (let i = 0; i < imageIdxList.length; i++) {
    let imageNumber = imageIdxList[i]; // nowImage
    if (imageNumber < 10) {
      imageNumber = '0' + imageNumber;
    }
    const imagePath = './images/img' + imageNumber + '.jpg';
    const tile = tiles[i];
    tile.style.backgroundImage = `url('${imagePath}')`;
    tile.style.backgroundSize = 'contain';
    tile.style.backgroundRepeat = 'no-repeat';

    const imgInfo = imageInfo[imageNumber];
    // tile.setAttribute('title', imgInfo.title);

    //타일이미지 클릭 시 카드이미지 팝업
    tile.addEventListener('click', (e) => {
      cardInfo(imageNumber);
    });
  }
}

// 이미지 번호 가져오기 : 이미지 번호가 10보다 작으면 숫자 앞에 0을 붙여주기
function getImageNumber(imageNumber) {
  if (imageNumber < 10) {
    imageNumber = '0' + imageNumber;
  }
  return imageNumber;
}

// 이미지 번호에 해당하는 이미지 정보를 가져오기
function cardInfo(imageNumber) {
  const imgInfo = imageInfo[imageNumber];
  const cardImagePath = './images/img' + imageNumber + '.jpg';
  cardImage.style.backgroundImage = `url('${cardImagePath}')`;
  infoImage.style.backgroundImage = `url('${cardImagePath}')`;
  tag.innerText = imgInfo.title;
  prompt.innerText = imgInfo.prompt;

  // 현재 이미지 번호(imageNumber)를 기준으로 왼쪽, 오른쪽 화살표에 이전, 이후 이미지 정보 넣기
  let leftImageNumber = 0;
  let rightImageNumber = 0;
  for (let i = 0; i < imageIdxList.length; i++) {
    if (getImageNumber(imageIdxList[i]) == imageNumber) {
      if (i == 0) {
        let beforeImgIdx = imageIdxList.length - 1;
        leftImageNumber = imageIdxList[beforeImgIdx];
      } else {
        let beforeImgIdx = i - 1;
        leftImageNumber = imageIdxList[beforeImgIdx];
      }

      if (i == imageIdxList.length - 1) {
        afterImgIdx = 0;
        rightImageNumber = imageIdxList[afterImgIdx];
      } else {
        afterImgIdx = i + 1;
        rightImageNumber = imageIdxList[afterImgIdx];
      }
    }
  }
  // 왼쪽, 오른쪽 화살표에 속성 추가
  goLeftBtn.setAttribute('data-left-number', getImageNumber(leftImageNumber));
  goRightBtn.setAttribute(
    'data-right-number',
    getImageNumber(rightImageNumber)
  );
}

// 왼쪽 화살표 클릭 이벤트
function goLeft(leftTag) {
  const leftImageNumber = leftTag.dataset.leftNumber;
  cardInfo(leftImageNumber);
}

// 오른쪽 화살표 클릭 이벤트
function goRight(rightTag) {
  const rightImageNumber = rightTag.dataset.rightNumber;
  cardInfo(rightImageNumber);
}

// 이미지 초기화 시작
initImages();
