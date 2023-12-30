import { SceneBase } from '../../../modules/scene/base/SceneBase';
import { Zag } from '../objects/monster/Zag';
import { Player } from '../objects/player/Player';

// interface OpeningSceneConfig extends SceneBaseConfig {

// }
export class OpeningScene extends SceneBase {
  
  player:Player = new Player({ x: 0, y: 0, width: 16, height: 16 });

  mosters:Zag[] = [ new Zag({ x: 100, y: 100, width: 16, height: 16 }) ];
  
  init() {

    this.world.init();

    this.player.setPosition(this.world.widthHalf, this.world.heightHalf);
    this.player.init();

    this.mosters.forEach((mon) => {
      mon.setPosition(this.world.widthHalf + 100, this.world.heightHalf + 100);
      mon.init();
    });

    return this;
  }

  update() {
    this.player.update();
  }
  
  step(time:number) {

    // world
    this.world.step(time);

    // player
    this.player.step(time);

    // monsters
    for (let i = 0; i < this.mosters.length; i++) {
      this.mosters[i].step(time);
    }

  }

  draw() {

    // world
    this.world.draw();

    // monsters
    for (let i = 0; i < this.mosters.length; i++) {
      this.mosters[i].draw();
    }

    // player
    this.player.draw();

  }

}