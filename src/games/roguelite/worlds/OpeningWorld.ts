import { Sprite } from "../../../modules/draw/image/Sprite"
import { WorldBase } from "../../../modules/scene/base/WorldBase"

export class OpeningWorld extends WorldBase {

  sprite!:Sprite
  init(){
    this.sprite = new Sprite('test.png')
    this.sprite.load()
    return this
  }
  step(){
    
  }
  draw(){
    this.sprite.draw(0, 0, 0, 0)
  }
}
