import { MapWallTile } from './tile/dto/MapWallTile';
import { TileInfo } from './tile/dto/TileInfo';

import { Sprite } from '../../../modules/draw/image/Sprite';
import { WorldBase } from '../../../modules/scene/base/WorldBase';

export class OpeningWorld extends WorldBase {

  loaded:boolean = false;

  sprite!:Sprite;

  layer1:TileInfo[][] = [];

  layer2:MapWallTile[] = [];

  constructor() {

    // 월드 크기 설정
    super({
      numberOfTiles: [ 64, 64 ],
      tileSize: 16,
    });

    console.log('world size', this.width, this.height);
    
  }

  init() {

    // sprite load
    this.sprite = new Sprite('map/tiles.png', 16, 16);
    Promise.all([ this.sprite.load() ]).then(() => {
      this.loaded = true;
    });
    
    // map base
    for (let i = 0; i < this.numberOfTiles[1]; i++) {
      this.layer1.push([]);
      for (let k = 0; k < this.numberOfTiles[0]; k++) {
        this.layer1[i][k] = new TileInfo(i * this.tileSize, k * this.tileSize, 1);
      }
    }

    // map object : random
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

    // map object : rect
    // 세로
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx) => {
      this.layer2.push(new MapWallTile(this.sprite, 0 * this.tileSize, idx * this.tileSize));
    });
    Array.from(Array(this.numberOfTiles[1])).forEach((_val, idx) => {
      this.layer2.push(new MapWallTile(this.sprite, (this.numberOfTiles[0] - 1) * this.tileSize, idx * this.tileSize));
    });
    // 가로
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx) => {
      this.layer2.push(new MapWallTile(this.sprite, idx * this.tileSize, 0 * this.tileSize));
    });
    Array.from(Array(this.numberOfTiles[0])).forEach((_val, idx) => {
      this.layer2.push(new MapWallTile(this.sprite, idx * this.tileSize, (this.numberOfTiles[1] - 1) * this.tileSize));
    });
    
    return this;
  }

  step() {
    
  }
  
  draw() {
    
    if (!this.loaded) return;

    for (let i = 0; i < this.layer1.length; i++) {
      for (let k = 0; k < this.layer1[i].length; k++) {
        this.sprite.drawNo(this.layer1[i][k].x, this.layer1[i][k].y, this.layer1[i][k].tileNo);
      }
    }

    for (let i = 0; i < this.layer2.length; i++) {
      this.layer2[i].draw();
    }

  }
  
}