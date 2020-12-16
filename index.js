/**
 * @type {HTMLCanvasElement}
 */
const chart = document.getElementById('chart');

const setCorrectSize = () => {
  chart.height = chart.clientHeight;
  chart.width = chart.clientWidth;
}

setCorrectSize();

const values = [10000, 100, 20, 5000];

const ctx = chart.getContext('2d');

const { height, width } = chart;

const maxValue = Math.max(...values);
const minValue = Math.min(...values);

const availableHeight = height;

const heightPercent = availableHeight / 100;
const widthPercent = width / 100;

const step = width / values.length;

let steps = [{ x: 0, y: 10 }];

const getBezierCurve = (value, i) => {
  const previous = steps[i];

  const yPercent = value / maxValue * 100;

  const x = previous.x + step;
  const y = availableHeight - (heightPercent * yPercent);

  const cp1x = previous.x + step / 2;
  const cp1y = previous.y;

  const cp2x = cp1x;
  const cp2y = y;

  steps.push({ x, y });

  return [cp1x, cp1y, cp2x, cp2y, x, y];
};

// chart.addEventListener('mousemove', (e) => {
//   // const y = e.clientY - chart.offsetTop;
//   const x = e.clientX - chart.offsetLeft;

//   const index = Math.trunc(x / step);

//   const value = values[index];
//   console.log(value);
// });

ctx.beginPath();
ctx.fillStyle = 'rgba(82, 246, 79, 0.2)';
ctx.lineWidth = 5;
ctx.strokeStyle = '#52F64F';
ctx.moveTo(0, 0);
// 50 0, 50 100, 100 100
// 1/2, previous, 1/2, full, full, full
values.forEach((value, i) => ctx.bezierCurveTo(...getBezierCurve(value, i)));
ctx.stroke();