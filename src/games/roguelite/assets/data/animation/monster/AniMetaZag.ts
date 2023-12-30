import { AnimationMeta } from '../../../../../../modules/draw/animation/AnimationMeta';

export const AniMetaZag:AnimationMeta<'pose', 'zag'> = {
  spriteMap: {
    zag: {
      src: 'characters/monster/zag/zag.png',
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
  },
};

export default AniMetaZag;