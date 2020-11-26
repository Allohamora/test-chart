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

const max = Math.max(...values);
const min = Math.min(...values);

const availableHeight = height - 10;

const heightPercent = availableHeight / 100;
const widthPercent = width / 100;

const slice = width / values.length;

const getCoords = (value, i) => {
  const yPercent = value / max * 100;
  const x = (i + 1) * slice;

  const y = availableHeight - (heightPercent * yPercent);

  return [x, y];
};

chart.addEventListener('mousemove', (e) => {
  // const y = e.clientY - chart.offsetTop;
  const x = e.clientX - chart.offsetLeft;

  const index = Math.trunc(x / slice);

  const value = values[index];
  console.log(value);
});

ctx.beginPath();
ctx.moveTo(0, availableHeight);
ctx.lineTo(0, availableHeight);
values.forEach((value, i) => ctx.lineTo(...getCoords(value, i)));
ctx.fillStyle = 'rgba(82, 246, 79, 0.2)';
ctx.lineWidth = 5;
ctx.strokeStyle = '#52F64F';
ctx.stroke();
ctx.lineTo(getCoords(values[values.length -1], values.length - 1)[0], height);
ctx.lineTo(0, height);
ctx.fill();