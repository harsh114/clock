const getDomElements = () => {
  const hourDisplay = document.getElementById("hour-display");
  const minuteDisplay = document.getElementById("minute-display");
  const dayDisplay = document.getElementById("day-display");
  const monthDisplay = document.getElementById("month-display");
  const dateDisplay = document.getElementById("date-display");
  const hourHand = document.getElementById("hour-hand");
  const minuteHand = document.getElementById("minute-hand");
  const secondHand = document.getElementById("second-hand");

  return {
    hourDisplay,
    minuteDisplay,
    dayDisplay,
    monthDisplay,
    dateDisplay,
    hourHand,
    minuteHand,
    secondHand
  };
};

let getCurrentTime = () => {
  let date = new Date();
  let time = date.getTime();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  return {
    date,
    time,
    // Adjust hours to 12 hour clock
    hours: hours > 12 ? hours - 12 : hours,
    minutes,
    seconds,
    milliseconds
  };
};

// Setters
const setTimeString = timeUnit => {
  // String representations of time numbers
  const timeStrings = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "fourty",
    50: "fifty",
    60: "sixty"
  };

  if (timeUnit < 20) {
    return `${timeStrings[timeUnit]}`;
  } else {
    let digitOne = timeStrings[Math.floor(timeUnit / 10) * 10];
    let digitTwo = timeStrings[timeUnit % 10] ? timeStrings[timeUnit % 10] : 0;
    if (digitTwo !== 0) {
      return `${digitOne} ${digitTwo}`;
    } else {
      return `${digitOne}`;
    }
  }
};

const setDateDisplay = currentTime => {
  let daySlice = currentTime.toDateString().slice(0, 3);
  let monthSlice = currentTime.toDateString().slice(4, 7);
  let dateSlice = currentTime.toDateString().slice(8, 10);

  return {
    daySlice,
    monthSlice,
    dateSlice
  };
};

// Rendering
let rotateHand = (timeUnit, factor, hand) => {
  // -90 degress accomodates for initial css layout position
  let position = timeUnit * factor - 90;
  hand.style.transform = `rotate(${position}deg`;
};

let run = () => {
  setInterval(() => {
    let domElements = getDomElements();
    let currentTime = getCurrentTime();
    // Hand values for animation
    // Seconds, minutes, hours reflect 100ms setInterval() iteration
    let seconds =
      (currentTime.seconds * 1000 + currentTime.milliseconds) / 1000;
    let minutes = (currentTime.minutes * 60 + seconds) / 60;
    let hours = (currentTime.hours * 60 + minutes) / 60;

    // Display strings for long-form readout
    let hourString = setTimeString(currentTime.hours);
    let minuteString = setTimeString(currentTime.minutes);
    let dayString = setDateDisplay(currentTime.date).daySlice;
    let monthString = setDateDisplay(currentTime.date).monthSlice;
    let dateString = setDateDisplay(currentTime.date).dateSlice;

    // Dom Elements
    domElements.hourDisplay.innerHTML = `${hourString}`;
    domElements.minuteDisplay.innerHTML = `${minuteString}`;
    domElements.dayDisplay.innerHTML = `${dayString} | `;
    domElements.monthDisplay.innerHTML = `${monthString} | `;
    domElements.dateDisplay.innerHTML = `${dateString}`;

    // Rotate Hands
    rotateHand(seconds, 6, domElements.secondHand);
    rotateHand(minutes, 6, domElements.minuteHand);
    rotateHand(hours, 30, domElements.hourHand);
  }, 100);
};

run();
