// Check if there's a previous start time stored in localStorage
let storedStartTime = localStorage.getItem('timerStartTime');
let startTime;
let currentTime;

if (storedStartTime) {
  startTime = parseInt(storedStartTime, 10);
} else {
  restartTime();
}

if (document.getElementById('finalTimer') !== null) {
  if (localStorage.getItem('timerFinish') === null) {
    localStorage.setItem('timerFinish', Date.now() + '');
  }
  currentTime = localStorage.getItem('timerFinish');
  const digits = timeToDigits(getTime());
  document.getElementById('finalTimer').innerHTML = `
        <div class="fs-3 bg-black text-white rounded-1 fw-bold p-1 me-1">${digits[0]}</div>
        <div class="fs-3 bg-black text-white rounded-1 fw-bold p-1 me-1">${digits[1]}</div>
        <div class="fs-3 fw-bold me-1">:</div>
        <div class="fs-3 bg-black text-white rounded-1 fw-bold p-1 me-1">${digits[2]}</div>
        <div class="fs-3 bg-black text-white rounded-1 fw-bold p-1 me-1">${digits[3]}</div>`;
}

if (localStorage.getItem('timerFinish') === null) {
  langManager.subscribe(
    () => {
      updateTimer();
    });
  const interval = setInterval(updateTimer, 1000);
}

// Update the timer every second
function updateTimer() {
  currentTime = Date.now();
  const digits = timeToDigits(getTime());
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.innerHTML = `<div class="fs-6 fw-bold text-body-secondary me-2">${i18next.t("common.timer.title")}</div>
        <div class="fs-3 bg-white rounded-1 fw-bold p-1 me-1">${digits[0]}</div>
        <div class="fs-3 bg-white rounded-1 fw-bold p-1 me-1">${digits[1]}</div>
        <div class="fs-3 text-white fw-bold me-1">:</div>
        <div class="fs-3 bg-white rounded-1 fw-bold p-1 me-1">${digits[2]}</div>
        <div class="fs-3 bg-white rounded-1 fw-bold p-1 me-1">${digits[3]}</div>`;
  }
}

function timeToDigits(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);

  const remainingSeconds = totalSeconds % 60;

  const tensOfMinutes = Math.floor(totalMinutes / 10);
  const unitsOfMinutes = totalMinutes % 10;

  const tensOfSeconds = Math.floor(remainingSeconds / 10);
  const unitsOfSeconds = remainingSeconds % 10;

  return [tensOfMinutes, unitsOfMinutes, tensOfSeconds, unitsOfSeconds];
}

function getFormattedTime(timeSpent) {
  const time = timeToDigits(timeSpent || getTime());
  return (time[0] || '0') + time[1] + ':' + time[2] + time[3]
}

function getTime() {
  return currentTime - startTime;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function deleteTime() {
  localStorage.removeItem('timerStartTime');
  restartTime();
}

function restartTime() {
  // If no stored start time, set a new one
  startTime = Date.now();
  localStorage.setItem('timerStartTime', startTime);
  if (localStorage.getItem('timerFinish') !== null) {
    localStorage.removeItem('timerFinish');
    updateTimer();
    setInterval(updateTimer, 1000);
  }
}

function addTime(second) {
  startTime = startTime - (second * 1000);
  localStorage.setItem('timerStartTime', startTime);
}
