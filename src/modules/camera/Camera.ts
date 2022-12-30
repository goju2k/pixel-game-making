import context from "../draw/global"
import { ObjectBase } from "../object/base/ObjectBase"
import { WorldBase } from "../scene/base/WorldBase"

export enum CAMERA_MODE {
  FOLLOW='follow',
  FIXED='fixed'
}

// type CAMERA_MODE = keyof CAMERA_MODE
interface CameraConfig {
  x?:number
  y?:number
  mode?:CAMERA_MODE
  targetObject?:ObjectBase
}

export class Camera {
  
  x:number = 0
  y:number = 0
  mode:CAMERA_MODE=CAMERA_MODE.FIXED
  targetWorld?:WorldBase
  targetObject?:ObjectBase

  translateX:number = 0
  translateY:number = 0

  

  constructor(config:CameraConfig){
    Object.assign(this, config)
    if(this.mode === 'follow' && !this.targetObject){
      throw new Error('follow모드는 targetObject 를 설정해야 합니다.')
    }
    console.log('camera init => ', Object.assign({}, this))
    this.followCamera()
  }

  followCamera(){
    if(this.mode === CAMERA_MODE.FOLLOW && this.targetObject){
      
      this.translateX = this.x - this.targetObject.drawX
      this.x = this.targetObject.drawX

      this.translateY = this.y - this.targetObject.drawY
      this.y = this.targetObject.drawY

      if(this.x <= 0){
        this.translateX = 0
      }
      if(this.y <= 0){
        this.translateY = 0
      }
      //console.log('followCamera => ', Object.assign({}, this))
      
      this.moveCamera()
    }
  }

  step(time:number){

    //this.followCamera()
    
  }

  private moveCamera(){

    if((this.translateX !== 0 || this.translateY !== 0) 
    && context.renderContext
    ){
      context.renderContext.translate2d(this.translateX, this.translateY)
      this.translateX = 0
      this.translateY = 0
    }
    
  }

}
