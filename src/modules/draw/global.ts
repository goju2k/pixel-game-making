import { Camera } from "../camera/Camera";
import { ObjectBase } from "../object/base/ObjectBase";
import { GameRenderingContext } from "./apis";

class KeyContext {
  //방향키
  ArrowUp:boolean=false;ArrowDown:boolean=false;ArrowRight:boolean=false;ArrowLeft:boolean=false;
  //숫자
  'Digit0':boolean=false;'Digit1':boolean=false;'Digit2':boolean=false;'Digit3':boolean=false;'Digit4':boolean=false;'Digit5':boolean=false;'Digit6':boolean=false;'Digit7':boolean=false;'Digit8':boolean=false;'Digit9':boolean=false;
  //알파벳
  'KeyA':boolean=false;'KeyB':boolean=false;'KeyC':boolean=false;'KeyD':boolean=false;'KeyE':boolean=false;'KeyF':boolean=false;'KeyG':boolean=false;'KeyH':boolean=false;'KeyI':boolean=false;'KeyJ':boolean=false;'KeyK':boolean=false;'KeyL':boolean=false;'KeyM':boolean=false;'KeyN':boolean=false;'KeyO':boolean=false;'KeyP':boolean=false;'KeyQ':boolean=false;'KeyR':boolean=false;'KeyS':boolean=false;'KeyT':boolean=false;'KeyU':boolean=false;'KeyV':boolean=false;'KeyW':boolean=false;'KeyX':boolean=false;'KeyY':boolean=false;'KeyZ':boolean=false;
  //F키
  'F1':boolean=false;'F2':boolean=false;'F3':boolean=false;'F4':boolean=false;'F5':boolean=false;'F6':boolean=false;'F7':boolean=false;'F8':boolean=false;'F9':boolean=false;'F10':boolean=false;'F11':boolean=false;'F12':boolean=false;
  //Numpad
  'Numpad0':boolean=false;'Numpad1':boolean=false;'Numpad2':boolean=false;'Numpad3':boolean=false;'Numpad4':boolean=false;'Numpad5':boolean=false;'Numpad6':boolean=false;'Numpad7':boolean=false;'Numpad8':boolean=false;'Numpad9':boolean=false;
  'NumpadDecimal':boolean=false;'NumpadEnter':boolean=false;'NumpadAdd':boolean=false;'NumpadSubtract':boolean=false;'NumpadMultiply':boolean=false;'NumpadDivide':boolean=false;
  //기능키
  'Enter':boolean=false;'Tab':boolean=false;'CapsLock':boolean=false;'ShiftLeft':boolean=false;'ControlLeft':boolean=false;'MetaLeft':boolean=false;'AltLeft':boolean=false;'Backquote':boolean=false;'Minus':boolean=false;
  'Equal':boolean=false;'Backspace':boolean=false;'Backslash':boolean=false;'Escape':boolean=false;'BracketLeft':boolean=false;'BracketRight':boolean=false;'Semicolon':boolean=false;'Quote':boolean=false;'Comma':boolean=false;
  'Period':boolean=false;'Slash':boolean=false;'AltRight':boolean=false;'ControlRight':boolean=false;'Insert':boolean=false;'Delete':boolean=false;'Home':boolean=false;'End':boolean=false;'PageUp':boolean=false;'PageDown':boolean=false;
  //마우스
  'MouseLeft':boolean=false;'MouseRight':boolean=false;
  MouseX:number=0;MouseY:number=0;
  
}

class ObjectContext {

  list:ObjectBase[]=[]
  add(object:ObjectBase){
    !this.list.includes(object) && this.list.push(object)
    // console.log('added object')
    
  }
  remove(object:ObjectBase){
    this.list.splice(this.list.indexOf(object), 1)
    // console.log('remove object')
  }

}

class GlobalContext {
  renderContext?: GameRenderingContext
  keyContext: KeyContext = new KeyContext()
  objectContext: ObjectContext = new ObjectContext()
  width?: number
  height?: number
  camera: Camera = new Camera({})
}

const context = new GlobalContext()

window.addEventListener('keydown', (e)=>{
  //@ts-ignore
  context.keyContext[e.code] = true
})

window.addEventListener('keyup', (e)=>{
  //@ts-ignore
  context.keyContext[e.code] = false
})

window.addEventListener('mousemove', (e)=>{
  context.keyContext.MouseX = e.offsetX / (context.renderContext?context.renderContext.getScale():1)
  context.keyContext.MouseY = e.offsetY / (context.renderContext?context.renderContext.getScale():1)
})

window.addEventListener('mousedown', (e)=>{
  if(e.button===0){
    context.keyContext.MouseLeft = true
  }else if(e.button===2){
    context.keyContext.MouseRight = true
  }
})

window.addEventListener('mouseup', (e)=>{
  e.preventDefault()
  if(e.button===0){
    context.keyContext.MouseLeft = false
  }else if(e.button===2){
    context.keyContext.MouseRight = false
  }
})

export default context