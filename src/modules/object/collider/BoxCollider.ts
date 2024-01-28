import { PhysicsUtil } from '../../util/math/Physics';
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

  update(flipX?:boolean) {
    this.x1 = this.target.drawX + this.offsetX;
    this.x2 = this.target.drawX + this.offsetX + this.width;
    this.y1 = this.target.drawY + this.offsetY;
    this.y2 = this.target.drawY + this.offsetY + this.height;
    this.updateFlipX(flipX);
  }

  updateFlipX(flipX?:boolean) {
    if (flipX) {
      const drawGapX1 = this.x1 - this.target.drawX;
      const drawGapX2 = this.target.drawX + this.target.width - this.x2;
      const deltaX = drawGapX2 - drawGapX1;
      this.x1 += deltaX;
      this.x2 += deltaX;
    }
  }

  checkCollisionList(targetList:ObjectBase[], type:ColliderType = 'base') {
    for (const target of targetList) {
      if (target !== this.target && this.checkCollisionWith(target, type)) {
        return true;
      }
    }
    return false;
  }

  checkCollisionListAll(targetList:ObjectBase[], type:ColliderType = 'base') {
    const list:ObjectBase[] = [];
    for (const target of targetList) {
      if (target !== this.target && this.checkCollisionWith(target, type)) {
        list.push(target);
      }
    }
    return list;
  }

  checkCollisionWith(target:ObjectBase, type:ColliderType = 'base') {
    const targetCollider = target.collider[type];
    if (targetCollider) {
      return PhysicsUtil.checkCrossBox(
        this.x1, 
        this.y1, 
        this.width, 
        this.height,
        targetCollider.x1, 
        targetCollider.y1, 
        targetCollider.width, 
        targetCollider.height,
      );
    }
    return false;
  }

}