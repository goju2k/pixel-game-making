interface GameManagerProps{
  currViewIdx?:number;
  views:React.ReactNode[];
}

export function GameManager({ views, currViewIdx = 0 }:GameManagerProps) {

  return (
    <>
      {views.map((view, idx) => (
        <div key={`view-${idx}`} style={{ display: idx === currViewIdx ? '' : 'none' }}>
          {view}
        </div>
      ))}
    </>
  );
}