let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Ensure time continues after pause
        intervalId = setInterval(updateTime, 10); // Update time every 10ms for precision
        isRunning = true;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(timeInMilliseconds) {
    const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(timeInMilliseconds / (1000 * 60 * 60));

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    laps = [];
    updateLaps();
}

function recordLap() {
    if (isRunning) {
        laps.push(formatTime(elapsedTime));
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapElement);
    });
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
