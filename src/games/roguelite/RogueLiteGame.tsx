import { useCallback, useEffect, useRef, useState } from "react";
import { GameManager } from "../../components/manager/game/GameManager";
import { GamePlayView } from "../../components/views/game/GamePlayView";
import './RogueLiteGame.scss'
import { LogoView } from "./views/LogoView";

export function RogueLiteGame(){

  const [currViewIdx, setCurrViewIdx] = useState(0)
  useEffect(()=>{
    
  }, [])

  const onLogoEnds = useCallback(()=>{
    setTimeout(()=>{
      setCurrViewIdx(1)
    },1500)
  },[])

  return <>
    <GameManager currViewIdx={currViewIdx} views={[
      <LogoView key='logo-view' onEnd={onLogoEnds} />,
      <GamePlayView key='main-view' />,
    ]}/>
  </>
}
