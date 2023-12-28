/* eslint-disable @typescript-eslint/ban-ts-comment */

import { KeyContext } from './KeyContext';
import { ObjectContext } from './ObjectContext';

import { Camera } from '../../camera/Camera';
import { GameRenderingContext } from '../apis';

class GlobalContext {
  
  renderContext?: GameRenderingContext;

  keyContext: KeyContext = new KeyContext();

  objectContext: ObjectContext = new ObjectContext();

  width?: number;

  height?: number;

  camera: Camera = new Camera({});
}

const context = new GlobalContext();

window.addEventListener('keydown', (e) => {
  if (e.code in context.keyContext) {
    // @ts-ignore
    context.keyContext[e.code] = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code in context.keyContext) {
    // @ts-ignore
    context.keyContext[e.code] = false;
  }
});

window.addEventListener('mousemove', (e) => {
  context.keyContext.MouseX = e.offsetX / (context.renderContext ? context.renderContext.getScale() : 1);
  context.keyContext.MouseY = e.offsetY / (context.renderContext ? context.renderContext.getScale() : 1);
});

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    context.keyContext.MouseLeft = true;
  } else if (e.button === 2) {
    context.keyContext.MouseRight = true;
  }
});
window.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    context.keyContext.MouseLeft = false;
  } else if (e.button === 2) {
    context.keyContext.MouseRight = false;
  }
});

window.addEventListener('blur', () => {
  context.keyContext.clearAll();
});

// for Mobile
window.addEventListener('touchstart', (e) => {
  console.log('touchstart', e);
  e.touches.length === 1 ? context.keyContext.MouseLeft = true : context.keyContext.MouseRight = true;
});
window.addEventListener('touchmove', (e) => {
  e.preventDefault();
  context.keyContext.MouseX = e.touches[e.touches.length - 1].clientX / (context.renderContext ? context.renderContext.getScale() : 1);
  context.keyContext.MouseY = e.touches[e.touches.length - 1].clientY / (context.renderContext ? context.renderContext.getScale() : 1);
});
window.addEventListener('touchend', () => {
  context.keyContext.MouseLeft = false;
  context.keyContext.MouseRight = false;
});

export default context;