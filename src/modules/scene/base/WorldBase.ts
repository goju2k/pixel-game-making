export interface WorldBaseConfig {
  tileSize:number;
  numberOfTiles:[number, number];
}

export abstract class WorldBase {

  name:string = 'unnamed';

  // config
  tileSize:number = 0;

  numberOfTiles:[number, number] = [ 0, 0 ];

  // 크기
  width:number = 0;

  height:number = 0;

  widthHalf:number = 0;

  heightHalf:number = 0;
  
  constructor(config:WorldBaseConfig) {
    Object.assign(this, config);
    this.setSize(this.tileSize * this.numberOfTiles[0], this.tileSize * this.numberOfTiles[1]);
  }

  setSize(width?:number, height?:number) {
    if (width) {
      this.width = width;
      this.widthHalf = this.width / 2;
    }
    if (height) {
      this.height = height;
      this.heightHalf = this.height / 2;
    }
  }

  abstract init():this

  abstract step(time:number):void

  abstract draw():void

}