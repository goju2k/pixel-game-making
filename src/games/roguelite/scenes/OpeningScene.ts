import { ObjectBase } from '../../../modules/object/base/ObjectBase';
import { SceneBase } from '../../../modules/scene/base/SceneBase';
import { Doltan } from '../objects/monster/Doltan';
import { Ghost } from '../objects/monster/Ghost';
import { Zag } from '../objects/monster/Zag';
import { Player } from '../objects/player/Player';

// interface OpeningSceneConfig extends SceneBaseConfig {

// }
export class OpeningScene extends SceneBase {
  
  player:Player = new Player({ x: 0, y: 0, width: 16, height: 16 });

  // mosters:Zag[] = [ new Zag({ x: 100, y: 100, width: 16, height: 16 }) ];
  mosters:ObjectBase[] = [];

  timeTotal:number = 0;
  
  init() {

    this.world.init();

    this.player.setPosition(this.world.widthHalf, this.world.heightHalf);
    this.player.init();

    this.generateMonster(1);
    
    return this;
  }

  update() {
    this.player.update();
  }
  
  step(time:number) {

    this.timeTotal += time;

    // world
    this.world.step(time);

    // player
    this.player.step(time);

    // game 진행
    this.gameStep();

    // monsters
    for (let i = 0; i < this.mosters.length; i++) {
      this.mosters[i].step(time);
    }

  }

  draw() {

    // world
    this.world.draw();

    // player
    this.player.draw();

    // monsters
    for (let i = 0; i < this.mosters.length; i++) {
      this.mosters[i].draw();
    }

  }

  private gameStep() {
    if (this.timeTotal > 7000) {
      this.timeTotal = 0;
      this.generateMonster(Math.floor(Math.random() * 1));
    }
  }

  private generateMonster(count:number) {

    const newMonsters:ObjectBase[] = [];
    let nextCount = 0;

    nextCount = Math.floor((Math.random() * count) + 1);
    newMonsters.push(...Array.from(Array(nextCount)).map(() => new Doltan({ x: 100, y: 100, width: 16, height: 16 })));

    nextCount = Math.floor((Math.random() * count) + 1);
    newMonsters.push(...Array.from(Array(nextCount)).map(() => new Ghost({ x: 100, y: 100, width: 16, height: 16 })));

    nextCount = Math.floor((Math.random() * count) + 1);
    newMonsters.push(...Array.from(Array(nextCount)).map(() => new Zag({ x: 100, y: 100, width: 16, height: 16 })));

    newMonsters.forEach((mon) => {
      mon.setPosition(
        this.world.widthHalf - this.world.widthHalf + Math.random() * this.world.widthHalf * 2,
        this.world.heightHalf - this.world.heightHalf + Math.random() * this.world.heightHalf * 2,
      );
      mon.init();
    });

    this.mosters.push(...newMonsters);

  }

}