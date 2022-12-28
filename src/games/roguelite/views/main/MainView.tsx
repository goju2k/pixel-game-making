import { useCallback } from "react";
import { GamePlayView, GAME_DRAW_FUNCTION } from "../../../../components/views/game/GamePlayView";

export function MainView(){

  const gameDraw = useCallback<GAME_DRAW_FUNCTION>(({context, width, height}, time)=>{
    // console.log('gameDraw');
  }, [])

  return <GamePlayView gameDraw={gameDraw} />
}
