import { ObjectBase } from '../../object/base/ObjectBase';

export class ObjectContext {

  list:ObjectBase[] = [];

  add(object:ObjectBase) {
    !this.list.includes(object) && this.list.push(object);
    // console.log('added object')
    
  }

  remove(object:ObjectBase) {
    this.list.splice(this.list.indexOf(object), 1);
    // console.log('remove object')
  }

}