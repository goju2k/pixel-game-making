import g from '../context/GlobalContext';

const imageCache = new Map<string, HTMLImageElement>();

// 이미지 Get
const getImage = async (imageSrc:string):Promise<HTMLImageElement> => new Promise<HTMLImageElement>((resolve) => {
  
  const image = imageCache.get(imageSrc);
  if (!image) {
    createImage(imageSrc).then((data) => {
      imageCache.set(imageSrc, data);
      resolve(data);
    });
    // console.log('new image ', imageCache[imageSrc]);
  } else {
    // console.log('cache image ', imageCache[imageSrc]);
    resolve(image);
  }
  
});

// 이미지 생성
const createImage = async (imageSrc:string) => {
  const image = document.createElement<'img'>('img');
  image.src = (await import(`${process.env.REACT_APP_ASSET_IMAGE_URL}/${imageSrc}`)).default;
  await image.decode();
  return image;
};

interface FrameOffset {
  offsetX:number;
  offsetY:number;
}

export class Sprite {

  imageSrc:string;

  imageLoaded = false;

  image!:HTMLImageElement;

  scale:number = 0;

  scaleWidth:number = 0;

  scaleHeight:number = 0;

  frameWidth:number = 0;

  frameHeight:number = 0;

  xcnt:number = 0;

  ycnt:number = 0;

  frames:FrameOffset[][] = [];

  framesNo:FrameOffset[] = [{ offsetX: 0, offsetY: 0 }]; // index 1부터 채우기 위해...

  constructor(imageSrc:string, frameWidth?:number, frameHeight?:number, scale?:number) {
    
    this.imageSrc = imageSrc;
    frameWidth && (this.frameWidth = frameWidth);
    frameHeight && (this.frameHeight = frameHeight);
    this.scale = scale || 1;

  }

  drawNo(x:number, y:number, no:number, flipX?:boolean) {

    // 프레임 존재 체크
    if (!this.framesNo[no]) {
      throw new Error(`이미지의 프레임 No. (${no}) 이 존재하지 않습니다.  No Range => ( 0 ~ ${this.framesNo.length} )`);
    }

    this.drawMain(x, y, this.framesNo[no], flipX);

  }

  draw(x:number, y:number, frameX:number, frameY:number, flipX?:boolean) {

    // 프레임 존재 체크
    if (!this.frames[frameX] || !this.frames[frameX][frameY]) {
      throw new Error(`이미지의 프레임 (${frameX},${frameY}) 이 존재하지 않습니다.  최대좌표 => (${this.xcnt},${this.ycnt})`);
    }

    this.drawMain(x, y, this.frames[frameX][frameY], flipX);

  }

  private drawMain(x:number, y:number, offset:FrameOffset, flipX?:boolean) {
    
    if (!this.imageLoaded) return;
    
    if (!g.renderContext) return;
    
    g.renderContext.drawImage2d(
      this.image, 
      offset.offsetX, 
      offset.offsetY, 
      this.frameWidth, 
      this.frameHeight, 
      x,
      y,
      this.scaleWidth, 
      this.scaleHeight,
      flipX ? -1 : 1,
    );

  }

  async load():Promise<boolean> {

    return new Promise((resolve) => {

      getImage(this.imageSrc).then((image) => {
        
        console.log(`${this.imageSrc} loaded!!!`);
        this.image = image;
    
        // 프레임 처리
        if (!this.frameWidth) this.frameWidth = this.image.width;
        if (!this.frameHeight) this.frameHeight = this.image.height;
  
        // 스케일 처리
        this.scaleWidth = this.frameWidth * this.scale;
        this.scaleHeight = this.frameHeight * this.scale;
  
        // 이미지 비율 점검
        if (this.image.width % this.frameWidth !== 0
        || this.image.height % this.frameHeight !== 0
        ) {
          throw new Error('이미지의 프레임사이즈 비율이 맞지 않습니다.');
        }
  
        // 프레임 정보 생성
        this.xcnt = this.image.width / this.frameWidth;
        this.ycnt = this.image.height / this.frameHeight;
        const { xcnt, ycnt } = this;
        for (let i = 0; i < ycnt; i++) {
  
          if (!this.frames[i]) {
            this.frames[i] = [];
          }
          for (let k = 0; k < xcnt; k++) {
            this.frames[i][k] = { offsetX: k * this.frameHeight, offsetY: i * this.frameWidth } as FrameOffset;
            this.framesNo.push(this.frames[i][k]);
          }
  
        }
  
        this.imageLoaded = true;
        resolve(true);
  
      });

    });

  }

}