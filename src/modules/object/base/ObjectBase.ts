import { BoxCollider } from "../collider/BoxCollider"
import global from '../../draw/global'
export interface ObjectColliderConfig {
  colliderWidth?:number
  colliderHeight?:number
  colliderOffsetX?:number
  colliderOffsetY?:number
}

type ANCHOR_TYPE = 'CenterBottom'|'TopLeft'
export interface ObjectBaseConfig {
  x:number
  y:number
  width:number
  height:number
  anchorType?:ANCHOR_TYPE
  colliderConfig?:ObjectColliderConfig
}

export abstract class ObjectBase {

  //위치
  x:number = 0
  y:number = 0
  drawX:number = 0
  drawY:number = 0

  anchorType:ANCHOR_TYPE = 'CenterBottom'
  prevX:number = 0
  prevY:number = 0

  //크기
  width:number = 0
  height:number = 0
  widthHalf:number = 0
  heightHalf:number = 0

  //충돌박스
  collider?:BoxCollider
  
  constructor(config:ObjectBaseConfig){
    Object.assign(this, config)
    this.setSize(this.width, this.height)
    this.setPosition(this.x, this.y)
    if(config.colliderConfig){
      this.collider = new BoxCollider(this, config.colliderConfig.colliderWidth, config.colliderConfig.colliderHeight, config.colliderConfig.colliderOffsetX, config.colliderConfig.colliderOffsetY)
    }
    this.init()
  }
  
  //기본 drawbles function
  init(){
    this.collider && global.objectContext.add(this)
  }

  update(){

  }

  step(time:number){

  }

  draw(){

  }

  destroy(){
    this.collider && global.objectContext.remove(this)
  }

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
      this.prevX = this.x
      this.x = x
      this.drawX = this.anchorType==='CenterBottom'?this.x - this.widthHalf:x
    }
    if(y){
      this.prevY = this.y
      this.y = y
      this.drawY = this.anchorType==='CenterBottom'?this.y - this.height:y
    }

    //충돌박스 업데이트
    this.collider && this.collider.update()

  }

}
