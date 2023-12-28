import context from '../draw/context/GlobalContext';
import { ObjectBase } from '../object/base/ObjectBase';
import { WorldBase } from '../scene/base/WorldBase';

export enum CAMERA_MODE {
  FOLLOW='follow',
  FIXED='fixed'
}

// type CAMERA_MODE = keyof CAMERA_MODE
export interface CameraConfig {
  x?:number;
  y?:number;
  mode?:CAMERA_MODE;
  targetObject?:ObjectBase;
}

export class Camera {
  
  x:number = 0;

  y:number = 0;
  
  mode:CAMERA_MODE = CAMERA_MODE.FIXED;

  targetWorld?:WorldBase;

  targetObject?:ObjectBase;

  config:CameraConfig;

  constructor(config:CameraConfig) {
    this.config = config;
  }

  init() {
    this.x = 0;
    this.y = 0;
  }

  focusCameraTo(targetObject:ObjectBase, forceUpdate?:boolean) {

    if (!context.renderContext || !context.width || !context.height) return;

    if (!forceUpdate && targetObject.prevX === targetObject.x && targetObject.prevY === targetObject.y) return;
    
    const deltaX = ((context.width / 2) - targetObject.x);
    const deltaY = ((context.height / 2) - targetObject.y);
    
    if (this.x === deltaX && this.y === deltaY) {
      return;
    }
    
    // console.log(this.x , deltaX , this.y , deltaY)

    const tx = deltaX - this.x; 
    const ty = deltaY - this.y;
    
    this.x = deltaX;
    this.y = deltaY;

    context.renderContext.translate2d(tx, ty);
    
  }

}