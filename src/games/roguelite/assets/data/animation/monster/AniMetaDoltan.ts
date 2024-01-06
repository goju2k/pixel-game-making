import { AnimationMeta } from '../../../../../../modules/draw/animation/AnimationMeta';

export const AniMetaDoltan:AnimationMeta<'pose'|'attack', 'doltan'> = {
  spriteMap: {
    doltan: {
      src: 'characters/monster/doltan/doltan.png',
      w: 16,
      h: 16,
    },
  },
  def: {
    pose: {
      map: 'doltan',
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
      map: 'doltan',
      loopCnt: -1,
      delay: 200,
      frames: [

        // 연기나는 프레임 시작 (x번 반복)
        ...Array.from(Array(6)).map(() => [
          {
            pos: 7,
            delay: 100,
          },
          {
            pos: 8,
            delay: 100,
          },
          {
            pos: 9,
            delay: 100,
          },
        ]).flat(),

        {
          pos: 7,
          delay: 700,
        }, // 잠깐 멈칫

        // 연기나는 프레임 끝

        // 폭발 프레임 시작
        {
          pos: 10,
          delay: 50,
        },
        {
          pos: 11,
          delay: 50,
        },
        {
          pos: 12,
          delay: 50,
        },
        {
          pos: 13,
          delay: 50,
        },
        {
          pos: 14,
          delay: 50,
        },
        {
          pos: 15,
          delay: 80,
        },
        {
          pos: 16,
          delay: 110,
        },
        {
          pos: 17,
          delay: 130,
        },
        {
          pos: 24,
          delay: 2000,
        },
        // 폭발 프레임 끝

        // 다시 태어나기 시작
        {
          pos: 18,
          delay: 130,
        },
        {
          pos: 19,
          delay: 130,
        },
        {
          pos: 20,
          delay: 2000,
        },
        {
          pos: 21,
          delay: 100,
        },
        {
          pos: 22,
          delay: 150,
        },
        {
          pos: 23,
          delay: 1000,
        },
        // 다시 태어나기 끝

      ],
    },
  },
};

export default AniMetaDoltan;