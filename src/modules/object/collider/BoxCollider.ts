import { ObjectBase } from '../base/ObjectBase';

export class BoxCollider {

  // 대상 object
  target:ObjectBase;

  // 박스 설정
  width:number = 0;

  height:number = 0;

  offsetX:number = 0;

  offsetY:number = 0;

  // 박스 영역
  x1:number = 0;

  y1:number = 0;

  x2:number = 0;

  y2:number = 0;

  // temp
  TEMP_ARRAY:number[] = new Array(4);

  constructor(target:ObjectBase, width?:number, height?:number, offsetX?:number, offsetY?:number) {
    this.target = target;
    this.width = width || target.width;
    this.height = height || target.height;
    offsetX && (this.offsetX = offsetX);
    offsetY && (this.offsetY = offsetY);
    this.update();
  }

  update() {
    this.x1 = this.target.drawX + this.offsetX;
    this.x2 = this.target.drawX + this.offsetX + this.width;
    this.y1 = this.target.drawY + this.offsetY;
    this.y2 = this.target.drawY + this.offsetY + this.height;
  }

  checkCollisionList(targetList:ObjectBase[]) {
    for (const target of targetList) {
      if (target !== this.target && this.checkCollisionWith(target)) {
        return true;
      }
    }
    return false;
  }

  checkCollisionWith(target:ObjectBase) {

    if (!target.collider) return false;

    const line = this.TEMP_ARRAY;
    for (let i = 0, len = 4; i < len; i++) {

      if (i === 0) {
        line[0] = this.x1;
        line[1] = this.y1;
      } else if (i === 1) {
        line[0] = this.x2;
        line[1] = this.y1;
      } else if (i === 2) {
        line[0] = this.x2;
        line[1] = this.y2;
      } else if (i === 3) {
        line[0] = this.x1;
        line[1] = this.y2;
      }

      if (target.collider.x2 >= line[0] && target.collider.y2 >= line[1] && target.collider.x1 <= line[0] && target.collider.y1 <= line[1]) {
        return true;
      }

    }

    return false;
  }

}