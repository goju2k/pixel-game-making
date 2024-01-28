import context from '../../../modules/draw/context/GlobalContext';
import { ObjectBase } from '../../../modules/object/base/ObjectBase';
import { SceneBase } from '../../../modules/scene/base/SceneBase';
import { Doltan } from '../objects/monster/Doltan';
import { Ghost } from '../objects/monster/Ghost';
import { Grass } from '../objects/monster/Grass';
import { Zag } from '../objects/monster/Zag';
import { Player } from '../objects/player/Player';

export class OpeningScene extends SceneBase {
  
  config:Record<string, boolean> = {
    initGen: true,
    gen: true,
    zag: true,
    grass: true,
    doltan: true,
    ghost: true,
  };

  player:Player = new Player();

  mosters:ObjectBase[] = [];

  timeTotal:number = 0;
  timeIterateCount:number = 0;
  
  init() {

    this.world.init();

    this.player.setPosition(this.world.widthHalf, this.world.heightHalf);
    this.player.init();

    this.config.initGen && this.generateMonster(1);
    
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
    this.config.gen && this.gameStep();

    // monsters
    for (let i = this.mosters.length - 1; i >= 0; i--) {
      if (this.mosters[i].life <= 0) {
        this.mosters[i].destroy();
        this.mosters.splice(i, 1);
      } else {
        this.mosters[i].step(time);
      }
    }

    // text
    for (let i = context.textContext.list.length - 1; i >= 0; i--) {
      if (context.textContext.list[i].end) {
        context.textContext.list[i].destroy();
        context.textContext.list.splice(i, 1);
      } else {
        context.textContext.list[i].step(time);
      }
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

    context.textContext.list.forEach((o) => {
      o.draw();
    });

  }

  private gameStep() {
    const timeUnit = Math.max(2000, 7000 - (500 * Math.floor(this.timeIterateCount / 5 + 1)));
    if (this.timeTotal > timeUnit) {
      this.timeIterateCount += 1;
      this.timeTotal = 0;
      
      const multiple = Math.floor(this.timeIterateCount / 2 + 1);
      this.generateMonster(Math.min(10, Math.floor(Math.random() * multiple)));
    }
  }

  private generateMonster(count:number) {

    const newMonsters:ObjectBase[] = [];
    let nextCount = 0;

    nextCount = Math.floor((Math.random() * count) + 1);
    this.config.doltan && newMonsters.push(...Array.from(Array(nextCount)).map(() => new Doltan({ x: 100, y: 100, width: 16, height: 16 })));

    nextCount = Math.floor((Math.random() * count) + 1);
    this.config.ghost && newMonsters.push(...Array.from(Array(nextCount)).map(() => new Ghost()));

    nextCount = Math.floor((Math.random() * count) + 1);
    this.config.zag && newMonsters.push(...Array.from(Array(nextCount)).map(() => new Zag()));

    nextCount = Math.floor((Math.random() * count) + 1);
    this.config.grass && newMonsters.push(...Array.from(Array(nextCount)).map(() => new Grass()));

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