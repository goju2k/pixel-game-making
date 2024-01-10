import { Particle, ParticleConfig } from './Particle';

import { Sprite } from '../../../../modules/draw/image/Sprite';

export class Missile extends Particle {

  sprite:Sprite;

  loaded:boolean = false;

  tileNo:number = 1;

  nextTime:number = -1;

  damage: number = 30;

  constructor(config:ParticleConfig) {

    config.bodyColliderConfig = {
      colliderWidth: 10,
      colliderHeight: 4,
      colliderOffsetX: 1,
      colliderOffsetY: 6,
    };

    config.imageFlag = true;

    config.width = 16;
    config.height = 16;
    
    super(config);

    this.sprite = new Sprite('characters/projectiles/missile.png', 16, 16);
    Promise.all([ this.sprite.load() ]).then(() => {
      this.loaded = true;
    });

    this.x += (config.x - config.targetX > 0 ? 2 : -2);
    this.y += 8;
    config.flipX && (this.flipX = config.flipX);

    // Collider debug
    // this.debugCollider = true;

  }

  step(time: number): void {
    super.step(time);

    // 달리기
    if (this.nextTime === -1) {
      this.tileNo = 1;
      this.nextTime += time;
    }
    
    if (this.nextTime > 30) {
      this.nextTime = 0;
      this.tileNo += 1;
      if (this.tileNo === 4) {
        this.tileNo = 1;
      }
    } else {
      this.nextTime += time;
    }

  }

  draw(): void {
    
    if (!this.loaded) return;
    
    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.flipX);

    super.draw();

  }

}