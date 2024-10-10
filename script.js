//Zowie!
const canvas = document.getElementById('bubbles');
const gl = canvas.getContext('2d');

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

let bubbles = [];
for (let bubbleIndex = 0; bubbleIndex < 128; bubbleIndex++) {
  bubbles.push([
    bubbleIndex / 128,
    randomRange(0, 1),
    randomRange(0.05, 0.1),
    randomRange(0.00125, 0.0025),
    0,
  ]);
}

let mouseX = 0.5;
let mouseY = 0.5;

canvas.onmousemove = event => {
  mouseX = event.clientX / window.innerWidth;
  mouseY = event.clientY / window.innerHeight;
};

setInterval(() => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const lesser = width < height ? width : height;

  canvas.width = width;
  canvas.height = height;

  gl.fillStyle = '#291a10';
  gl.fillRect(0, 0, width, height);
  //gl.fillStyle = "#ffffff";
  bubbles.forEach(bubble => {
    if (bubble[1] > 1 + bubble[2]) {
      bubble[2] = randomRange(0.05, 0.1);
      bubble[3] = randomRange(0.00125, 0.0025);
      bubble[0] = randomRange(0, 1);
      bubble[4] = 0;
      bubble[1] = -bubble[2];
    }

    if (Math.abs(mouseY - bubble[1]) < bubble[2] * 1.1) {
      if (Math.abs(mouseX - bubble[0]) < bubble[2] * 1.1) {
        bubble[4] -= (mouseX - bubble[0]) / 100;
      }
    }

    const offset = (lesser * bubble[2]) / 2;
    bubble[0] += bubble[4];
    bubble[4] *= 0.975;
    bubble[1] += bubble[3];

    //Draw the bubble with some detail
    gl.fillStyle = '#302117';
    gl.beginPath();
    gl.arc(bubble[0] * width, bubble[1] * height, offset * 2, 0, 2 * Math.PI);
    gl.fill();
  });
}, 16);
