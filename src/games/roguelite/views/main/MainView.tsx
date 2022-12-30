import { useCallback, useRef } from "react";
import { GamePlayView, GAME_CONTEXT_UPDATE_FUNCTION, GAME_DRAW_FUNCTION, GAME_DRAW_READY_FUNCTION } from "../../../../components/views/game/GamePlayView";
import { SceneBase } from "../../../../modules/scene/base/SceneBase";
import { OpeningScene } from "../../scenes/OpeningScene";
import { OpeningWorld } from "../../worlds/OpeningWorld";

export function MainView(){

  //scene 생성
  const sceneRef = useRef<SceneBase>(new OpeningScene({
    worlds:[new OpeningWorld()]
  }))

  //draw 준비되면 scene 초기화
  const onReady = useCallback<GAME_DRAW_READY_FUNCTION>(()=>{
    
    console.log('onReady', sceneRef.current.init());
    
  }, [])

  //draw 준비되면 scene 초기화
  const onContextUpdate = useCallback<GAME_CONTEXT_UPDATE_FUNCTION>(()=>{
    
    console.log('onContextUpdate', sceneRef.current.update());
    
  }, [])

  //draw 구성
  const gameDraw = useCallback<GAME_DRAW_FUNCTION>((time)=>{
    
    sceneRef.current.step(time)
    sceneRef.current.draw()

  }, [])

  return <GamePlayView onReady={onReady} onContextUpdate={onContextUpdate} gameDraw={gameDraw} gameViewProps={{
    gameWidth:480,
    gameHeight:270
  }} />
}
