import { SceneBase, SceneBaseConfig } from "../../../modules/scene/base/SceneBase";
import { Player } from "../objects/player/Player";

interface OpeningSceneConfig extends SceneBaseConfig {

}
export class OpeningScene extends SceneBase {
  
  player:Player = new Player({x:0, y:0, width:16, height:16})
  
  constructor(config:OpeningSceneConfig){

    super(config)

  }

  init(){

    this.world.init()

    this.player.setPosition(this.world.widthHalf, this.world.heightHalf)
    this.player.init()

    return this
  }

  update(){
    this.player.update()
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

  }

}
