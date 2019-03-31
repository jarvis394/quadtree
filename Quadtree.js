/**
 * Quadtree object
 * @param {Object} b Boundary for the quadtree
 * @param {Number} n 'Capacity' of the quadtree
 */
class Quadtree {
  constructor(b, n) {
    this.boundary = b
    this.capacity = n
    this.isDivided = false
    
    this.points = []
  }
  
  /**
   * Inserts point to the quadtree
   * @param {Object} point Point to insert
   */
  insert(point) {
    if (!this.boundary.contains(point)) return false
    
    if (this.points.length < this.capacity) {
      this.points.push(point)
    } else {
      if (!this.isDivided) this.subdivide()
      
           if (this.tr.insert(point)) return true
      else if (this.tl.insert(point)) return true
      else if (this.br.insert(point)) return true
      else if (this.bl.insert(point)) return true
    }
  }
  
  /**
   * Subdivides quadtree to a 4 quadtrees
   */
  subdivide() {
    let { x, y, w, h } = this.boundary
    let hw = w / 2
    let hh = h / 2
    
    let tr = new Rect(x + hw, y - hh, hw, hh)
    let tl = new Rect(x - hw, y - hh, hw, hh)
    let br = new Rect(x + hw, y + hh, hw, hh)
    let bl = new Rect(x - hw, y + hh, hw, hh)
    
    this.tr = new Quadtree(tr, this.capacity)
    this.tl = new Quadtree(tl, this.capacity)
    this.br = new Quadtree(br, this.capacity)
    this.bl = new Quadtree(bl, this.capacity)
    
    this.isDivided = true
  }
  
  /**
   * Queries quadtree's points by given range
   * @param {Object} range Range
   * @param {Array} [found] List of found points
   */
  query(range, found) {
    if (!found) found = []
    
    if (this.boundary.intersects(range)) {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p)
        }
      }
      
      if (this.isDivided) {
        this.tr.query(range, found)
        this.tl.query(range, found)
        this.br.query(range, found)
        this.bl.query(range, found)
      }
    }
    
    return found
  }
  
  /**
   * Draws tree and points
   */
  show() {
    rectMode(CENTER)
    stroke(255)
    strokeWeight(1)
    noFill()
    
    let { x, y, w, h } = this.boundary
    rect(x, y, w * 2, h * 2)
    
    for (let p of this.points) {
      strokeWeight(3)
      point(p.x, p.y)
    }
    
    if (this.isDivided) {
      this.tr.show()
      this.tl.show()
      this.br.show()
      this.bl.show()
    }
  }
}