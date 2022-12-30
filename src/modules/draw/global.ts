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
}



class GlobalContext {
  renderContext?: GameRenderingContext
  keyContext: KeyContext = new KeyContext()
  width?: number
  height?: number
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

export default context