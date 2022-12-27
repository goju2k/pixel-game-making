import { useEffect, useRef } from "react"
import { GamePlayView } from "../../../components/views/game/GamePlayView"

export function LogoView({onEnd}:{onEnd?:()=>void}){

  const logoRef = useRef<SVGTextElement|null>(null)
  useEffect(()=>{
    
    if(logoRef.current){
      logoRef.current.addEventListener('animationend', ()=>{
        setTimeout(()=>{
          logoRef.current?.classList.add('ani-text-fadein')
          logoRef.current?.addEventListener('animationend', ()=>{
            setTimeout(()=>{
              logoRef.current?.classList.add('ani-fadeout')
              logoRef.current?.addEventListener('animationend', ()=>{
                onEnd && onEnd()
              }, {once:true})
            }, 1500)
          }, {once:true})
        }, 1000)
      },{once:true})
    }

  }, [])

  return <GamePlayView>
    <div style={{width:'100%', height:'100%', background:'white'}}>

      <svg  width='100%' height='100%'>
        <text ref={logoRef} className="ani-text-writing" textAnchor="middle" x="50%" y="50%" fill="blue" fontSize='80px' fontWeight='700'>
          N.A. STUDIO
        </text>
      </svg>

    </div>
  </GamePlayView>
}