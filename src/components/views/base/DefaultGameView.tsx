import React, { useEffect, useRef, useState } from "react"

export interface CanvasContextObject{
  renderContext:CanvasRenderingContext2D
  width:number, height:number
  scaledWidth:number, scaledHeight:number
  scale:number
}

//컨텍스트 로드 이벤트 콜백
type CANVAS_CONTEXT_CHANGED_CALLBACK = (context:CanvasContextObject)=>void

//게임의 기본 view 를 구성하는 컴포넌트
export interface GameViewProps{

  //게임 디자인 해상도
  gameWidth? : number
  gameHeight? : number

  //display view 해상도
  displayWidth? : number
  displayHeight? : number

  //종횡비 고정 여부
  fixedRatio? : boolean

  //full screen 여부
  fullScreen? : boolean

  //이벤트
  onContextChanged? : CANVAS_CONTEXT_CHANGED_CALLBACK
  
  //디버그
  debug? : boolean

}

interface RatioSizeResult {
  width:number
  height:number
  widthBoxSize:number
  heightBoxSize:number
}

function getFixedRatioSize(gameWidth:number, gameHeight:number, displayWidth:number, displayHeight:number):RatioSizeResult{
  
  //비율 구하기
  let ratio = gameHeight / gameWidth
  let canvasWidth = displayWidth
  let canvasHeight = Math.round(displayWidth * ratio)
  let widthBoxSize = 0
  let heightBoxSize = Math.round((displayHeight - canvasHeight) / 2)
  if(displayHeight < canvasHeight){
    canvasHeight = displayHeight
    ratio = gameWidth / gameHeight
    canvasWidth = Math.round(canvasHeight * ratio)
    widthBoxSize = Math.round((displayWidth - canvasWidth) / 2)
    heightBoxSize = 0
  }

  return {
    width:canvasWidth,
    height:canvasHeight,
    widthBoxSize,
    heightBoxSize,
  }

}

export function DefaultGameView({
  gameWidth = 640,
  gameHeight = 360,
  displayWidth = gameWidth,
  displayHeight = gameHeight,
  fixedRatio = false,
  fullScreen = true,
  onContextChanged,
  debug = false
}:GameViewProps){

  //view element
  const gameViewRef = useRef<HTMLDivElement>(null)

  //canvas size
  const [canvasWidth, setCanvasWidth] = useState<number>(fullScreen?0:displayWidth)
  const [canvasHeight, setCanvasHeight] = useState<number>(fullScreen?0:displayHeight)
  const [canvasLetterBoxWidth, setCanvasLetterBoxWidth] = useState<number>(0)
  const [canvasLetterBoxHeight, setCanvasLetterBoxHeight] = useState<number>(0)

  //resize observer
  const resizeObserver = useRef<ResizeObserver>(new ResizeObserver((entries)=>{
    
    const resizeObject = entries[0]
    if(resizeObject && fullScreen){

      const elementWidth = resizeObject.contentRect.width
      const elementHeight = resizeObject.contentRect.height

      //고정 비율로 보여줄때
      if(fixedRatio){
        const {width, height, widthBoxSize, heightBoxSize} = getFixedRatioSize(gameWidth, gameHeight, elementWidth, elementHeight)
        setCanvasWidth(width)
        setCanvasHeight(height)
        setCanvasLetterBoxWidth(widthBoxSize)
        setCanvasLetterBoxHeight(heightBoxSize)
      }else{
        setCanvasWidth(elementWidth)
        setCanvasHeight(elementHeight)
      }

    }

  }))

  //resize observer connect/disconnect
  useEffect(()=>{

    if(gameViewRef && gameViewRef.current){
      console.log(gameViewRef.current.clientWidth, gameViewRef.current.clientHeight);
      resizeObserver.current.observe(gameViewRef.current)
    }

    return ()=>{
      resizeObserver.current && resizeObserver.current.disconnect()
    }

  }, [])

  //canvas context change effect
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D|null>(null)
  useEffect(()=>{

    if(canvasRef && canvasRef.current){
      contextRef.current = contextRef.current || canvasRef.current.getContext('2d')

      const ctx = contextRef.current
      if(!ctx) return

      //스케일 계산
      const scaleRatioX = window.screen.width / gameWidth
      const scaleRatioY = window.screen.height / gameHeight
      let scale = scaleRatioX > scaleRatioY?scaleRatioY:scaleRatioX
      
      const angle = window.screen.orientation.angle
      if(window.screen.width < window.screen.height && angle === 0){
        
        alert('세로모드는 지원하지 않습니다.')
        throw new Error('세로모드는 지원하지 않습니다.')
      }

      ctx.scale(scale, scale)
      
      //image scale option
      ctx.imageSmoothingEnabled = false;

      if(contextRef.current){
        onContextChanged && onContextChanged({
          renderContext:contextRef.current,
          width:canvasWidth, height:canvasHeight,
          scaledWidth:canvasWidth / scale, scaledHeight:canvasHeight / scale,
          scale
        })
      }else{
        throw new Error('Canvas 2d is not Supported.')
      }
    }

  }, [canvasWidth, canvasHeight])

  return <div ref={gameViewRef} style={{
    position:'relative',
    width:fullScreen?'100vw':`${displayWidth}px`,
    height:fullScreen?'100vh':`${displayHeight}px`,
    display:'flex', flexDirection:canvasLetterBoxWidth > 0?'row':'column'
  }}>

    {canvasLetterBoxWidth > 0?<div style={{background:'black', width:`${canvasLetterBoxWidth}px`, height:'100%'}}></div>:canvasLetterBoxHeight > 0?<div style={{background:'black', width:'100%', height:`${canvasLetterBoxHeight}px`}}></div>:<></>}
    {canvasWidth > 0 && <HtmlCanvas ref={canvasRef} canvasWidth={canvasWidth} canvasHeight={canvasHeight}></HtmlCanvas>}
    {canvasLetterBoxWidth > 0?<div style={{background:'black', width:`calc(100% - ${canvasLetterBoxWidth + canvasWidth}px)`, height:'100%'}}></div>:canvasLetterBoxHeight > 0?<div style={{background:'black', width:'100%', height:`calc(100% - ${canvasLetterBoxHeight + canvasHeight}px`}}></div>:<></>}

  </div>
}

interface HtmlCanvasProps{
  canvasWidth:number
  canvasHeight:number
}
const HtmlCanvas = React.forwardRef<HTMLCanvasElement, HtmlCanvasProps>(({canvasWidth, canvasHeight}, ref) => (
  <canvas ref={ref} width={canvasWidth} height={canvasHeight} style={{
    //border:'1px solid black'
  }}>
  </canvas>
))
