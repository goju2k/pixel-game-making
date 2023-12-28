import { Sprite } from '../../../../../modules/draw/image/Sprite';
import { TileObject } from '../TileObject';

export class MapWallTile {
  tile!:TileObject;

  constructor(sprite:Sprite, x:number, y:number) {
    this.tile = new TileObject({
      x,
      y,
      sprite,
      width: sprite.frameWidth,
      height: sprite.frameHeight,
      anchorType: 'TopLeft',
      tileNo: 11, // 11번 타일
      colliderConfig: {}, // 충돌범위 최대
    });
  }

  draw() {
    this.tile.draw();
  }
}