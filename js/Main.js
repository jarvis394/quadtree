let qt, b

function setup() {
  createCanvas(400, 400)
  
  b = new Rect(200, 200, 200, 200)
  qt = new Quadtree(b, 4)
  for (let i = 0; i < 500; i++) {
    qt.insert(new Point(random(400), random(400)))
  }
}

function draw() {
  background(0)
  
  document.getElementById("f").innerHTML = "FPS: " + frameRate()
  
  let range = new Circle(mouseX, mouseY, 50)
  let f = qt.query(range, [])
  
  qt.show()
  
  stroke(0, 255, 0)
  strokeWeight(5)
  rectMode(CENTER)
  circle(range.x, range.y, range.r)
  
  for (let p of f) {
    let d = dist(p.x, p.y, range.x, range.y)
    strokeWeight(map(d, range.r, 0, 3, 10))
    point(p.x, p.y)
  }
}
