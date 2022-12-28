import g from "../global"

const imageCache = new Map<string, HTMLImageElement>()

//이미지 Get
const getImage = async (imageSrc:string):Promise<HTMLImageElement> => {

  return new Promise<HTMLImageElement>(async (resolve)=>{

    let image = imageCache.get(imageSrc)
  
    if(!image){
      image = await createImage(imageSrc)
      imageCache.set(imageSrc , image)
      //console.log('new image ', imageCache[imageSrc]);
    }else{
      //console.log('cache image ', imageCache[imageSrc]);
    }
  
    resolve(image)

  })

}

//이미지 생성
const createImage = async (imageSrc:string) => {
  const image = document.createElement<'img'>('img')
  image.src = (await import(`${process.env.REACT_APP_ASSET_IMAGE_URL}/${imageSrc}`)).default
  await image.decode()
  return image
}

interface FrameOffset {
  offsetX:number
  offsetY:number
}

export class Sprite {

  imageSrc:string
  imageLoaded=false
  image!:HTMLImageElement
  scale:number=0
  scaleWidth:number=0
  scaleHeight:number=0
  frameWidth:number=0
  frameHeight:number=0
  xcnt:number=0
  ycnt:number=0
  frames:FrameOffset[][]=[]
  constructor(imageSrc:string, frameWidth?:number, frameHeight?:number, scale?:number){
    
    this.imageSrc = imageSrc
    frameWidth && (this.frameWidth = frameWidth)
    frameHeight && (this.frameHeight = frameHeight)
    this.scale = scale?scale:1

  }

  draw(x:number, y:number, frameX:number, frameY:number, rotate?:number){

    if(!this.imageLoaded) return
    
    if(!g.context) return

    //프레임 존재 체크
    if(!this.frames[frameX] || !this.frames[frameX][frameY]){
        throw new Error('이미지의 프레임 ('+frameX+','+frameY+') 이 존재하지 않습니다.  최대좌표 => ('+this.xcnt+','+this.ycnt+')')
    }

    //디버그용 박스
    // ctx.strokeStyle = 'green';
    // ctx.strokeRect(Math.floor(x), Math.floor(y), this.scaleWidth, this.scaleHeight);

    //rotate 처리
    if(rotate !== undefined){
      g.context.save()
      g.context.scale(rotate, 1) //rotate 가 -1 이면 대칭
    }else{
        rotate = 1
    }

    //이미지 그리기
    g.context.drawImage(
        this.image, 
        this.frames[frameX][frameY].offsetX, 
        this.frames[frameX][frameY].offsetY, 
        this.frameWidth, 
        this.frameWidth, 
        rotate!=1?rotate*Math.floor(x) - this.scaleWidth:Math.floor(x), 
        Math.floor(y), 
        this.scaleWidth, 
        this.scaleHeight
    );

    //rotate 복귀
    if(rotate !== undefined) g.context.restore();

  }

  async load():Promise<boolean>{

    return new Promise((resolve)=>{

      getImage(this.imageSrc).then((image)=>{
        
        console.log(this.imageSrc+' loaded!!!')
        this.image = image
    
        //프레임 처리
        if(!this.frameWidth) this.frameWidth = this.image.width
        if(!this.frameHeight) this.frameHeight = this.image.height
  
        //스케일 처리
        this.scaleWidth = this.frameWidth * this.scale
        this.scaleHeight = this.frameHeight * this.scale
  
        //이미지 비율 점검
        if(this.image.width % this.frameWidth !== 0
        || this.image.height % this.frameHeight !== 0
        ){
            throw new Error('이미지의 프레임사이즈 비율이 맞지 않습니다.');
        }
  
        //프레임 정보 생성
        const xcnt = this.xcnt = this.image.width / this.frameWidth
        const ycnt = this.ycnt = this.image.height / this.frameHeight
        for(let i = 0 ; i < xcnt ; i++){
  
            if(!this.frames[i]){
                this.frames[i] = []
            }
            for(let k = 0 ; k < ycnt ; k++){
                this.frames[i][k] = {offsetX:i * this.frameWidth, offsetY:k * this.frameHeight} as FrameOffset
            }
  
        }
  
        this.imageLoaded = true
        resolve(true)
  
      })

    })

  }

}
