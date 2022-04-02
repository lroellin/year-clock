import {
  eachMonthOfInterval,
  endOfYear,
  format,
  getDate,
  getDaysInMonth,
  getMonth,
  startOfYear,
} from "date-fns";

interface ClockInfo {
  totalDegree: number;
}

interface Elements {
  hand: HTMLElement;
}

function getElements(): Elements {
  return {
    hand: document.getElementById("hand"),
  };
}

function createInfo(): ClockInfo {
  const DEGREE_FULL = 360;

  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  const months = eachMonthOfInterval({ start: yearStart, end: yearEnd });
  // const allDays = dayMonths.reduce((a, b) => a + b, 0);

  const DEGREE_PER_MONTH = DEGREE_FULL / months.length;

  const currentMonthIndex = getMonth(now); // 0 = January
  const currentMonthStart = months[currentMonthIndex];
  const daysInCurrentMonth = getDaysInMonth(currentMonthStart);
  const currentDayInMonth = getDate(now);

  const currentMonthStartDegree = DEGREE_PER_MONTH * currentMonthIndex;
  const dayInCurrentMonthDegree =
    (DEGREE_PER_MONTH / daysInCurrentMonth) * currentDayInMonth;

  const totalDegree = currentMonthStartDegree + dayInCurrentMonthDegree;

  return {
    totalDegree,
  };
}

function update() {
  const elements = getElements();
  const info = createInfo();

  // minus: rotate counter-clockwise
  elements.hand.style.transform = `rotate(-${info.totalDegree}deg)`;
  console.log("Rotated to", info.totalDegree);
}

update();

setInterval(update, 1000);

console.log("Hello World");

const x = format(new Date(), "'Today is a' eeee");
//=> "Today is a Saturday"
console.log(x);
