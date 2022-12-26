import { useCallback, useRef } from "react";
import { CanvasContextObject, DefaultGameView } from "../base/DefaultGameView";

interface GamePlayViewProps{

}
export function GamePlayView({}:GamePlayViewProps){

  const contextRef = useRef<CanvasRenderingContext2D|null>(null)

  const onContextChanged = useCallback(function({context, width, height}:CanvasContextObject){
    
    console.log('onContextChanged');
    contextRef.current = context

    context.fillStyle = 'lightgreen'
    context.clearRect(0, 0, width, height)
    context.fillRect(0, 0, width, height)

  }, [])
  
  return <DefaultGameView onContextChanged={onContextChanged}></DefaultGameView>
}