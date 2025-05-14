//-------------------------------------------
const turnRatio = 0.1; //how much the lines turns
const black = "0, 0, 0"; // Black line color
const red = "288, 33, 39"; // Red line color
const green = "90, 166, 39"; // Green line color
const speed = 20; //the line moving speed
const lineWidth = 1;
const backgroundColor = "rgb(0,0,0,0)";
const line_count = 10;
//-------------------------------------------

const canvas = document.getElementById("animated-grid");

const ctx = canvas.getContext("2d");
const rnd = Math.random;

const onResize = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
};
onResize();
addEventListener("resize", onResize);

// Lines
const pick_color = () => {
  const r = rnd();
  return r < 0.7 ? black : r < 0.9 ? red : green;
};

const starting_pos = (line) => {
  const r = rnd();
  if (r < 0.25) {
    // Left
    line.x = 0;
    line.y = rnd() * canvas.height;
    line.dx = 1;
    line.dy = 0;
  } else if (r < 0.5) {
    // Right
    line.x = canvas.width;
    line.y = rnd() * canvas.height;
    line.dx = -1;
    line.dy = 0;
  } else if (r < 0.75) {
    // Top
    line.x = rnd() * canvas.width;
    line.y = 0;
    line.dx = 0;
    line.dy = 1;
  } else {
    // Bottom
    line.x = rnd() * canvas.width;
    line.y = canvas.height;
    line.dx = 0;
    line.dy = -1;
  }
};

const add_waypoint = (line) => {
  line.waypoints.push({ x: line.x, y: line.y });
};

const init_line = () => {
  const line = {};

  line.color = pick_color();
  line.opacity = rnd();
  line.fadeout = false;

  starting_pos(line);
  line.waypoints = [];
  add_waypoint(line);

  return line;
};

const get_stroke_style = (line) => {
  return `rgba(${line.color}, ${line.opacity})`;
};

const is_out_of_screen = (line) => {
  return (
    line.x > canvas.width || line.y > canvas.height || line.x < 0 || line.y < 0
  );
};

const turn_line = (line) => {
  add_waypoint(line);
  if (line.dx != 0) {
    line.dx = 0;
    line.dy = rnd() > 0.5 ? 1 : -1;
  } else {
    line.dy = 0;
    line.dx = rnd() > 0.5 ? 1 : -1;
  }
};

const draw_line = (line) => {
  if (line.fadeout) {
    if (line.opacity < 0.1) {
      line = init_line();
    } else {
      line.opacity *= 0.9;
    }
  } else if (is_out_of_screen(line)) {
    line.fadeout = true;
  } else {
    line.x += line.dx * speed;
    line.y += line.dy * speed;

    if (rnd() < 0.1 / line.waypoints.length) turn_line(line);
  }

  ctx.strokeStyle = get_stroke_style(line);
  ctx.lineWidth = line.width;
  ctx.beginPath();
  ctx.moveTo(line.x, line.y);
  //let remainL = line.length;
  //let continuous = true, lastLen=0;
  for (let i = line.waypoints.length - 1; i >= 0; i--) {
    const p = line.waypoints[i];
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.closePath();
};

const init = () => {
  let lines = [];

  for (let i = 0; i < line_count; i++) {
    lines.push(init_line());
  }

  const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach((line) => draw_line(line));
    lines = lines.filter((line) => !line.fadeout || line.opacity > 0.1);
    for (let i = lines.length; i < line_count; i++) {
      lines.push(init_line());
    }
    requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};

window.onload = init;
