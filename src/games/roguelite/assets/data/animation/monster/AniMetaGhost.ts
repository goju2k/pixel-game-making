import { AnimationMeta } from '../../../../../../modules/draw/animation/AnimationMeta';

export const AniMetaGhost:AnimationMeta<'pose'|'attack', 'ghost'> = {
  spriteMap: {
    ghost: {
      src: 'characters/monster/ghost/ghost.png',
      w: 16,
      h: 16,
    },
  },
  def: {
    pose: {
      map: 'ghost',
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
        {
          pos: 4,
          delay: 120,
        },
        {
          pos: 5,
          delay: 120,
        },
        {
          pos: 6,
          delay: 120,
        },
      ],
    },
    attack: {
      map: 'ghost',
      loopCnt: -1,
      delay: 200,
      frames: [
        {
          pos: 7,
          delay: 120,
        },
        {
          pos: 8,
          delay: 400,
        },
        {
          pos: 9,
          delay: 20,
        },
        {
          pos: 10,
          delay: 20,
        },
        {
          pos: 11,
          delay: 20,
        },
        {
          pos: 12,
          delay: 20,
        },
        {
          pos: 13,
          delay: 20,
        },
        {
          pos: 14,
          delay: 20,
        },
        {
          pos: 15,
          delay: 20,
        },
        {
          pos: 16,
          delay: 20,
        },
        {
          pos: 17,
          delay: 20,
        },
        {
          pos: 18,
          delay: 20,
        },
        {
          pos: 19,
          delay: 20,
        },
        {
          pos: 20,
          delay: 20,
        },
        {
          pos: 21,
          delay: 20,
        },
        {
          pos: 22,
          delay: 20,
        },
        {
          pos: 23,
          delay: 20,
        },
      ],
    },
  },
};

export default AniMetaGhost;