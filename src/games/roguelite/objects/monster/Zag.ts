/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Animation } from '../../../../modules/draw/animation/Animation';
import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';
import { ActionMove } from '../../actions/ActionMove';

interface ZagConfig extends ObjectBaseConfig {
  
}

export enum ZagStatus {
  READY=0,
  MOVE=1,
  FIND_ENEMY=2,
  ATTACKING=3,
  ATTACKED=4,
  DYING=5,
}

export class Zag extends ObjectBase {
  
  // object status
  status:ZagStatus = ZagStatus.READY;

  // monster stat
  life = 100;
  speed = 20;
  visibleRadius = 50;

  // action
  targetX = 0;
  targetY = 0;
  actionChase = new ActionMove(this);

  // draw stat
  flipX:1|-1 = 1;
  
  // animation assets
  animation = { 
    pose: new Animation('animation/monster/AniMetaZag.ts', 'pose'),
    attack: new Animation('animation/monster/AniMetaZag.ts', 'attack'),
  };

  constructor(config:ZagConfig) {
    
    super({
      ...config,
      bodyColliderConfig: {
        colliderWidth: 14,
        colliderHeight: 6,
        colliderOffsetX: 1,
        colliderOffsetY: 9,
      },
    });

    // Collider debug
    // this.debugCollider = true;

  }

  init(): void {
    super.init();
  }
  
  step(time: number) {
    
    // if (this.life === 0) {

    // }

    // 상태별 애니메이션 선택
    switch (this.status) {
      case ZagStatus.READY:
        // player 타게팅
        this.setMoveTarget(context.playerContext.x, context.playerContext.y);
        // action 계산
        this.actionChase.calc(time);
        // position 설정
        this.setPosition(this.x, this.y);
        // 기본 animation
        this.flipX = this.actionChase.moveDirectionH ? -1 : 1; // 방향 설정
        this.animation.pose.step(time);
        break;
      case ZagStatus.ATTACKING:
        this.animation.attack.step(time);
        break;
    
      default:
        break;
    }
    
  }

  draw(): void {
    
    // 상태별 애니메이션 그리기
    switch (this.status) {
      case ZagStatus.READY:
        this.animation.pose.draw(this.drawX, this.drawY, this.flipX);
        break;
      case ZagStatus.ATTACKING:
        this.animation.attack.draw(this.drawX, this.drawY, this.flipX);
        break;
    
      default:
        break;
    }
    
    // for object debug
    super.draw();

  }

  destroy(): void {
    super.destroy();
  }

  private setMoveTarget(x:number, y:number) {
    
    if (this.targetX === x && this.targetY === y) {
      return;
    }

    this.targetX = x;
    this.targetY = y;

    this.actionChase.moveSetup(this.targetX, this.targetY);

  }
  
}