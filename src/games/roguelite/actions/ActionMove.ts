import context from '../../../modules/draw/context/GlobalContext';
import { ObjectBase } from '../../../modules/object/base/ObjectBase';
import { PhysicsUtil } from '../../../modules/util/math/Physics';

export class ActionMove {

  targetObject!:ObjectBase;
  movex: number;
  movey: number;
  moveDis: number;
  moveDisX: number;
  moveDisY: number;
  moveCurrDis: number;
  currDisRatio: number;
  moveToX: number;
  moveToY: number;
  moveDirection: number;
  status: number;
  speedMs!: number;
  moveDirectionH!: boolean;
  moveDirectionV!: boolean;
  speed!: number;
  
  constructor(targetObject:ObjectBase) {

    // 대상 object
    this.targetObject = targetObject;

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
    this.status = 0; // 0:준비 1:실행중

  }

  initSpeed() {
      
    // 속도
    this.speed = this.targetObject.speed ? this.targetObject.speed : 20; // 1초에 기본 120픽셀
    this.speedMs = this.speed / 1000; // ms 당 이동속도

  }

  moveSetup(targetX:number, targetY:number) {

    this.status = 1; // 실행중

    this.movex = targetX;
    this.movey = targetY;

    this.moveDisX = this.movex - this.targetObject.x;
    this.moveDisY = this.movey - this.targetObject.y;

    this.moveDirectionH = this.moveDisX > 0;
    this.moveDirectionV = this.moveDisY > 0;

    this.moveDis = PhysicsUtil.getDistance(this.moveDisX, this.moveDisY);

  }

  calc(gapTime:number) {

    this.moveCurrDis = this.speedMs * gapTime;
          
    this.currDisRatio = this.moveCurrDis / this.moveDis;

    this.moveToX = this.moveDisX * this.currDisRatio;
    this.moveToY = this.moveDisY * this.currDisRatio;

    if ((this.moveToX > 0 && this.targetObject.x < this.movex)
      || (this.moveToX < 0 && this.targetObject.x > this.movex)
    ) {
      this.targetObject.x += this.moveToX;
    } else {
      this.moveToX = 0;
    }

    if ((this.moveToY > 0 && this.targetObject.y < this.movey)
      || (this.moveToY < 0 && this.targetObject.y > this.movey)
    ) {
      this.targetObject.y += this.moveToY;
    } else {
      this.moveToY = 0;
    }

    if (this.movex === 0 && this.movey === 0) {
      this.targetObject.x = this.movex;
      this.targetObject.y = this.movey;
    } else {

      this.targetObject.prevX = this.targetObject.x;
      this.targetObject.prevY = this.targetObject.y;
      this.targetObject.x = this.moveDirectionH ? Math.min(this.targetObject.x, this.movex) : Math.max(this.targetObject.x, this.movex);
      this.targetObject.y = this.moveDirectionV ? Math.min(this.targetObject.y, this.movey) : Math.max(this.targetObject.y, this.movey);

      // 충돌체크
      if (context.playerContext !== this.targetObject && this.targetObject.status !== this.targetObject.STAT_HIT) {

        const playerBox = context.playerContext.bodyCollider;
        const targetBox = this.targetObject.bodyCollider;
  
        if (playerBox && targetBox) {

          if (PhysicsUtil.checkCrossBox(
            playerBox.x1, 
            playerBox.y1, 
            playerBox.x2, 
            playerBox.y2,
            targetBox.x1, 
            targetBox.y1, 
            targetBox.x2, 
            targetBox.y2,
          )) {
            this.targetObject.x = this.targetObject.prevX;
            this.targetObject.y = this.targetObject.prevY;
            this.status = 0; // 준비
          }
  
        }

      } else {

        // for (let mon of this.$g.monsters){

        //     for(let box of mon.collider.boxList) {
  
        //         //me 의 충돌박스
        //         for(let mybox of this.targetObject.collider.boxList){
      
        //             if(this.$math.checkCrossBox(
        //                 box[0], box[1], box[2], box[3],
        //                 mybox[0], mybox[1], mybox[2], mybox[3],
        //             )){
        //                 this.targetObject.x = this.targetObject.prevX;
        //                 this.targetObject.y = this.targetObject.prevY;
        //                 this.status = 0; //준비
        //                 return;
        //             }
      
        //         }

        //     }

        // }

      }

    }

    if (this.status !== 0 && this.movex === this.targetObject.x && this.movey === this.targetObject.y) {

      this.status = 0; // 준비

    }

  }

}