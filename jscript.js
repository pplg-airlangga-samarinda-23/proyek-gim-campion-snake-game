const GAME_PIXEL_COUNT = 40;
const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let totalFoodAte = 0;
let totalDistanceTravelled = 0;

const gameContainer = document.getElementById("gameContainer");

// Membuat papan permainan
const createGameBoardPixels = () => {
  let gamePixelDivs = '';
  for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
    gamePixelDivs += `<div class="gameBoardPixel" id="pixel${i}"></div>`;
  }
  gameContainer.innerHTML = gamePixelDivs;
};

const gameBoardPixels = document.getElementsByClassName("gameBoardPixel");

let currentFoodPosition = 0;
const createFood = () => {
  gameBoardPixels[currentFoodPosition].classList.remove("food");
  currentFoodPosition = Math.floor(Math.random() * SQUARE_OF_GAME_PIXEL_COUNT);
  gameBoardPixels[currentFoodPosition].classList.add("food");
};

// Arah gerakan ular
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let snakeCurrentDirection = RIGHT_DIR;

const changeDirection = (newDirectionCode) => {
  if (newDirectionCode === LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode === UP_DIR && snakeCurrentDirection !== DOWN_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode === RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR) {
    snakeCurrentDirection = newDirectionCode;
  } else if (newDirectionCode === DOWN_DIR && snakeCurrentDirection !== UP_DIR) {
    snakeCurrentDirection = newDirectionCode;
  }
};

let currentSnakeHeadPosition = SQUARE_OF_GAME_PIXEL_COUNT / 2;
let snakeLength = 1000;

const moveSnake = () => {
  switch (snakeCurrentDirection) {
    case LEFT_DIR:
      --currentSnakeHeadPosition;
      if (currentSnakeHeadPosition % GAME_PIXEL_COUNT === GAME_PIXEL_COUNT - 1 || currentSnakeHeadPosition < 0) {
        currentSnakeHeadPosition += GAME_PIXEL_COUNT;
      }
      break;
    case UP_DIR:
      currentSnakeHeadPosition -= GAME_PIXEL_COUNT;
      if (currentSnakeHeadPosition < 0) {
        currentSnakeHeadPosition += SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
    case RIGHT_DIR:
      ++currentSnakeHeadPosition;
      if (currentSnakeHeadPosition % GAME_PIXEL_COUNT === 0) {
        currentSnakeHeadPosition -= GAME_PIXEL_COUNT;
      }
      break;
    case DOWN_DIR:
      currentSnakeHeadPosition += GAME_PIXEL_COUNT;
      if (currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1) {
        currentSnakeHeadPosition -= SQUARE_OF_GAME_PIXEL_COUNT;
      }
      break;
  }

  let nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

  // Jika ular menabrak tubuhnya sendiri (kalah)
  if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
    clearInterval(moveSnakeInterval); // Menghentikan permainan
    alert(`Kamu Kalah! Kamu berhasil memakan ${totalFoodAte} makanan dan menempuh ${totalDistanceTravelled} blok.`);
    window.location.href = 'menu.html'; // Redirect ke menu
        return clearInterval(moveSnakeInterval);
  }

  nextSnakeHeadPixel.classList.add("snakeBodyPixel");

  setTimeout(() => {
    nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
  }, snakeLength);

  totalDistanceTravelled++;
  document.getElementById("blocksTravelled").innerHTML = totalDistanceTravelled;

  if (currentSnakeHeadPosition === currentFoodPosition) {
    totalFoodAte++;
    document.getElementById("pointsEarned").innerHTML = totalFoodAte;

    // Jika makanan yang dimakan mencapai 10
    if (totalFoodAte === 100) {
      clearInterval(moveSnakeInterval); // Menghentikan permainan
      alert(`Kamu Berhasil Memakan 100 Makanan! Kamu menempuh ${totalDistanceTravelled} blok.`);
      window.location.replace='menu.html'; // Memulai ulang permainan
      return;
    }

    snakeLength += 100;
    createFood();
  }
};

// Inisialisasi permainan
createGameBoardPixels();
createFood();

let moveSnakeInterval = setInterval(moveSnake, 80);

addEventListener("keydown", (e) => changeDirection(e.keyCode));

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

leftButton.onclick = () => changeDirection(LEFT_DIR);
rightButton.onclick = () => changeDirection(RIGHT_DIR);
upButton.onclick = () => changeDirection(UP_DIR);
downButton.onclick = () => changeDirection(DOWN_DIR);
