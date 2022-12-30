import { Sprite } from "../../../modules/draw/image/Sprite"
import { WorldBase } from "../../../modules/scene/base/WorldBase"

class TileInfo {
  x:number
  y:number
  tileNo:number
  rotate:1|-1
  nextTime:number = 0
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
  layer2:TileInfo[][] = []

  constructor(){

    //월드 크기 설정
    super({
      numberOfTiles:[15, 15],
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
    let layer2Temp:TileInfo[] = []
    this.layer2.push(layer2Temp)

    //세로
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx)=>{
      layer2Temp.push(new TileInfo(0 * this.tileSize, idx * this.tileSize, 11))
    })
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx)=>{
      layer2Temp.push(new TileInfo((this.numberOfTiles[0] - 1) * this.tileSize, idx * this.tileSize, 11))
    })
    //가로
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx)=>{
      layer2Temp.push(new TileInfo(idx * this.tileSize, 0 * this.tileSize, 11))
    })
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx)=>{
      layer2Temp.push(new TileInfo(idx * this.tileSize, (this.numberOfTiles[1] - 1) * this.tileSize, 11))
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
      for(let k = 0 ; k < this.layer2[i].length ; k++){
        this.sprite.drawNo(this.layer2[i][k].x, this.layer2[i][k].y, this.layer2[i][k].tileNo)
      }
    }

  }
  
}
