import { WorldBase } from "./WorldBase";

interface SceneBaseConfig {
  worlds:WorldBase[]
}

export abstract class SceneBase {

  name:string = 'unnamed'
  worlds:WorldBase[] = []
  protected world!:WorldBase
  constructor(config:SceneBaseConfig){
    
    Object.assign(this, config)

    //첫번째 월드로 셋팅
    if(this.worlds && this.worlds.length > 0){
      this.world = this.worlds[0]
    }

  }

  abstract init():this
  abstract step():void
  abstract draw():void
  
}
