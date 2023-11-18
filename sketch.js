const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';


const sizeSlider = document.querySelector("#size-slider-el");
const sliderValue = document.querySelector("#size-slider-val");
const grid = document.querySelector("#grid");
const colorSelector = document.querySelector("#color-selector");
const colorMode = document.querySelector("#color-mode-el");
const rainbowMode = document.querySelector("#rainbow-mode-el");
const eraserBtn = document.querySelector("#eraser-el");
const clearBtn = document.querySelector("#clear-el");

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}   

/* colorSelector.oninput = () => setCurrentColor(); */
colorMode.onclick = () => setCurrentMode('color')
rainbowMode.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()

sliderValue.textContent = sizeSlider.value + " x " + sizeSlider.value;

sizeSlider.addEventListener("input", (showSize) => {
    sliderValue.textContent = sizeSlider.value + " x " + sizeSlider.value;
    updateSize(sizeSlider.value);
})

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function updateSize(value) {
    setCurrentSize(value);
    reloadGrid();
}

function reloadGrid() {
        clearGrid()
        setUpGrid(currentSize)
    }

function clearGrid() {
    grid.innerHTML = '';
  }

function setUpGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i=0; i < size*size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("grid-element");
        grid.addEventListener("mouseover", changeColor);
        grid.addEventListener("mousedown", changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && mouseDown) return;
    else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    }
    else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }
    else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowMode.classList.remove('active');
    }
    else if (currentMode === 'color') {
        colorMode.classList.remove('active')
    } 
    else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowMode.classList.add('active')
    }
    else if (newMode === 'color') {
        colorMode.classList.add('active');
    }
    else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    setUpGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }
