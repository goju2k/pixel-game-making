type ImageSource = CanvasImageSource | TexImageSource

type FlipType = 1|-1

export interface GameRenderingContext {

  ctx:CanvasRenderingContext2D|WebGL2RenderingContext;

  translatedX:number;
  translatedY:number;

  getScale:()=>number;
  setScale:(scale:number)=>void;
  isMobile:()=>boolean;
  setMobile:(isMobile:boolean)=>void;
  clear2d:()=>void;
  fillRect2d:(x:number, y:number, width:number, height:number, color?:string, alpha?:number)=>void;
  drawImage2d:(image: ImageSource, sx: number, sy: number, sWidth:number, sHeight:number, dx: number, dy: number, dWidth:number, dHeight:number, flipX?:FlipType, flipY?:FlipType, _rotate?:number)=>void;
  translate2d:(x:number, y:number)=>void;
  canvasResized:()=>void;

}

export class Canvas2dApi implements GameRenderingContext {

  ctx: CanvasRenderingContext2D;
  
  translatedX:number = 0;

  translatedY:number = 0;

  mobile:boolean = false;

  scale:number = 1;

  clearX:number = 0;

  clearY:number = 0;

  clearWidth:number = 0;

  clearHeight:number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.setScaledClearArea();
  }
  
  isMobile() {
    return this.mobile;
  }

  setMobile(isMobile:boolean) {
    this.mobile = isMobile;
  }

  getScale() {
    return this.scale;
  }

  setScale(scale:number) {
    this.scale = scale;
    this.setScaledClearArea();
  }
  
  private setScaledClearArea() {
    const scaledW = this.ctx.canvas.width;
    const scaledH = this.ctx.canvas.height;
    this.clearX = scaledW * -1;
    this.clearY = scaledH * -1;
    this.clearWidth = scaledW * 3;
    this.clearHeight = scaledH * 3;
  }

  clear2d() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.clearX, this.clearY, this.clearWidth, this.clearHeight);
    // this.ctx.fillRect(this.translatedX * -1, this.translatedY * -1, this.ctx.canvas.width + this.translatedX, this.ctx.canvas.height + this.translatedY)
  }
  
  fillRect2d(x: number, y: number, width: number, height: number, color?:string, alpha?:number) {
    alpha && (this.ctx.globalAlpha = alpha);
    color && (this.ctx.fillStyle = color);
    this.ctx.fillRect(x, y, width, height);
    alpha && (this.ctx.globalAlpha = 1);
  }

  drawImage2d(image: ImageSource, sx: number, sy: number, sWidth:number, sHeight:number, dx: number, dy: number, dWidth:number, dHeight:number, flipX?:FlipType, flipY?:FlipType) {

    // flip 처리
    if (flipX || flipY) {
      this.ctx.save();
      this.ctx.scale(flipX || 1, flipY || 1);
    }

    // 이미지 그리기
    this.ctx.drawImage(
      image as CanvasImageSource, 
      sx, 
      sy, 
      sWidth, 
      sHeight, 
      flipX === -1 ? flipX * dx - dWidth : dx,
      flipY === -1 ? flipY * dy - dHeight : dy,
      dWidth, 
      dHeight,
    );
    
    // flip 복귀
    if (flipX || flipY) this.ctx.restore();
    
  }

  translate2d(x:number, y:number) {
    this.translatedX += x;
    this.translatedY += y;
    this.ctx.translate(x, y);
  }

  canvasResized() {
    this.translatedX = 0;
    this.translatedY = 0;
  }

}

export function createRenderingContext(ctx:CanvasRenderingContext2D|WebGL2RenderingContext):GameRenderingContext {

  if (ctx instanceof CanvasRenderingContext2D) {
    return new Canvas2dApi(ctx);
  } if (ctx instanceof WebGL2RenderingContext) {
    throw new Error('아직 지원하지 않는 Context입니다.');
  }

  throw new Error('지원하지 않는 Context입니다.');

}