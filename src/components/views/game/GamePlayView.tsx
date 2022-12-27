import { useCallback, useRef } from "react";
import { CanvasContextObject, DefaultGameView, GameViewProps } from "../base/DefaultGameView";

export interface GamePlayViewProps extends GameViewProps{

}

export function GamePlayView({children, ...props}:React.PropsWithChildren<GamePlayViewProps>){

  const contextRef = useRef<CanvasRenderingContext2D|null>(null)

  const onContextChanged = useCallback(function({context, width, height}:CanvasContextObject){
    
    console.log('onContextChanged')
    contextRef.current = context

    context.fillStyle = 'lightgreen'
    context.clearRect(0, 0, width, height)
    context.fillRect(0, 0, width, height)

  }, [])
  
  return <>
    <div style={{position:'absolute', zIndex:1, width:'100%', height:'100%'}}>
      {children}
    </div>
    <DefaultGameView {...props} onContextChanged={onContextChanged}></DefaultGameView>
  </>
}