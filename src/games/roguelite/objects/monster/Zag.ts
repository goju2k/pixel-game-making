/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Animation } from '../../../../modules/draw/animation/Animation';
import { Sprite } from '../../../../modules/draw/image/Sprite';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';

interface ZagConfig extends ObjectBaseConfig {
  
}

export class Zag extends ObjectBase {
  
  sprite!:Sprite;

  tileNo:number = 1;

  rotate:1|-1 = 1;

  nextTime:number = 0;

  status:'init'|'run'|'attack' = 'init';

  animation = { pose: new Animation('animation/monster/AniMetaZag.ts', 'pose') };

  constructor(config:ZagConfig) {
    
    super({
      ...config,
      colliderConfig: {
        colliderWidth: 12,
        colliderHeight: 4,
        colliderOffsetX: 3,
        colliderOffsetY: 14,
      },
      bodyColliderConfig: {
        colliderWidth: 12,
        colliderHeight: 14,
        colliderOffsetX: 3,
        colliderOffsetY: 1,
      },
    });

    // Collider debug
    // this.debugCollider = true;

  }

  init(): void {
    
    super.init();

  }
  
  step(time: number) {
    // @ts-ignore
    this.animation?.pose.step(time);
  }

  draw(): void {
    
    // this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.rotate);

    // @ts-ignore
    this.animation?.pose.draw(this.drawX, this.drawY);

    // for debug
    super.draw();

  }

  destroy(): void {
    super.destroy();
  }
  
}