import { Particle, ParticleConfig } from './Particle';

import { Sprite } from '../../../../modules/draw/image/Sprite';

export class Missile extends Particle {

  sprite:Sprite;

  loaded:boolean = false;

  tileNo:number = 1;

  rotate:1|-1 = 1;

  nextTime:number = -1;

  constructor(config:ParticleConfig) {
    super(config);
    this.sprite = new Sprite('characters/projectiles/missile.png', 16, 16);
    Promise.all([ this.sprite.load() ]).then(() => {
      this.loaded = true;
    });

    this.x += (config.x - config.targetX > 0 ? -8 : -4);
    this.y -= 5;
    config.rotate && (this.rotate = config.rotate);
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
    
    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.rotate);

  }

}