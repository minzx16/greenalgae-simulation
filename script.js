const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const tempSlider = document.getElementById("temp");
const wasteSlider = document.getElementById("waste");

const tempValue = document.getElementById("tempValue");
const wasteValue = document.getElementById("wasteValue");

const nutrientBar = document.getElementById("nutrient");
const nutrientValue = document.getElementById("nutrientValue");

let algae = [];

// 녹조 생성 (고정 + 자연스러운 형태)
function createAlgae() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 3 + Math.random() * 4,
    g: 120 + Math.random() * 80,
    a: 0.4 + Math.random() * 0.3
  };
}

// 목표 녹조 수 계산
function calculateTarget(temp, nutrient) {
  let tempFactor = Math.max(0, (temp + 5) / 40); // -5 ~ 35
  return Math.floor(20 + tempFactor * nutrient * 4);
}

function update() {
  const temp = Number(tempSlider.value);
  const waste = Number(wasteSlider.value);

  tempValue.textContent = temp + "°C";
  wasteValue.textContent = waste + "%";

  // 폐수 → 영양염류 (직접 인과)
  nutrientBar.value = waste;
  nutrientValue.textContent = waste;

  const target = calculateTarget(temp, waste);

  // 증가: 빠르게
  while (algae.length < target) {
    algae.push(createAlgae());
  }

  // 감소: 매우 천천히 (자정 작용 표현)
  if (algae.length > target) {
    algae.splice(0, 1);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 강 배경
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "#7ec8e3");
  grad.addColorStop(1, "#1f5f8b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 녹조 (고정)
  algae.forEach(a => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, ${a.g}, 0, ${a.a})`;
    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
