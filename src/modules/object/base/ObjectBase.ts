
export interface ObjectBaseConfig {
  x:number
  y:number
  width:number
  height:number
}

export abstract class ObjectBase {

  //위치
  x:number = 0
  y:number = 0
  drawX:number = 0
  drawY:number = 0

  //크기
  width:number = 0
  height:number = 0
  widthHalf:number = 0
  heightHalf:number = 0
  
  constructor(config:ObjectBaseConfig){
    Object.assign(this, config)
    this.setSize(this.width, this.height)
    this.setPosition(this.x, this.y)
  }
  
  //기본 drawbles function
  abstract step(time:number):void
  abstract draw():void

  setSize(width?:number, height?:number){
    if(width){
      this.width = width
      this.widthHalf = this.width / 2
    }
    if(height){
      this.height = height
      this.heightHalf = this.height / 2
    }
  }

  //x, y 를 설정하고 draw 좌표를 계산한다. (anchor 가 center bottom 기준)
  setPosition(x?:number, y?:number){
    if(x){
      this.x = x
      this.drawX = this.x - this.widthHalf
    }
    if(y){
      this.y = y
      this.drawY = this.y - this.height
    }
  }

}
