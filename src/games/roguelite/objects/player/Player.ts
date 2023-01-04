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

  particles:Particle[]=[]

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
        
      }else if(this.nextTime > 40){
        this.nextTime = 0

        if(this.tileNo===21){

          //총알 쏘자
          this.particles.push(new Particle({
            x:this.x,
            y:this.y,
            targetX:global.renderContext?global.keyContext.MouseX - global.renderContext.translatedX:0,
            targetY:global.renderContext?global.keyContext.MouseY - global.renderContext.translatedY:0,
            velocity:1,
            width:2,
            height:2,
          }))

        }

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

    for(let i = this.particles.length - 1 ; i >= 0 ; i--){
      if(this.particles[i].end){
        this.particles.splice(i, 1)
      }else{
        this.particles[i].step(time)  
      }
    }
    
    //player 에 카메라 포커스 처리
    global.camera.focusCameraTo(this)

  }

  draw(): void {
    
    if(!this.loaded) return

    this.sprite.drawNo(this.drawX, this.drawY, this.tileNo, this.rotate)

    this.particles.forEach((p)=>{
      p.draw()
    })

  }

  destroy(): void {
    super.destroy()
  }
  
}

interface ParticleConfig extends ObjectBaseConfig{
  targetX:number
  targetY:number
  velocity?:number // pixel / ms
}
export class Particle extends ObjectBase {

  ratio:number = 0
  velocity:number = 0.05
  
  targetDis:number = 0
  
  targetX:number = 0
  targetY:number = 0

  end:boolean = false

  constructor(config:ParticleConfig){
    
    super({...config})

    this.x = this.x + (config.x - config.targetX > 0?-6:6)
    this.y = this.y - 8
    
    const deltaX = this.x - config.targetX
    const deltaY = this.y - config.targetY

    //타겟을 화면 바깥으로 설정
    this.targetX = config.targetX + (240 * (deltaX > 0?-1:1))
    this.targetY = config.targetY + (240 * (deltaX > 0?-1:1) * (deltaY / deltaX))

    this.targetDis = Math.sqrt(Math.pow(Math.abs(config.x - this.targetX), 2) + Math.pow(Math.abs(config.y - this.targetY), 2))

  }

  step(time: number): void {
    
    const dis = time * this.velocity
    this.ratio = dis / this.targetDis

    this.setPosition(this.x + ((this.targetX - this.x) * this.ratio), this.y + ((this.targetY - this.y) * this.ratio))

    this.targetDis -= dis
    
    this.end = this.targetDis < 0

  }

  draw(): void {
    // ((global.renderContext?.ctx) as CanvasRenderingContext2D)
    global.renderContext?.fillRect2d(this.x, this.y, 1, 1, 'lightblue')
  }

}
