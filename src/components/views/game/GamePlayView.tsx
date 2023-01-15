import React, { useCallback, useEffect, useRef } from "react";
import { DRAW_FUNCTION, GameLoopModule } from "../../../modules/gameloop/loop";
import { CanvasContextObject, DefaultGameView, GameViewProps } from "../base/DefaultGameView";
import global from '../../../modules/draw/global'
import { createRenderingContext } from "../../../modules/draw/apis";

export type GAME_DRAW_READY_FUNCTION = ()=>void
export type GAME_CONTEXT_UPDATE_FUNCTION = ()=>void
export type GAME_DRAW_FUNCTION = (delta:number)=>void

export interface GamePlayViewProps {
  onReady?:GAME_DRAW_READY_FUNCTION
  onContextUpdate?:GAME_CONTEXT_UPDATE_FUNCTION
  gameDraw?:GAME_DRAW_FUNCTION
  gameViewProps?:GameViewProps
}

export function GamePlayView({
  onReady,       //Draw Ready
  onContextUpdate, //Context Update
  gameDraw,      //Game Draw
  gameViewProps = {}, //Game View Props
  children,      //UI elements
}:React.PropsWithChildren<GamePlayViewProps>){

  //ready
  const ready = useRef<boolean>(false)

  //context changed callback
  const onContextChanged = useCallback(function(contextObject:CanvasContextObject){
    
    console.log('onContextChanged', contextObject)

    //global renderContext 생성/업데이트
    if(!global.renderContext){
      global.renderContext = createRenderingContext(contextObject.renderContext)
      global.renderContext.setScale(contextObject.scale)
      global.renderContext.setMobile(contextObject.isMobile)
    }else{
      global.renderContext.setScale(contextObject.scale)
      global.renderContext.canvasResized()
      global.camera.init()
    }
    
    global.width = contextObject.scaledWidth
    global.height = contextObject.scaledHeight

    if(!ready.current){
      ready.current = true
      onReady && onReady()
    }else{
      onContextUpdate && onContextUpdate()
    }
    
  }, [])

  //view draw
  const draw = useCallback<DRAW_FUNCTION>((time)=>{
    global.renderContext?.clear2d()
    gameDraw && gameDraw(time)
  }, [])

  //게임 루프
  const loopRef = useRef<GameLoopModule>(new GameLoopModule({draw:gameDraw?draw:undefined}))

  useEffect(()=>{
    if(gameDraw){
      loopRef.current.start() //start
      console.log('GamePlayView loop start')
    }
    return ()=>{
      loopRef.current.stop()
    }
  }, [])
  
  
  return <>
    <div style={{position:'absolute', zIndex:1, width:'100%', height:'100%'}} onContextMenu={(e)=>{
      e.preventDefault()
    }}>
      {children}
    </div>
    {gameDraw && <DefaultGameView {...gameViewProps} onContextChanged={onContextChanged}></DefaultGameView>}
  </>
}
