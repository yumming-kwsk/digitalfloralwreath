let palette = [
  '#27D4FF',//水色(BG)
  '#FF00BB',//ピンク
  '#FF401F',//RED
  '#EAFF2B',//イエロー
  '#17D527',//グリーン
  '#006FFF'//BLUE
];

let angle = 0;
let mv;

let ringFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);  // 度数法を使う
  textFont("DotGothic16");
  textAlign(CENTER, CENTER);
}

function draw(){
  background(palette[0]);
  translate(width / 2, height / 3.2);

  mv = map(sin(angle*2),-1,1,-5,2);

  //line
  stroke(palette[2]);
  strokeWeight(10);
  line(0,0,180,height);
  line(0,0,-180,height);

  //name
  drawName(0,height / 2.4);


  //hanawa 
  noStroke();

  drawRing(0,0,20,70,75,3,drawCircle);
  drawRing(0,0,48,146,24,1,drawCircle);
  // drawRing(0,0,80,152,16,1,drawCircle);
  push();
  rotate(-angle*0.1);
  drawRing(0,0,40,138,24,3,drawCircle);
  pop();
  push();
  rotate(angle*0.3);
  drawRing(0,0,20,125,40,2,drawCircle);
  pop();
  push();
  rotate(-angle*0.3);
  drawRing(0,0,12,122,22,5,drawCircle);
  pop();
  drawRing(0,0,24,110,30,4,drawCircle);
 
  drawRing(0,0,18,86,18,3,drawFlower);
  drawRing(0,0,12,85,18,2,drawCircle);

  drawRing(0,0,6,85,43,1,drawCircle);
 
  drawRing(0,0,6,85,8,3,drawFlower);
  drawRing(0,0,24,60+mv,20,5,drawCircle);
  drawRing(0,0,18,52+mv,20,2,drawCircle);

  fill(palette[2]);
  circle(0,0,100);
  fill(palette[3]);
  circle(0,0,92);

  fill(palette[2]);
  textSize(64);
  text('祝', 0, 0);


  // 花火の表示・更新
  for (let i = ringFireworks.length - 1; i >= 0; i--) {
    ringFireworks[i].update();
    ringFireworks[i].display();
    if (ringFireworks[i].isDead()) {
      ringFireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  ringFireworks.push(new RingFirework(mouseX-width/2, mouseY-height/3.2));
}

function touchStarted() {
  ringFireworks.push(new RingFirework(mouseX-width/2, mouseY-height/3.2));
}



function drawRing(x, y, num, r, s, col, drawFunc) {
  push();
  translate(x, y);

  for (let i = 0; i < num; i++) {
    let angle = 360 * i / num;
    let px = cos(angle) * r;
    let py = sin(angle) * r;

    fill(palette[col]);
    drawFunc(px, py, s);  // ← ここで外から渡された関数を実行！
  }

  pop();
}

function drawCircle(x, y, s) {
  circle(x, y, s);
}


function drawFlower(x, y, s) {
  push();
  translate(x, y);
  rotate(angle);
  beginShape();
  for (let theta = 0; theta < 360; theta++) {
    let R = s * abs(sin(theta * 5)) + s / 2;
    let px = R * cos(theta);
    let py = R * sin(theta);
    curveVertex(px, py);
  }
  endShape(CLOSE);
  angle+=0.05;
  pop();
}

function drawName(x,y){
  push();
  translate(x,y);
  rectMode(CENTER);
  fill(palette[3]);
  stroke(palette[2]);
  rect(0,0,260,260);
  noStroke();
  textSize(42);
  fill(palette[5]);
  text('p5 js', 0, -80);
  drawFlower(2,-78,5);
  textSize(22);
  text('これからもよろしく\nおねがいします💓', 0, 80);
  fill(palette[1]);
  let interval = 60; // 60フレームで1秒（= 2秒ごとなら120に）
  let texts = ['一周年', 'ありがとう','感謝'];
  let sizes = [72,46,78];
  let index = floor(frameCount / interval) % texts.length;
  textSize(sizes[index]);
  text(texts[index], 0, -5);
  pop();
}

class RingFirework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.life = 30;
    this.num = 16;
    this.size = 14;
    this.color = int(random(1, palette.length)); // palette[1]〜[4]から選ぶ
  }

  update() {
    this.life--;
  }

  display() {
    let progress = 1 - this.life / 30; // 0〜1
    let baseRadius = progress * 80;


    push();
    translate(this.x, this.y);
    fill(palette[this.color]);
    noStroke();

    // 3重リングを描く
    for (let layer = 1; layer <= 3; layer++) {
      let r = baseRadius * (layer / 3); // 半径：1/3, 2/3, 1倍
      for (let i = 0; i < this.num; i++) {
        let angle = 360 * i / this.num;
        let px = cos(angle) * r;
        let py = sin(angle) * r;
        circle(px, py, this.size);
      }
    }

    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}
