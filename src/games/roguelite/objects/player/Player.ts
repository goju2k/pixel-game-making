import { Sprite } from "../../../../modules/draw/image/Sprite"
import { ObjectBase, ObjectBaseConfig } from "../../../../modules/object/base/ObjectBase"
import global from '../../../../modules/draw/global'

interface PlayerConfig extends ObjectBaseConfig {
  
}

export class Player extends ObjectBase {
  
  loaded:boolean=false
  sprite!:Sprite

  tileNo:number=1
  rotate:1|-1=1
  nextTime:number = 0

  constructor(config:PlayerConfig){
    
    super(config)

    this.sprite = new Sprite('characters/soldier.png', 16, 16)
    Promise.all([this.sprite.load()]).then(()=>{
      this.loaded = true
    })
    
  }

  step(time: number){

    //플레이어 이동
    if(global.keyContext.KeyA || global.keyContext.KeyD || global.keyContext.KeyW || global.keyContext.KeyS){

      let nextDis = (time * 64) / 1000

      let moveX = this.x
      let moveY = this.y
      if(global.keyContext.KeyA){
        moveX -= nextDis
        this.rotate = 1
      }else if(global.keyContext.KeyD){
        moveX += nextDis
        this.rotate = -1
      }
      
      if(global.keyContext.KeyW){
        moveY -= nextDis
      }else if(global.keyContext.KeyS){
        moveY += nextDis
      }

      this.setPosition(moveX, moveY)

      if(this.nextTime === -1){
        this.tileNo = 2
        this.nextTime += time
      }else if(this.nextTime > 120){
        this.nextTime = 0
        this.tileNo = this.tileNo === 1?2:1
      }else{
        this.nextTime += time
      }

    }else{
      this.tileNo = 1
      this.nextTime = -1
    }

  }

  draw(): void {
    
    if(!this.loaded) return

    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.rotate)

  }
  
}
