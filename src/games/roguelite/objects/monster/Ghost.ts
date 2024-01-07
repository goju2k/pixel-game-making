import { MeleeMonster } from './base/MeleeMonster';

import { Animation } from '../../../../modules/draw/animation/Animation';

export class Ghost extends MeleeMonster {
  
  constructor() {
    
    super({
      x: 0,
      y: 0,
      width: 16,
      height: 16,
      bodyColliderConfig: {
        colliderWidth: 11,
        colliderHeight: 8,
        colliderOffsetX: 2,
        colliderOffsetY: 4,
      },
      animation: { 
        pose: new Animation('animation/monster/AniMetaGhost.ts', 'pose'),
        attack: new Animation('animation/monster/AniMetaGhost.ts', 'attack'),
        attacked: new Animation('animation/monster/AniMetaGhost.ts', 'attacked'),
      },
      stat: {
        life: 100,
        speed: 25,
        visibleRadius: 50,
      },
    });

    // Collider debug
    // this.debugCollider = true;

  }

}