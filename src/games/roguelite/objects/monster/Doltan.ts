/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Animation } from '../../../../modules/draw/animation/Animation';
import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';
import { ActionMove } from '../../actions/ActionMove';

interface DoltanConfig extends ObjectBaseConfig {
  
}

export enum DoltanStatus {
  READY=0,
  MOVE=1,
  CHASE_ENEMY=2,
  ATTACKING=3,
  ATTACKED=4,
  DYING=5,
}

export class Doltan extends ObjectBase {
  
  // object status
  status:DoltanStatus = DoltanStatus.CHASE_ENEMY;

  // monster stat
  life = 100;
  speed = 15;
  visibleRadius = 50;

  // action
  targetX = 0;
  targetY = 0;
  actionChase!:ActionMove;

  // draw stat
  flipX = false;
  
  // animation assets
  animation = { 
    pose: new Animation('animation/monster/AniMetaDoltan.ts', 'pose'),
    attack: new Animation('animation/monster/AniMetaDoltan.ts', 'attack'),
    attacked: new Animation('animation/monster/AniMetaDoltan.ts', 'attacked'),
  };

  constructor(config:DoltanConfig) {
    
    super({
      ...config,
      bodyColliderConfig: {
        colliderWidth: 8,
        colliderHeight: 6,
        colliderOffsetX: 6,
        colliderOffsetY: 7,
      },
    });

    // Collider debug
    this.debugCollider = true;

  }

  init(): void {
    
    super.init();

    // global add
    context.monsterContext.add(this);

    // player 타게팅    
    this.actionChase = new ActionMove({ targetObject: this, colliderListForCheck: context.playerContext });
    this.setMoveTarget(context.playerContext.x, context.playerContext.y);

  }
  
  step(time: number) {

    // 상태별 애니메이션 선택
    switch (this.status) {
      case DoltanStatus.CHASE_ENEMY:
        // player 타게팅
        this.setMoveTarget(context.playerContext.x, context.playerContext.y);
        // action 계산
        this.actionChase.next(time, 'body');
        // 기본 animation
        this.animation.pose.step(time);
        break;
      case DoltanStatus.ATTACKING:
        this.animation.attack.step(time);
        break;
      case DoltanStatus.ATTACKED:
        this.animation.attacked.step(time);
        break;
      default:
        break;
    }
    
    if (this.status === DoltanStatus.ATTACKED) {
      if (!this.animation.attacked.playing) {
        this.status = DoltanStatus.CHASE_ENEMY;
        this.animation.attack.setAnimation('attack', true);  
      }
    } else if (this.collider.body?.checkCollisionWith(context.playerContext, 'body')) {
      this.status = DoltanStatus.ATTACKING;
    } else if (this.status === DoltanStatus.ATTACKING) {
      this.status = DoltanStatus.CHASE_ENEMY;
      this.animation.attack.setAnimation('attack', true);
    }

  }

  draw(): void {
    
    // 상태별 애니메이션 그리기
    switch (this.status) {
      case DoltanStatus.CHASE_ENEMY:
        this.animation.pose.draw(this.drawX, this.drawY, this.flipX);
        break;
      case DoltanStatus.ATTACKING:
        this.animation.attack.draw(this.drawX, this.drawY, this.flipX);
        break;
      case DoltanStatus.ATTACKED:
        this.animation.attacked.draw(this.drawX, this.drawY, this.flipX);
        break;
      default:
        break;
    }
    
    // for object debug
    super.draw();

  }

  destroy(): void {
    
    super.destroy();

    // global remove
    context.monsterContext.remove(this);

  }

  setLife(life:number) {
    super.setLife(life);
    this.status = DoltanStatus.ATTACKED;
    this.animation.attacked.setAnimation('attacked', true);
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