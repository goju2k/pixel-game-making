export class TileInfo {
  x:number;

  y:number;

  tileNo:number;

  rotate:1|-1;

  constructor(x:number, y:number, tileNo:number, rotate:1|-1 = 1) {
    this.x = x;
    this.y = y;
    this.tileNo = tileNo;
    this.rotate = rotate;
  }
}