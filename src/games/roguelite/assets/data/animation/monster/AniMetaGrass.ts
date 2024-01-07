import { AnimationMeta } from '../../../../../../modules/draw/animation/AnimationMeta';

export const AniMetaZag:AnimationMeta<'pose'|'attack', 'grass'> = {
  spriteMap: {
    grass: {
      src: 'characters/monster/grass/grass.png',
      w: 16,
      h: 16,
    },
  },
  def: {
    pose: {
      map: 'grass',
      loopCnt: -1,
      delay: 200,
      frames: [

        // 14번까지 땅에서 올라오기
        ...Array.from(Array(14)).map((_idx, idx) => ({
          pos: idx + 1,
          delay: 100,
        })),
        
        // 반대로 재생
        ...Array.from(Array(14)).map((_idx, idx) => ({
          pos: 14 - idx,
          delay: 100,
        })),

      ],
    },
    attack: {
      map: 'grass',
      loopCnt: -1,
      delay: 200,
      frames: [
        // 15번 부터 마지막
        ...Array.from(Array(11)).map((_idx, idx) => {
          const delay = idx < 5 ? 30 : 120;
          return {
            pos: idx + 15,
            delay,
          };
        }),
      ],
    },
  },
};

export default AniMetaZag;