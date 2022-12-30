
interface GameManagerProps{
  currViewIdx?:number
  views:React.ReactElement<any>[]
}

export function GameManager({views, currViewIdx = 0}:GameManagerProps){

  return <>
    {views.map((view, idx)=>{
      return <div key={`view-${idx}`} style={{display:idx===currViewIdx?'':'none'}}>
        {view}
      </div>
    })}
  </>
}
