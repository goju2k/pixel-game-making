import { Sprite } from '../../../../modules/draw/image/Sprite';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';

interface TileObjectConfig extends ObjectBaseConfig {
  sprite:Sprite;
  tileNo:number;
  
}

export class TileObject extends ObjectBase {
  
  sprite!:Sprite;

  tileNo:number = 1;

  constructor(config:TileObjectConfig) {
    super(config);
    this.sprite = config.sprite;
    this.tileNo = config.tileNo;
  }

  init(): void {
    super.init();
  }

  update(): void {
    
  }

  step(): void {
    
  }

  draw(): void {
    this.sprite.drawNo(this.x, this.y, this.tileNo);
  }

  destroy(): void {
    super.destroy();
  }
  
}