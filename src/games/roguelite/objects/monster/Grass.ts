import { MeleeMonster } from './base/MeleeMonster';

import { Animation } from '../../../../modules/draw/animation/Animation';

export class Grass extends MeleeMonster {
  
  constructor() {
    
    super({
      x: 0,
      y: 0,
      width: 16,
      height: 16,
      bodyColliderConfig: {
        colliderWidth: 14,
        colliderHeight: 6,
        colliderOffsetX: 1,
        colliderOffsetY: 9,
      },
      animation: { 
        pose: new Animation('animation/monster/AniMetaGrass.ts', 'pose'),
        attack: new Animation('animation/monster/AniMetaGrass.ts', 'attack'),
        attacked: new Animation('animation/monster/AniMetaGrass.ts', 'attacked'),
      },
      stat: {
        life: 100,
        speed: 15,
        visibleRadius: 50,
      },
    });

    // Collider debug
    // this.debugCollider = true;

  }

}