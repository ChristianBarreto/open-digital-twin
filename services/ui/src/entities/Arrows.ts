

export class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  constructor (x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  };
};

export class Arrow {
  lines: Line[] = [];
  constructor(side1: number, x1: number, y1: number, side2: number, x2: number, y2: number){
    if ((side1 === 1) && (side2 === 3)) {
      if (x2 >= x1) {
        const middle = x1+(x2-x1)/2;
        this.lines.push(new Line(x1, y1, middle, y1))
        this.lines.push(new Line(middle, y1, middle, y2))
        this.lines.push(new Line(middle, y2, x2, y2))
      }
    }
  }
}