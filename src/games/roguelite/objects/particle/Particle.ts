import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';

export interface ParticleConfig extends ObjectBaseConfig{
  targetX:number;
  targetY:number;
  velocity?:number; // pixel / ms
  rotate?:1|-1;
}

export class Particle extends ObjectBase {

  ratio:number = 0;

  velocity:number = 0.05;
  
  targetDis:number = 0;
  
  targetX:number = 0;

  targetY:number = 0;

  end:boolean = false;

  constructor(config:ParticleConfig) {
    
    super({ ...config });

    config.velocity && (this.velocity = config.velocity);

    this.x += (config.x - config.targetX > 0 ? -6 : 6);
    this.y -= 8;
    
    const deltaX = this.x - config.targetX;
    const deltaY = this.y - config.targetY;

    // 타겟을 화면 바깥으로 설정
    this.targetX = config.targetX + (240 * (deltaX > 0 ? -1 : 1));
    this.targetY = config.targetY + (240 * (deltaX > 0 ? -1 : 1) * (deltaY / deltaX));

    this.targetDis = Math.sqrt(Math.abs(config.x - this.targetX) ** 2 + Math.abs(config.y - this.targetY) ** 2);

  }

  step(time: number): void {
    
    const dis = time * this.velocity;
    this.ratio = dis / this.targetDis;

    this.setPosition(this.x + ((this.targetX - this.x) * this.ratio), this.y + ((this.targetY - this.y) * this.ratio));

    this.targetDis -= dis;
    
    this.end = this.targetDis < 0;

  }

  draw(): void {
    // ((global.renderContext?.ctx) as CanvasRenderingContext2D)
    context.renderContext?.fillRect2d(this.x, this.y, 1, 1, 'lightblue');
  }

}