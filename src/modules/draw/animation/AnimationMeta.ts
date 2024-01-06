export interface AnimationMetaSpriteData {
  src: string;
  w: number;
  h: number;
  scale?: number;
}

export type AnimationMetaSpriteMap<T extends string> = Record<T, AnimationMetaSpriteData>;

export interface AnimationMetaFrameData { 
  pos: number;
  delay: number;
}

export interface AnimationMetaDefData<M extends string> { 
  map: M;
  loopCnt: number;
  delay: number;
  frames: AnimationMetaFrameData[];
}

export type AnimationMetaDefMap<T extends string, M extends string> = Record<T, AnimationMetaDefData<M>>;

export interface AnimationMeta<T extends string, M extends string> {
  spriteMap:AnimationMetaSpriteMap<M>;
  def:AnimationMetaDefMap<T, M>;
}