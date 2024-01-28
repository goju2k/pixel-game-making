import { AnimationMeta, AnimationMetaDefData, AnimationMetaDefMap, AnimationMetaFrameData } from './AnimationMeta';

import { Sprite } from '../image/Sprite';

export class Animation {

  dataLoaded:boolean = false;

  spriteMap:Record<string, Sprite> = {};

  animationMap!: AnimationMetaDefMap<any, any>;

  playing: boolean;

  gapTime: number;

  loopCnt: number;

  currDelay: number;

  currAni?: AnimationMetaDefData<any>|null;

  currSprite?: Sprite|null;

  currFrame?: AnimationMetaFrameData|null;

  currFrameNo: number;

  // 생성자
  constructor(dataSrc: string, initAnimationName: string) {
    
    // 메타데이터 로드
    getData(dataSrc).then((aniMeta) => {

      // 스프라이트 목록 구성
      let tempSpriteData;
      let tempSprite;
      const sprites:Sprite[] = [];
      for (const spriteName in aniMeta.spriteMap) {

        tempSpriteData = aniMeta.spriteMap[spriteName];
        tempSprite = new Sprite(
          tempSpriteData.src,
          tempSpriteData.w,
          tempSpriteData.h,
          tempSpriteData.scale,
        );

        this.spriteMap[spriteName] = tempSprite;
        sprites.push(tempSprite);

      }

      // 애니메이션 정보
      this.animationMap = aniMeta.def;

      // 초기 애니메이션 지정
      if (initAnimationName) {
        this.setAnimation(initAnimationName, true);
      }
      
      Promise.all(sprites.map((sprite) => sprite.load())).then(() => {
        this.dataLoaded = true;
      });

    });

    // 실행관련 변수
    this.playing = false;
    this.gapTime = 0; // 지난 시간 변수
    this.loopCnt = 0; // 반복된 횟수
    this.currDelay = 0; // 현재 프레임의 지연(재생시간)
    this.currAni = null; // 현재 재생 애니메이션
    this.currSprite = null; // 현재 대상 스프라이트
    this.currFrame = null; // 현재 재생 프레임
    this.currFrameNo = -1; // 현재 재생 프레임 no

  }

  setAnimation(aniName:string, init:boolean) {

    this.playing = true;

    if (this.animationMap) {

      const newAni = this.animationMap[aniName];
  
      // 애니메이션 변경이 없으면 종료
      if (!init && newAni === this.currAni) {
        return;
      }
  
      this.loopCnt = 0; // 반복된 횟수
      this.currAni = newAni; // 현재 재생 애니메이션
      // this.currAni.name = aniName; // 이름 셋팅
      this.currSprite = this.spriteMap[this.currAni.map]; // 현재 대상 스프라이트
          
      this.setNextFrame(0); // 0번 프레임 셋팅
      
    }

  }

  setNextFrame(frameNo?:number) {

    if (frameNo === undefined) {

      frameNo = this.currFrameNo + 1;

      // 마지막 프레임이면
      if (frameNo === this.currAni?.frames.length) {

        // 반복수 지정되어 있는경우만 증가
        if (this.currAni.loopCnt > 0) {
          this.loopCnt += 1;
        }
                
        // 반복수 도달시 종료
        if (this.currAni.loopCnt > 0 && this.loopCnt === this.currAni.loopCnt) {
          this.loopCnt = 0;
          this.pause(true);
          return;
        }
                
        // 첫 프레임으로
        frameNo = 0;

      }

    }

    this.currFrame = this.currAni?.frames[frameNo]; // 현재 재생 프레임
    this.currFrameNo = frameNo;
    this.currDelay = this.currFrame?.delay ? this.currFrame.delay : this.currAni?.delay || 0;

  }

  step(gapTime:number) {
    // console.log('this.gapTime=>'+gapTime);
    if (!this.dataLoaded || !this.playing) {
      return;
    }

    // gap 누적
    if (this.currAni?.frames?.length || 0 > 1) {

      this.gapTime += gapTime;
      if (this.gapTime >= this.currDelay) {

        // console.log('gap:', this.gapTime)
                
        this.gapTime %= this.currDelay; // 지난 시간 변수

        this.setNextFrame();

        // console.log('gap 보정:'+this.gapTime)

      }

    }

  }

  draw(x:number, y:number, flipX?:boolean) {

    // console.log('this.gapTime=>'+gapTime);
    if (!this.dataLoaded || !this.playing) {
      return;
    }

    // 현재 프레임 draw
    this.currSprite?.drawNo(x, y, this.currFrame?.pos || 1, flipX);
    
  }

  pause(flag:boolean) {
    this.playing = !flag;
  }

}

const getData = async (src:string) => {
  const data = await import(`${process.env.REACT_APP_ASSET_DATA_URL}/${src}`);
  return data.default as unknown as AnimationMeta<any, any>;
};