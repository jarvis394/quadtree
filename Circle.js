class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
  }
  
  contains(obj) {
    return dist(obj.x, obj.y, this.x, this.y) < this.r
  }
  
  intersects(range) {
    return dist(range.x, range.y, this.x, this.y) < this.r
  }
}