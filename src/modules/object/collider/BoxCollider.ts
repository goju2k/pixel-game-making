import { ArrayPoolUtil } from '../../util/object/ArrayPool';
import { ObjectBase } from '../base/ObjectBase';

export type ColliderType = 'base'|'body'

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

  checkCollisionList(targetList:ObjectBase[], type:ColliderType = 'base') {
    for (const target of targetList) {
      if (target !== this.target && this.checkCollisionWith(target, type)) {
        return true;
      }
    }
    return false;
  }

  checkCollisionWith(target:ObjectBase, type:ColliderType = 'base') {
    const targetCollider = target.collider[type];
    if (targetCollider) {
      return this.checkCollision(this, targetCollider) || this.checkCollision(targetCollider, this);
    }
    return false;
  }

  private checkCollision(source:BoxCollider, target:BoxCollider) {

    const line = ArrayPoolUtil.ARRAY_2;
    for (let i = 0, len = 4; i < len; i++) {
  
      if (i === 0) {
        line[0] = source.x1;
        line[1] = source.y1;
      } else if (i === 1) {
        line[0] = source.x2;
        line[1] = source.y1;
      } else if (i === 2) {
        line[0] = source.x2;
        line[1] = source.y2;
      } else if (i === 3) {
        line[0] = source.x1;
        line[1] = source.y2;
      }
  
      if (target.x2 >= line[0] && target.y2 >= line[1] && target.x1 <= line[0] && target.y1 <= line[1]) {
        return true;
      }
  
    }

    return false;
  }

}