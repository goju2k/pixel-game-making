import context from '../../../../modules/draw/context/GlobalContext';
import { Sprite } from '../../../../modules/draw/image/Sprite';
import { ObjectBase } from '../../../../modules/object/base/ObjectBase';
import { FireBall } from '../particle/FireBall';
import { Missile } from '../particle/Missile';
import { Particle } from '../particle/Particle';

export class Player extends ObjectBase {
  
  loaded:boolean = false;

  sprite!:Sprite;

  tileNo:number = 1;

  nextTime:number = 0;

  status:'init'|'run'|'attack' = 'init';

  particles:Particle[] = [];

  constructor() {
    
    super({
      x: 0,
      y: 0,
      width: 18,
      height: 18,
      colliderConfig: {
        colliderWidth: 8,
        colliderHeight: 4,
        colliderOffsetX: 5,
        colliderOffsetY: 14,
      },
      bodyColliderConfig: {
        colliderWidth: 8,
        colliderHeight: 16,
        colliderOffsetX: 5,
        colliderOffsetY: 1,
      },
    });

    // Collider debug
    // this.debugCollider = true;

    this.sprite = new Sprite('characters/player.png', 18, 18);
    Promise.all([ this.sprite.load() ]).then(() => {
      this.loaded = true;
    });

  }

  init(): void {
    
    super.init();

    // context 에 추가
    context.playerContext = this;

    // player 에 카메라 포커스 처리
    context.camera.focusCameraTo(this, true);

  }
  
  update(): void {
    
    // player 에 카메라 포커스 처리
    context.camera.focusCameraTo(this, true);
    
  }
  
  step(time: number) {

    // 기본 공격
    if (context.keyContext.MouseLeft || context.keyContext.MouseRight) {

      // 공격 방향 정하기
      const delta = context.renderContext ? this.x + context.renderContext.translatedX - context.keyContext.MouseX : 0;
      this.flipX = delta <= 0;
      
      // 공격 애니메이션
      if (this.status !== 'attack') {
        this.nextTime = -1;
        this.tileNo = 21;
        this.status = 'attack';
      }

      if (this.nextTime === -1) {
        this.nextTime = 0;
        this.tileNo = 21;
        this.nextTime += time;
        
      } else if (
        (this.tileNo === 21 && this.nextTime > (context.keyContext.MouseRight ? 50 : 10)) 
      || (this.tileNo === 22 && this.nextTime > (context.keyContext.MouseRight ? 50 : 40))
      ) {
        
        this.nextTime = 0;

        if (this.tileNo === 21) {

          // 총알 쏘자
          if (context.keyContext.MouseRight) {

            if (Math.random() <= 0.2) {

              this.particles.push(new FireBall({
                x: this.x,
                y: this.y,
                targetX: context.renderContext ? context.keyContext.MouseX - context.renderContext.translatedX : 0,
                targetY: context.renderContext ? context.keyContext.MouseY - context.renderContext.translatedY : 0,
                speed: 80,
                flipX: this.flipX,
                colliderListForCheck: context.monsterContext.list,
                critical: 0.4,
                penetration: true,
              }));

            } else {

              this.particles.push(new Missile({
                x: this.x,
                y: this.y,
                targetX: context.renderContext ? context.keyContext.MouseX - context.renderContext.translatedX : 0,
                targetY: context.renderContext ? context.keyContext.MouseY - context.renderContext.translatedY : 0,
                speed: 40,
                flipX: this.flipX,
                colliderListForCheck: context.monsterContext.list,
                critical: 0.2,
              }));

            }

          } else {

            this.particles.push(new Particle({
              x: this.x,
              y: this.y,
              targetX: context.renderContext ? context.keyContext.MouseX - context.renderContext.translatedX : 0,
              targetY: context.renderContext ? context.keyContext.MouseY - context.renderContext.translatedY : 0,
              speed: 150,
              width: 2,
              height: 2,
              colliderListForCheck: context.monsterContext.list,
            }));

          }

        }

        this.tileNo = this.tileNo === 21 ? 22 : 21;        
      } else {
        this.nextTime += time;
      }

    } else
    // 플레이어 이동
      if (context.keyContext.KeyA || context.keyContext.KeyD || context.keyContext.KeyW || context.keyContext.KeyS) {

        const nextDis = (time * 64) / 1000;

        const orgX = this.x;
        const orgY = this.y;
        const orgPrevX = this.prevX;
        const orgPrevY = this.prevY;

        let moveX = this.x;
        let moveY = this.y;

        // x축 이동 체크
        if (context.keyContext.KeyA) {
          moveX -= nextDis;
          this.flipX = false;
        } else if (context.keyContext.KeyD) {
          moveX += nextDis;
          this.flipX = true;
        }
        this.setPosition(moveX);
      
        // 충돌났으면
        if (this.collider.base?.checkCollisionList(context.objectContext.list)) {
        // 되돌리기
          this.setPosition(orgX);
          this.prevX = orgPrevX;
        }

        // y축 이동 체크
        if (context.keyContext.KeyW) {
          moveY -= nextDis;
        } else if (context.keyContext.KeyS) {
          moveY += nextDis;
        }

        this.setPosition(undefined, moveY);

        // 충돌났으면
        if (this.collider.base?.checkCollisionList(context.objectContext.list)) {
        // 되돌리기
          this.setPosition(undefined, orgY);
          this.prevY = orgPrevY;
        }

        if (this.status !== 'run') {
          this.nextTime = -1;
          this.status = 'run';
        }

        // 달리기
        if (this.nextTime === -1) {
          this.tileNo = 11;
          this.nextTime += time;
        } else if (this.nextTime > 120) {
          this.nextTime = 0;
          this.tileNo += 1;
          if (this.tileNo === 15) {
            this.tileNo = 11;
          }
        } else {
          this.nextTime += time;
        }

      } else {

        this.setPosition(this.x, this.y);

        // 베이스
        if (this.status !== 'init') {
          this.nextTime = -1;
          this.tileNo = 1;
          this.status = 'init';
        }

        // idle
        if (this.nextTime === -1) {
          this.tileNo = 1;
          this.nextTime += time;
        } else if (this.nextTime > 150) {
          this.nextTime = 0;
          this.tileNo += 1;
          if (this.tileNo === 11) {
            this.tileNo = 1;
          }
        } else {
          this.nextTime += time;
        }

      }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].end) {
        this.particles[i].destroy();
        this.particles.splice(i, 1);
      } else {
        this.particles[i].step(time);  
      }
    }
    
    // player 에 카메라 포커스 처리
    context.camera.focusCameraTo(this);

  }

  draw(): void {
    
    if (!this.loaded) return;

    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.flipX);

    this.particles.forEach((p) => {
      p.draw();
    });

    // for object debug
    super.draw();

  }

  destroy(): void {
    super.destroy();
  }
  
}