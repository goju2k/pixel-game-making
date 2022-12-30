import { Camera, CAMERA_MODE } from "../../../modules/camera/Camera";
import { SceneBase, SceneBaseConfig } from "../../../modules/scene/base/SceneBase";
import { Player } from "../objects/player/Player";

interface OpeningSceneConfig extends SceneBaseConfig {

}
export class OpeningScene extends SceneBase {
  
  player:Player = new Player({x:this.world.widthHalf, y:this.world.heightHalf, width:16, height:16})
  camera:Camera

  constructor(config:OpeningSceneConfig){

    super(config)

    this.camera = new Camera({
      mode:CAMERA_MODE.FOLLOW,
      targetObject:this.player
    })
  
  }

  init(){
    return this
  }

  step(time:number){

    //world
    this.world.step(time)

    //player
    this.player.step(time)

  }

  draw(){

    //world
    this.world.draw()

    //player
    this.player.draw()

    //camera
    this.camera.followCamera()

  }

}
