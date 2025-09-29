import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';
import { ActionMove, ActionMoveStatus } from '../../actions/ActionMove';
import { TextBase } from '../text/TextBase';

export interface ParticleConfig extends Omit<ObjectBaseConfig, 'width'|'height'> {
  imageFlag?:boolean;
  width?:number;
  height?:number;
  targetX:number;
  targetY:number;
  speed?:number; // pixel / ms
  flipX?:boolean;
  colliderListForCheck?:ObjectBase|(ObjectBase[]);
  critical?:number;
  penetration?:boolean;
}

export enum ParticleStatus {
  MOVING=0,
  HIT=1,
  END=2,
}

export class Particle extends ObjectBase {

  // image 여부
  imageFlag = false;

  // particle status
  status:ParticleStatus = ParticleStatus.MOVING;

  // 충돌 대상
  colliderListForCheck?:ObjectBase|(ObjectBase[]);

  // 종료 여부
  end:boolean = false;

  // 이동 액션 클래스
  actionMove;

  // 충돌 데미지
  damage:number = 20;

  // 크리티컬
  critical:number = 0.1;

  // 관통
  penetration:boolean = false;

  constructor(config:ParticleConfig) {
    
    const { width = 1, height = 1, imageFlag = false } = config;
    const {
      bodyColliderConfig = {
        colliderWidth: width,
        colliderHeight: height,
        colliderOffsetX: 0,
        colliderOffsetY: 0,
      }, 
    } = config;

    super({ ...config, width, height, bodyColliderConfig });

    // 이미지 사용 여부
    this.imageFlag = imageFlag;

    // 투사체 속도 설정
    config.speed && (this.speed = config.speed);

    // 크리티컬 설정
    config.critical && (this.critical = config.critical);

    // 관통 설정
    config.penetration && (this.penetration = config.penetration);

    // 대상 목표 계산
    this.x += (config.x - config.targetX > 0 ? -6 : 6);
    this.y -= 8;
    
    const deltaX = this.x - config.targetX;
    const deltaY = this.y - config.targetY;

    // 타겟을 화면 바깥으로 설정
    const targetX = config.targetX + (window.innerWidth * 0.5 * (deltaX > 0 ? -1 : 1));
    const targetY = config.targetY + (window.innerHeight * 0.5 * (deltaX > 0 ? -1 : 1) * (deltaY / deltaX));

    // action 생성 및 목표 설정
    this.actionMove = new ActionMove({
      targetObject: this,
      colliderListForCheck: config.colliderListForCheck,
      callbackForCollision: (list) => {
        list.forEach((target) => {
          const { isCritical, damage } = this.getDamage();
          context.textContext.add(new TextBase({
            x: this.x,
            y: this.y,
            text: String(damage),
            color: isCritical ? 'yellow' : 'white',
            size: isCritical ? '15px' : '10px',
          }));
          target.setLife(damage * -1);
        });
      },
      forceMoveWhenCollision: this.penetration,
    });
    this.actionMove.setMoveTarget(targetX, targetY);

  }

  step(time: number): void {
    
    // 다음 action 계산
    this.actionMove.next(time, 'body');

    // 종료여부 체크
    this.end = this.actionMove.status === ActionMoveStatus.IDLE;

  }

  draw(): void {

    !this.imageFlag && context.renderContext?.fillRect2d(this.x, this.y, this.width, this.height, 'lightblue');
    
    // for object debug
    super.draw();

  }

  getDamage() {
    const isCritical = Math.random() <= this.critical;
    return {
      isCritical, 
      damage: isCritical ? Math.floor(this.damage + Math.random() * this.damage * 100) : this.damage + Math.floor(Math.random() * this.damage),
    };
  }

}