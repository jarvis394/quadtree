class Rect {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  
  contains(obj) {
    return (
      this.x - this.w < obj.x &&
      this.x + this.w > obj.x &&
      this.y - this.w < obj.y &&
      this.y + this.w > obj.y
      )
  }
  
  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
      )
  }
}