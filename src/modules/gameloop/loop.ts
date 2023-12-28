// 프레임 Draw 모드 (화면 주사율과 동기/비동기)
export type GAME_DRAW_MODE = 'sync'|'async'

// draw function
export type DRAW_FUNCTION = (delta:number)=>void

export interface GameLoopConfig {
  
  // 프레임레이트
  drawMode? : GAME_DRAW_MODE;
  drawFps? : number;

  // draw
  draw? : DRAW_FUNCTION;

  // debug
  debug? : boolean;

}

export class GameLoopModule {
  
  // config
  draw?:DRAW_FUNCTION;

  drawMode?:GAME_DRAW_MODE;

  drawFps?:number;

  debug?:boolean;

  // debugger
  debugger:number = 0;
  
  // fps value
  fps = 0;

  // draw loop variables
  private drawId:number|null = null;

  private drawFrame = 0;

  private fpsPrevTime = -1;

  private drawPrevTime = 0;

  private drawGap:number = 0;

  private drawGapTime:number = 0;

  private drawNextGapTime:number = 0;

  // constants (for loop)
  private readonly NUM_0 = 0;

  private readonly NUM_1 = 1;

  private readonly SEC_1 = 1000;

  constructor({ draw, drawMode = 'sync', drawFps = 999, debug = false }:GameLoopConfig) {
    this.setConfig({ draw, drawMode, drawFps, debug });
  }

  setConfig({ draw, drawMode, drawFps, debug }:GameLoopConfig) {
    draw && (this.draw = draw);
    drawMode && (this.drawMode = drawMode);
    drawFps && (this.drawFps = drawFps);
    debug && (this.debug = debug);
    this.drawGap = this.calcDrawGap();
  }

  calcDrawGap() {
    return this.drawMode === 'async' && this.drawFps && this.drawFps > 0
      ? Number(Number(1000 / this.drawFps).toFixed(0))
      : 0;
  }

  start() {
    if (!this.drawId) {
      this.drawId = window.requestAnimationFrame(this.loop.bind(this));
    }
    this.debug && (this.debugger = window.setInterval(() => {
      console.log('fps:', this.fps);
    }, 1000));
  }

  stop() {
    
    if (this.drawId) {

      // next draw cancel
      window.cancelAnimationFrame(this.drawId);
      this.drawId = null;

      // fps 측정 관련 초기화
      this.drawFrame = 0;
      this.fpsPrevTime = -1;
      this.fps = 0;

      // draw 관련 초기화
      this.drawPrevTime = -1;

    }

    window.clearInterval(this.debugger);

  }

  private loop(time:number) {

    // request
    this.drawId = window.requestAnimationFrame(this.loop.bind(this));

    // frame 체크
    if (!this.frameCheck(time)) {
      return;
    }

    // draw
    this.draw && this.draw(this.drawNextGapTime);

    // FPS 처리
    this.calcFps(time);

  }

  frameCheck(currTime:number) {

    if (this.drawMode === 'async' && this.drawGap === null) {
      return false;
    }

    if (this.drawPrevTime < this.NUM_0) {
      this.drawPrevTime = currTime;
      return false;
    }

    this.drawGapTime += (currTime - this.drawPrevTime);
    
    this.drawNextGapTime = this.drawGapTime;
    
    this.drawPrevTime = currTime;

    // fps 체크
    if (this.drawMode === 'async' && this.drawGap > this.drawGapTime) {
        
      return false;

    }
    this.drawGapTime = this.NUM_0;
    if (this.drawMode === 'async') {
      if (this.drawGapTime - this.drawGap > this.drawGap) {
        this.drawGapTime = this.drawGap;
      } else {
        this.drawGapTime -= this.drawGap;
      }
    }
    
    return true;

  }

  calcFps(currTime:number) {

    // 디버그일때만 처리
    if (!this.debug) {
      return;
    }

    if (this.fpsPrevTime < this.NUM_0) {
      this.fpsPrevTime = currTime;
      return;
    }

    const delta = currTime - this.fpsPrevTime;
    
    if (delta >= this.SEC_1) {
        
      this.fps = this.drawFrame;

      this.fpsPrevTime = currTime + delta - this.SEC_1;
      this.drawFrame = this.NUM_0;

    } else {
      this.drawFrame += this.NUM_1;
    }

  }

}