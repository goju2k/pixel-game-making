/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Animation } from '../../../../modules/draw/animation/Animation';
import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';
import { ActionMove } from '../../actions/ActionMove';

interface GhostConfig extends ObjectBaseConfig {
  
}

export enum GhostStatus {
  READY=0,
  MOVE=1,
  CHASE_ENEMY=2,
  ATTACKING=3,
  ATTACKED=4,
  DYING=5,
}

export class Ghost extends ObjectBase {
  
  // object status
  status:GhostStatus = GhostStatus.CHASE_ENEMY;

  // monster stat
  life = 100;
  speed = 35;
  visibleRadius = 50;

  // action
  targetX = 0;
  targetY = 0;
  actionChase!:ActionMove;

  // draw stat
  flipX:1|-1 = 1;
  
  // animation assets
  animation = { 
    pose: new Animation('animation/monster/AniMetaGhost.ts', 'pose'),
    attack: new Animation('animation/monster/AniMetaGhost.ts', 'attack'),
  };

  constructor(config:GhostConfig) {
    
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

    // player 타게팅    
    this.actionChase = new ActionMove(this, context.playerContext);
    this.setMoveTarget(context.playerContext.x, context.playerContext.y);

  }
  
  step(time: number) {
    
    // 상태별 애니메이션 선택
    switch (this.status) {
      case GhostStatus.CHASE_ENEMY:
        // player 타게팅
        this.setMoveTarget(context.playerContext.x, context.playerContext.y);
        // action 계산
        this.actionChase.next(time, 'body');
        // 기본 animation
        this.flipX = this.actionChase.moveDirectionH ? -1 : 1; // 방향 설정
        this.animation.pose.step(time);
        break;
      case GhostStatus.ATTACKING:
        this.animation.attack.step(time);
        break;
    
      default:
        break;
    }
    
    if (this.collider.body?.checkCollisionWith(context.playerContext, 'body')) {
      this.status = GhostStatus.ATTACKING;
    } else {
      this.status = GhostStatus.CHASE_ENEMY;
    }

  }

  draw(): void {
    
    // 상태별 애니메이션 그리기
    switch (this.status) {
      case GhostStatus.CHASE_ENEMY:
        this.animation.pose.draw(this.drawX, this.drawY, this.flipX);
        break;
      case GhostStatus.ATTACKING:
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

    this.actionChase.setMoveTarget(this.targetX, this.targetY);

  }
  
}