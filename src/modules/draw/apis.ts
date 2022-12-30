
type ImageSource = CanvasImageSource | TexImageSource

type FlipType = 1|-1

export interface GameRenderingContext {
  ctx:CanvasRenderingContext2D|WebGL2RenderingContext
  clear2d:()=>void
  drawImage2d:(image: ImageSource, sx: number, sy: number, sWidth:number, sHeight:number, dx: number, dy: number, dWidth:number, dHeight:number, flipX?:FlipType, flipY?:FlipType, _rotate?:number)=>void
  translate2d:(x:number, y:number)=>void
}

export class Canvas2dApi implements GameRenderingContext {

  ctx: CanvasRenderingContext2D
  
  translatedX:number=0
  translatedY:number=0

  constructor(ctx: CanvasRenderingContext2D){
    this.ctx = ctx
  }

  clear2d(){
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(this.translatedX, this.translatedY, this.ctx.canvas.width + this.translatedX, this.ctx.canvas.height + this.translatedY)
  }

  drawImage2d(image: ImageSource, sx: number, sy: number, sWidth:number, sHeight:number, dx: number, dy: number, dWidth:number, dHeight:number, flipX?:FlipType, flipY?:FlipType, _rotate?:number){

    //flip 처리
    if(flipX || flipY){
      this.ctx.save()
      this.ctx.scale(flipX?flipX:1, flipY?flipY:1)
    }

    //이미지 그리기
    this.ctx.drawImage(
      image as CanvasImageSource, 
      sx, 
      sy, 
      sWidth, 
      sHeight, 
      flipX===-1?flipX * Math.floor(dx) - dWidth : Math.floor(dx),
      flipY===-1?flipY * Math.floor(dy) - dHeight : Math.floor(dy),
      dWidth, 
      dHeight
    )
    
    //flip 복귀
    if(flipX || flipY) this.ctx.restore();
    
    //디버그용 박스
    // this.ctx.lineWidth = 1
    // this.ctx.strokeStyle = 'black'
    // this.ctx.strokeRect(Math.floor(x), Math.floor(y), this.scaleWidth, this.scaleHeight);

  }

  translate2d(x:number, y:number){
    this.translatedX += x
    this.translatedY += y
    this.ctx.translate(x, y)
  }

}

export function createRenderingContext(ctx:CanvasRenderingContext2D|WebGL2RenderingContext):GameRenderingContext{

  if(ctx instanceof CanvasRenderingContext2D){
    return new Canvas2dApi(ctx)
  }else if(ctx instanceof WebGL2RenderingContext){
    throw new Error('아직 지원하지 않는 Context입니다.')
  }

  throw new Error('지원하지 않는 Context입니다.')

}
