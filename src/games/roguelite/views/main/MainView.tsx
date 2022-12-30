import { useCallback, useRef } from "react";
import { GamePlayView, GAME_DRAW_FUNCTION } from "../../../../components/views/game/GamePlayView";
import { SceneBase } from "../../../../modules/scene/base/SceneBase";
import { OpeningScene } from "../../scenes/OpeningScene";
import { OpeningWorld } from "../../worlds/OpeningWorld";

export function MainView(){

  //scene 생성
  const sceneRef = useRef<SceneBase>(new OpeningScene({
    worlds:[new OpeningWorld().init()]
  }).init())

  //draw 구성
  const gameDraw = useCallback<GAME_DRAW_FUNCTION>((time)=>{
    
    sceneRef.current.step(time)
    sceneRef.current.draw()

  }, [])

  return <GamePlayView gameDraw={gameDraw} gameViewProps={{
    gameWidth:480,
    gameHeight:270
  }} />
}
