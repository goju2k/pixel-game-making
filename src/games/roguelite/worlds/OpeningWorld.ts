import { Sprite } from "../../../modules/draw/image/Sprite"
import { ObjectBase, ObjectBaseConfig } from "../../../modules/object/base/ObjectBase"
import { WorldBase } from "../../../modules/scene/base/WorldBase"

class TileInfo {
  x:number
  y:number
  tileNo:number
  rotate:1|-1
  constructor(x:number, y:number, tileNo:number, rotate:1|-1=1){
    this.x = x
    this.y = y
    this.tileNo = tileNo
    this.rotate = rotate
  }
}

export class OpeningWorld extends WorldBase {

  loaded:boolean=false
  sprite!:Sprite

  layer1:TileInfo[][] = []
  layer2:MapWallTile[] = []

  constructor(){

    //월드 크기 설정
    super({
      numberOfTiles:[30, 30],
      tileSize:16
    })

    console.log('world size', this.width, this.height);
    
  }

  init(){

    //sprite load
    this.sprite = new Sprite('map/tiles.png', 16, 16)
    Promise.all([this.sprite.load()]).then(()=>{
      this.loaded = true
    })
    
    //map base
    for(let i = 0 ; i < this.numberOfTiles[1] ; i++){
      this.layer1.push([])
      for(let k = 0 ; k < this.numberOfTiles[0] ; k++){
        this.layer1[i][k] = new TileInfo(i * this.tileSize, k * this.tileSize, 1)
      }
    }

    //map object : random
    // let layer2Temp:TileInfo[]
    // for(let i = 0 ; i < this.numberOfTiles[1] ; i++){

    //   if(Math.random() < 0.5){
    //     layer2Temp = []
    //     this.layer2.push(layer2Temp)
    //   }else{
    //     continue
    //   }

    //   for(let k = 0 ; k < this.numberOfTiles[0] ; k++){
    //     Math.random() < 0.025 && layer2Temp.push(new TileInfo(i * this.tileSize, k * this.tileSize, 11))
    //   }
    // }

    //map object : rect
    //세로
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx)=>{
      this.layer2.push(new MapWallTile(this.sprite, 0 * this.tileSize, idx * this.tileSize))
    })
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx)=>{
      this.layer2.push(new MapWallTile(this.sprite, (this.numberOfTiles[0] - 1) * this.tileSize, idx * this.tileSize))
    })
    //가로
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx)=>{
      this.layer2.push(new MapWallTile(this.sprite, idx * this.tileSize, 0 * this.tileSize))
    })
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx)=>{
      this.layer2.push(new MapWallTile(this.sprite, idx * this.tileSize, (this.numberOfTiles[1] - 1) * this.tileSize))
    })
    
    return this
  }

  step(time:number){
    
  }
  
  draw(){
    
    if(!this.loaded) return

    for(let i = 0 ; i < this.layer1.length ; i++){
      for(let k = 0 ; k < this.layer1[i].length ; k++){
        this.sprite.drawNo(this.layer1[i][k].x, this.layer1[i][k].y, this.layer1[i][k].tileNo)
      }
    }

    for(let i = 0 ; i < this.layer2.length ; i++){
      this.layer2[i].draw()
    }

  }
  
}

class MapWallTile {
  tile!:TileObject
  constructor(sprite:Sprite, x:number, y:number){
    this.tile = new TileObject({
      x, y, sprite, width:sprite.frameWidth, height:sprite.frameHeight, anchorType:"TopLeft",
      tileNo:11, //11번 타일
      colliderConfig:{} //충돌범위 최대
    })
  }
  draw(){
    this.tile.draw()
  }
}

interface TileObjectConfig extends ObjectBaseConfig {
  sprite:Sprite
  tileNo:number
  
}

export class TileObject extends ObjectBase {
  
  sprite!:Sprite
  tileNo:number = 1

  constructor(config:TileObjectConfig){
    super(config)
    this.sprite = config.sprite
    this.tileNo = config.tileNo
  }

  init(): void {
    super.init()
  }
  update(): void {
    
  }
  step(time: number): void {
    
  }
  draw(): void {
    this.sprite.drawNo(this.x, this.y, this.tileNo)
  }
  destroy(): void {
    super.destroy()
  }
  
}
