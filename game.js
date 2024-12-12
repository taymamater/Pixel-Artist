let selectedColor = "#000000";
let isPainting = false;
let eraserMode = false;
const gameBoard = document.getElementById("game-board");
const colorPicker = document.getElementById("color-picker");
const eraserButton = document.getElementById("eraser");
const clearBoardButton = document.getElementById("clear-board");
const downloadButton = document.getElementById("download");

function initGame(gridSize) {
  createBoard(gridSize);

  if (clearBoardButton) {
    clearBoardButton.addEventListener("click", clearBoard);
  }

  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      selectedColor = e.target.value;
      eraserMode = false;
      if (eraserButton) eraserButton.classList.remove("active");
    });
  }

  if (eraserButton) {
    eraserButton.addEventListener("click", () => {
      eraserMode = !eraserMode;
      eraserButton.classList.toggle("active");
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", () => downloadArt(gridSize));
  }
}

function createBoard(gridSize) {
  gameBoard.innerHTML = ""; // Clear existing board

  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  const cellSize = Math.floor(400 / gridSize) - 2; // Cell size with 2px gap

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;

    cell.addEventListener("mousedown", () => {
      isPainting = true;
      fillCell(cell);
    });
    cell.addEventListener("mouseover", () => {
      if (isPainting) fillCell(cell);
    });
    gameBoard.appendChild(cell);
  }

  document.addEventListener("mouseup", () => {
    isPainting = false;
  });
}

// Clear all cells on the board
function clearBoard() {
  const cells = document.querySelectorAll("#game-board .cell");
  cells.forEach(cell => cell.style.backgroundColor = "white");
}

// Fill a cell with the selected color or erase
function fillCell(cell) {
  cell.style.backgroundColor = eraserMode ? "white" : selectedColor;
}

// Download the pixel art as a PNG image
function downloadArt(gridSize) {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  const cellSize = 500 / gridSize;

  const cells = document.querySelectorAll("#game-board .cell");
  cells.forEach((cell, index) => {
    const color = window.getComputedStyle(cell).backgroundColor;
    const x = (index % gridSize) * cellSize;
    const y = Math.floor(index / gridSize) * cellSize;

    if (color === "rgb(255, 255, 255)" || color === "rgba(0, 0, 0, 0)") {
      ctx.clearRect(x, y, cellSize, cellSize);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  });

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "pixel-art.png";
  link.click();
}

// Reference Image Rotation
const referenceImages = {
  easy: ["images/e1.png", "images/e2.png", "images/e3.png", "images/e4.png", "images/e5.png"],
  medium: ["images/m1.png", "images/m2.png", "images/m3.png", "images/m4.png", "images/m5.png"],
  hard: ["images/h1.png", "images/h2.png", "images/h3.png", "images/h4.png", "images/h5.png"],
};

const currentIndex = { easy: 0, medium: 0, hard: 0 };

document.addEventListener("DOMContentLoaded", () => {
  const rotateEasy = document.getElementById("rotate-image-easy");
  const rotateMedium = document.getElementById("rotate-image-medium");
  const rotateHard = document.getElementById("rotate-image-hard");

  if (rotateEasy) {
    rotateEasy.addEventListener("click", () => {
      const img = document.getElementById("reference-image");
      currentIndex.easy = (currentIndex.easy + 1) % referenceImages.easy.length;
      img.src = referenceImages.easy[currentIndex.easy];
    });
  }

  if (rotateMedium) {
    rotateMedium.addEventListener("click", () => {
      const img = document.getElementById("reference-image");
      currentIndex.medium =
        (currentIndex.medium + 1) % referenceImages.medium.length;
      img.src = referenceImages.medium[currentIndex.medium];
    });
  }

  if (rotateHard) {
    rotateHard.addEventListener("click", () => {
      const img = document.getElementById("reference-image");
      currentIndex.hard =
        (currentIndex.hard + 1) % referenceImages.hard.length;
      img.src = referenceImages.hard[currentIndex.hard];
    });
  }
});
document.getElementById('switch').addEventListener('change', function () {
    const root = document.documentElement;

    if (this.checked) {
        root.style.setProperty('--stripe-color', '#ff6347'); // Example: Tomato
        root.style.setProperty('--bg', 'repeating-linear-gradient(100deg, #ff6347 0%, #ff4500 25%, #ff6347 50%, #ff4500 75%)');
    } else {
        root.style.setProperty('--stripe-color', '#60a5fa'); // Original blue
        root.style.setProperty('--bg', 'repeating-linear-gradient(100deg, #60a5fa 0%, #e879f9 25%, #5eead4 50%, #60a5fa 75%)');
    }
});


