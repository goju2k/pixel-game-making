import { Sprite } from "../../../../modules/draw/image/Sprite"
import { ObjectBase, ObjectBaseConfig, ObjectColliderConfig } from "../../../../modules/object/base/ObjectBase"
import global from '../../../../modules/draw/global'
import context from "../../../../modules/draw/global"

interface PlayerConfig extends ObjectBaseConfig {
  
}

export class Player extends ObjectBase {
  
  loaded:boolean=false
  sprite!:Sprite

  tileNo:number=1
  rotate:1|-1=1
  nextTime:number = 0

  status:'init'|'run'|'attack'='init'

  constructor(config:PlayerConfig){
    
    super({...config, colliderConfig:{
      colliderWidth:12,
      colliderHeight:16,
      colliderOffsetX:3,
      colliderOffsetY:1
    }})

    this.sprite = new Sprite('characters/soldier.png', 18, 18)
    Promise.all([this.sprite.load()]).then(()=>{
      this.loaded = true
    })

  }

  init(): void {
    
    super.init()

    //player 에 카메라 포커스 처리
    global.camera.focusCameraTo(this, true)

  }
  
  update(): void {
    
    //player 에 카메라 포커스 처리
    global.camera.focusCameraTo(this, true)
    
  }
  
  step(time: number){

    //기본 공격
    if(global.keyContext.MouseLeft){

      //공격 방향 정하기
      const delta = global.renderContext?this.x + global.renderContext.translatedX - global.keyContext.MouseX:0
      this.rotate = delta > 0?-1:1
      
      //공격 애니메이션
      if(this.status !== 'attack'){
        this.nextTime = -1
        this.tileNo = 21
        this.status = 'attack'
      }

      if(this.nextTime === -1){
        this.nextTime = 0
        this.tileNo = 21
        this.nextTime += time
      }else if(this.nextTime > 50){
        this.nextTime = 0
        this.tileNo = this.tileNo===21?22:21
      }else{
        this.nextTime += time
      }

    }else
    //플레이어 이동
    if(global.keyContext.KeyA || global.keyContext.KeyD || global.keyContext.KeyW || global.keyContext.KeyS){

      let nextDis = (time * 64) / 1000

      const orgX = this.x
      const orgY = this.y
      const orgPrevX = this.prevX
      const orgPrevY = this.prevY

      let moveX = this.x
      let moveY = this.y

      //x축 이동 체크
      if(global.keyContext.KeyA){
        moveX -= nextDis
        this.rotate = -1
      }else if(global.keyContext.KeyD){
        moveX += nextDis
        this.rotate = 1
      }
      this.setPosition(moveX)
      
      //충돌났으면
      if(this.collider?.checkCollisionList(context.objectContext.list)){
        //되돌리기
        this.setPosition(orgX)
        this.prevX = orgPrevX
      }

      //y축 이동 체크
      if(global.keyContext.KeyW){
        moveY -= nextDis
      }else if(global.keyContext.KeyS){
        moveY += nextDis
      }

      this.setPosition(undefined, moveY)

      //충돌났으면
      if(this.collider?.checkCollisionList(context.objectContext.list)){
        //되돌리기
        this.setPosition(undefined, orgY)
        this.prevY = orgPrevY
      }

      if(this.status !== 'run'){
        this.nextTime = -1
        this.status = 'run'
      }

      //달리기
      if(this.nextTime === -1){
        this.tileNo = 11
        this.nextTime += time
      }else if(this.nextTime > 120){
        this.nextTime = 0
        this.tileNo += 1
        if(this.tileNo === 15){
          this.tileNo = 11
        }
      }else{
        this.nextTime += time
      }

    }else{

      this.setPosition(this.x, this.y)

      //베이스
      if(this.status !== 'init'){
        this.nextTime = -1
        this.tileNo = 1
        this.status = 'init'
      }

    }

    //player 에 카메라 포커스 처리
    global.camera.focusCameraTo(this)

  }

  draw(): void {
    
    if(!this.loaded) return

    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.rotate)

  }

  destroy(): void {
    super.destroy()
  }
  
}
