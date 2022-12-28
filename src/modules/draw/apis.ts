import g from './global'
export class DrawApi {
  
  static drawImage(image:CanvasImageSource, x:number, y:number, ctx?:CanvasRenderingContext2D){
    ctx?ctx.drawImage(image, x, y):g.context?.drawImage(image, x, y)
  }

}
