export interface WorldBaseConfig {
  tileSize:number
  numberOfTiles:[number,number]
}

export abstract class WorldBase {

  name:string = 'unnamed'
  tileSize:number = 0
  numberOfTiles:[number,number] = [0,0]
  
  constructor(config:WorldBaseConfig){
    Object.assign(this, config)
  }

  abstract init():this
  abstract step():void
  abstract draw():void

}
