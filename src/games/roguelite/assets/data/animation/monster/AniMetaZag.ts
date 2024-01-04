import { AnimationMeta } from '../../../../../../modules/draw/animation/AnimationMeta';

export const AniMetaZag:AnimationMeta<'pose'|'attack', 'zag'|'zag2'> = {
  spriteMap: {
    zag: {
      src: 'characters/monster/zag/zag.png',
      w: 16,
      h: 16,
    },
    zag2: {
      src: 'characters/monster/zag/zag2.png',
      w: 16,
      h: 16,
    },
  },
  def: {
    pose: {
      map: 'zag',
      loopCnt: -1,
      delay: 200,
      frames: [
        {
          pos: 1,
          delay: 120,
        },
        {
          pos: 2,
          delay: 120,
        },
        {
          pos: 3,
          delay: 120,
        },
      ],
    },
    attack: {
      map: 'zag2',
      loopCnt: -1,
      delay: 200,
      frames: [
        {
          pos: 1,
          delay: 120,
        },
        {
          pos: 2,
          delay: 120,
        },
        {
          pos: 3,
          delay: 400,
        },
        {
          pos: 4,
          delay: 50,
        },
        {
          pos: 5,
          delay: 50,
        },
        {
          pos: 6,
          delay: 50,
        },
      ],
    },
  },
};

export default AniMetaZag;