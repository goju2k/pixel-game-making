import { TextBase } from '../../../games/roguelite/objects/text/TextBase';

export class TextContext {

  list:TextBase[] = [];

  add(object:TextBase) {
    !this.list.includes(object) && this.list.push(object);
    // console.log('added object')
    
  }

  remove(object:TextBase) {
    this.list.splice(this.list.indexOf(object), 1);
    // console.log('remove object')
  }

}