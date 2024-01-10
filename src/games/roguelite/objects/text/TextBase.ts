import context from '../../../../modules/draw/context/GlobalContext';
import { ObjectBase, ObjectBaseConfig } from '../../../../modules/object/base/ObjectBase';
import { ActionMove, ActionMoveStatus } from '../../actions/ActionMove';

export interface TextBaseConfig extends Omit<ObjectBaseConfig, 'width'|'height'> {
  width?:number;
  height?:number;
  text:string;
  color:string;
  size:string;
}

export enum ParticleStatus {
  MOVING=0,
  HIT=1,
  END=2,
}

export class TextBase extends ObjectBase {

  // text
  text:string = '';
  color:string = 'white';
  size:string = '16px';

  speed: number = 50;

  // 종료 여부
  end:boolean = false;

  // 이동 액션 클래스
  actionMove;
  
  constructor(config:TextBaseConfig) {
    
    const { width = 1, height = 1, text, color, size } = config;
    
    super({ ...config, width, height });

    this.text = text;
    this.color = color;
    this.size = size;

    // action 생성 및 목표 설정
    this.actionMove = new ActionMove({ targetObject: this });
    this.actionMove.setMoveTarget(this.x, this.y - 15);

  }

  step(time: number): void {
    
    // 다음 action 계산
    this.actionMove.next(time);

    // 종료여부 체크
    this.end = this.actionMove.status === ActionMoveStatus.IDLE;

  }

  draw(): void {

    context.renderContext?.fillText2d(this.drawX, this.drawY, this.text, this.color, `${this.size} system-ui`);
    
    // for object debug
    super.draw();

  }

}