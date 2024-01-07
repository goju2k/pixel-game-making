/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Animation } from '../../../../../modules/draw/animation/Animation';
import context from '../../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../../modules/object/base/ObjectBase';
import { ActionMove } from '../../../actions/ActionMove';

export interface MeleeMonsterConfig extends ObjectBaseConfig {
  animation:{
    pose: Animation;
    attack: Animation;
    attacked: Animation;
  };
  stat?:{
    life?: number;
    speed?: number;
    visibleRadius?: number;
  };
}

export enum MeleeMonsterStatus {
  READY=0,
  MOVE=1,
  CHASE_ENEMY=2,
  ATTACKING=3,
  ATTACKED=4,
  DYING=5,
}

export class MeleeMonster extends ObjectBase {
  
  // object status
  status:MeleeMonsterStatus = MeleeMonsterStatus.CHASE_ENEMY;

  // monster stat
  life = 100;
  speed = 20;
  visibleRadius = 50;

  // action
  targetX = 0;
  targetY = 0;
  actionChase!:ActionMove;

  // draw stat
  flipX = false;
  
  // animation assets
  animation;

  constructor(config:MeleeMonsterConfig) {
    
    super({ ...config });

    // animation
    this.animation = config.animation;

    // stat
    if (config.stat) {
      this.life = config.stat.life || 100;
      this.speed = config.stat.speed || 20;
      this.visibleRadius = config.stat.visibleRadius || 50;
    }

    // Collider debug
    // this.debugCollider = true;

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
      case MeleeMonsterStatus.CHASE_ENEMY:
        // player 타게팅
        this.setMoveTarget(context.playerContext.x, context.playerContext.y);
        // action 계산
        this.actionChase.next(time, 'body');
        // 기본 animation
        this.animation.pose.step(time);
        break;
      case MeleeMonsterStatus.ATTACKING:
        // 공격 방향 체크 for flipX
        this.flipX = this.x - context.playerContext.x <= 0;
        this.animation.attack.step(time);
        break;
      case MeleeMonsterStatus.ATTACKED:
        this.animation.attacked.step(time);
        break;
      default:
        break;
    }
    
    if (this.status === MeleeMonsterStatus.ATTACKED) {
      if (!this.animation.attacked.playing) {
        this.status = MeleeMonsterStatus.CHASE_ENEMY;
        this.animation.attack.setAnimation('attack', true);  
      }
    } else if (this.collider.body?.checkCollisionWith(context.playerContext, 'body')) {
      this.status = MeleeMonsterStatus.ATTACKING;
    } else if (this.status === MeleeMonsterStatus.ATTACKING) {
      this.status = MeleeMonsterStatus.CHASE_ENEMY;
      this.animation.attack.setAnimation('attack', true);
    }

  }

  draw(): void {
    
    // 상태별 애니메이션 그리기
    switch (this.status) {
      case MeleeMonsterStatus.CHASE_ENEMY:
        this.animation.pose.draw(this.drawX, this.drawY, this.flipX);
        break;
      case MeleeMonsterStatus.ATTACKING:
        this.animation.attack.draw(this.drawX, this.drawY, this.flipX);
        break;
      case MeleeMonsterStatus.ATTACKED:
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
    this.status = MeleeMonsterStatus.ATTACKED;
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