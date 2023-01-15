import { useCallback, useEffect, useState } from "react";
import { GameManager } from "../../components/manager/game/GameManager";
import { LogoView } from "./views/logo/LogoView";
import { MainView } from "./views/main/MainView";
import './RogueLiteGame.scss'

export function RogueLiteGame(){

  const [currViewIdx, setCurrViewIdx] = useState(0)
  useEffect(()=>{
    
  }, [])

  //로고 재생 끝나면 메인화면으로 전환
  const onLogoEnds = useCallback(()=>{
    setTimeout(()=>{
      setCurrViewIdx(1)
    },1500)
  },[])

  return <>
    <GameManager currViewIdx={currViewIdx} views={[
      //게임 로고
      <LogoView key='logo-view' onEnd={onLogoEnds} />,
      //게임 메인
      <MainView key='main-view' />,
    ]}/>
  </>
}
