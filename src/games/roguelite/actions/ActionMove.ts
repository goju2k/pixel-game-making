import { ObjectBase } from '../../../modules/object/base/ObjectBase';
import { ColliderType } from '../../../modules/object/collider/BoxCollider';
import { PhysicsUtil } from '../../../modules/util/math/Physics';

export enum ActionMoveStatus {
  /** 0 : 준비 */
  IDLE = 0,
  /** 1 : 이동중 */
  MOVING = 1,
}

export type CallbackForCollision = (targets:ObjectBase[]) => void;
export interface ActionMoveConfig {
  targetObject:ObjectBase;
  callbackForCollision?:CallbackForCollision;
  colliderListForCheck?:ObjectBase|(ObjectBase[]);
}

export class ActionMove {

  targetObject!:ObjectBase;

  // 충돌 체크 정보
  colliderListForCheck:ObjectBase[] = [];
  
  // 이동 타겟 좌표
  movex: number;
  movey: number;

  // 이동 상태
  status: ActionMoveStatus;

  // 이동 계산 변수
  moveDis: number;
  moveDisX: number;
  moveDisY: number;
  
  moveCurrDis: number;
  currDisRatio: number;
  
  moveToX: number;
  moveToY: number;
  
  moveDirection: number;
  moveDirectionH!: boolean;
  moveDirectionV!: boolean;
  
  speedMs!: number;
  speed!: number;

  // 충돌 체크
  callbackForCollision;

  constructor({ targetObject, callbackForCollision, colliderListForCheck }:ActionMoveConfig) {

    // 대상 object
    this.targetObject = targetObject;

    // 충돌 체크 대상
    if (colliderListForCheck) {
      if (Array.isArray(colliderListForCheck)) {
        this.colliderListForCheck = colliderListForCheck;
      } else {
        this.colliderListForCheck.push(colliderListForCheck);
      }
    }

    this.callbackForCollision = callbackForCollision;
    
    // 초기화
    this.initSpeed();
      
    // 중간변수
    this.movex = 0; // 이동 목표 x
    this.movey = 0; // 이동 목표 y
    this.moveDis = 0; // 이동할 거리
    this.moveDisX = 0; // 이동할 거리 x
    this.moveDisY = 0; // 이동할 거리 y
    this.moveCurrDis = 0; // 현재 이동중인 거리
    this.currDisRatio = 0; // 현재 이동거리 비율
    this.moveToX = 0; // 이동할 x좌표
    this.moveToY = 0; // 이동할 y좌표
    this.moveDirection = 0; // 0:left 1:right

    // 상태
    this.status = ActionMoveStatus.IDLE;

  }

  initSpeed() {
      
    // 속도
    this.speed = this.targetObject.speed ? this.targetObject.speed : 20; // 1초에 기본 120픽셀
    this.speedMs = this.speed / 1000; // ms 당 이동속도

  }

  setMoveTarget(targetX:number, targetY:number) {

    this.status = ActionMoveStatus.MOVING;

    this.movex = targetX;
    this.movey = targetY;

    this.moveDisX = this.movex - this.targetObject.x;
    this.moveDisY = this.movey - this.targetObject.y;

    this.moveDirectionH = this.moveDisX > 0;
    this.moveDirectionV = this.moveDisY > 0;

    this.moveDis = PhysicsUtil.getDistance(this.moveDisX, this.moveDisY);

  }

  next(gapTime:number, type?:ColliderType) {

    // 이번 이동 거리
    this.moveCurrDis = this.speedMs * gapTime;
    
    // 이동 비율
    this.currDisRatio = this.moveCurrDis / this.moveDis;

    // x,y 축 이동 거리 계산
    this.moveToX = this.moveDisX * this.currDisRatio;
    this.moveToY = this.moveDisY * this.currDisRatio;

    // x 축 위치 계산
    if ((this.moveToX > 0 && this.targetObject.x < this.movex)
      || (this.moveToX < 0 && this.targetObject.x > this.movex)
    ) {
      this.targetObject.x += this.moveToX;
    } else {
      this.moveToX = 0;
    }

    // y 축 위치 계산
    if ((this.moveToY > 0 && this.targetObject.y < this.movey)
      || (this.moveToY < 0 && this.targetObject.y > this.movey)
    ) {
      this.targetObject.y += this.moveToY;
    } else {
      this.moveToY = 0;
    }

    // 이동 계산 결과 검증 (목적지 도착시 또는 객체 충돌시 좌표를 동일하게 맞춤)
    if (this.movex === 0 && this.movey === 0) {
      this.targetObject.x = this.movex;
      this.targetObject.y = this.movey;
    } else {

      this.targetObject.prevX = this.targetObject.x;
      this.targetObject.prevY = this.targetObject.y;
      this.targetObject.x = this.moveDirectionH ? Math.min(this.targetObject.x, this.movex) : Math.max(this.targetObject.x, this.movex);
      this.targetObject.y = this.moveDirectionV ? Math.min(this.targetObject.y, this.movey) : Math.max(this.targetObject.y, this.movey);
      
      // 충돌체크
      if (type && this.targetObject.collider[type]?.checkCollisionList(this.colliderListForCheck, type)) {

        this.callbackForCollision && this.callbackForCollision(this.targetObject.collider[type]?.checkCollisionListAll(this.colliderListForCheck, type) || []);

        this.targetObject.x = this.targetObject.prevX;
        this.targetObject.y = this.targetObject.prevY;
        this.status = ActionMoveStatus.IDLE;
      }
          
    }

    if (this.status !== ActionMoveStatus.IDLE && this.movex === this.targetObject.x && this.movey === this.targetObject.y) {

      this.status = ActionMoveStatus.IDLE;

    }

    // draw position 설정
    this.targetObject.setPosition(this.targetObject.x, this.targetObject.y);
    // 방형 설정
    this.targetObject.flipX = this.moveDirectionH;

  }

}