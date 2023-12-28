import { useCallback, useEffect, useRef, useState } from 'react';

import { GamePlayView } from '../../../components/views/game/GamePlayView';

type DataType = 'aaa'|'abb'|'aba'|'abc'
interface DataSet {
  type:DataType;
  curr:string;
  past:string;
  pastParticle:string;
}
const datapool = [
  // AAA
  { type: 'aaa', curr: 'set', past: 'set', pastParticle: 'set' },
  { type: 'aaa', curr: 'cut', past: 'cut', pastParticle: 'cut' },
  { type: 'aaa', curr: 'put', past: 'put', pastParticle: 'put' },
  { type: 'aaa', curr: 'let', past: 'let', pastParticle: 'let' },
  { type: 'aaa', curr: 'hurt', past: 'hurt', pastParticle: 'hurt' },
  { type: 'aaa', curr: 'cost', past: 'cost', pastParticle: 'cost' },
  { type: 'aaa', curr: 'read', past: 'read', pastParticle: 'read' },
  // ABB
  { type: 'abb', curr: 'bring', past: 'brought', pastParticle: 'brought' },
  { type: 'abb', curr: 'build', past: 'built', pastParticle: 'built' },
  { type: 'abb', curr: 'buy', past: 'bought', pastParticle: 'bought' },
  { type: 'abb', curr: 'catch', past: 'caught', pastParticle: 'caught' },
  { type: 'abb', curr: 'feed', past: 'fed', pastParticle: 'fed' },
  { type: 'abb', curr: 'fight', past: 'fought', pastParticle: 'fought' },
  { type: 'abb', curr: 'find', past: 'found', pastParticle: 'found' },
  { type: 'abb', curr: 'have', past: 'had', pastParticle: 'had' },
  { type: 'abb', curr: 'hear', past: 'heard', pastParticle: 'heard' },
  { type: 'abb', curr: 'hold', past: 'held', pastParticle: 'held' },
  { type: 'abb', curr: 'keep', past: 'kept', pastParticle: 'kept' },
  { type: 'abb', curr: 'leave', past: 'left', pastParticle: 'left' },
  { type: 'abb', curr: 'lend', past: 'lent', pastParticle: 'lent' },
  { type: 'abb', curr: 'lose', past: 'lost', pastParticle: 'lost' },
  { type: 'abb', curr: 'make', past: 'made', pastParticle: 'made' },
  { type: 'abb', curr: 'meet', past: 'met', pastParticle: 'met' },
  { type: 'abb', curr: 'pay', past: 'paid', pastParticle: 'paid' },
  { type: 'abb', curr: 'say', past: 'said', pastParticle: 'said' },
  { type: 'abb', curr: 'sell', past: 'sold', pastParticle: 'sold' },
  { type: 'abb', curr: 'send', past: 'sent', pastParticle: 'sent' },
  { type: 'abb', curr: 'sleep', past: 'slept', pastParticle: 'slept' },
  { type: 'abb', curr: 'spend', past: 'spent', pastParticle: 'spent' },
  { type: 'abb', curr: 'stand', past: 'stood', pastParticle: 'stood' },
  { type: 'abb', curr: 'teach', past: 'taught', pastParticle: 'taught' },
  { type: 'abb', curr: 'tell', past: 'told', pastParticle: 'told' },
  { type: 'abb', curr: 'think', past: 'thought', pastParticle: 'thought' },
  { type: 'abb', curr: 'understand', past: 'understood', pastParticle: 'understood' },
  { type: 'abb', curr: 'win', past: 'won', pastParticle: 'won' },
  // ABA
  { type: 'aba', curr: 'become', past: 'became', pastParticle: 'become' },
  { type: 'aba', curr: 'come', past: 'came', pastParticle: 'come' },
  { type: 'aba', curr: 'run', past: 'ran', pastParticle: 'run' },
  // ABC
  { type: 'abc', curr: 'bear', past: 'bore', pastParticle: 'born' },
  { type: 'abc', curr: 'begin', past: 'began', pastParticle: 'begun' },
  { type: 'abc', curr: 'bite', past: 'bit', pastParticle: 'bitten' },
  { type: 'abc', curr: 'break', past: 'broke', pastParticle: 'broken' },
  { type: 'abc', curr: 'choose', past: 'chose', pastParticle: 'chosen' },
  { type: 'abc', curr: 'do', past: 'did', pastParticle: 'done' },
  { type: 'abc', curr: 'draw', past: 'drew', pastParticle: 'drawn' },
  { type: 'abc', curr: 'drive', past: 'drove', pastParticle: 'driven' },
  { type: 'abc', curr: 'eat', past: 'ate', pastParticle: 'eaten' },
  { type: 'abc', curr: 'fall', past: 'fell', pastParticle: 'fallen' },
  { type: 'abc', curr: 'get', past: 'got', pastParticle: 'gotten' },
  { type: 'abc', curr: 'give', past: 'gave', pastParticle: 'given' },
  { type: 'abc', curr: 'go', past: 'went', pastParticle: 'gone' },
  { type: 'abc', curr: 'grow', past: 'grew', pastParticle: 'grown' },
  { type: 'abc', curr: 'mistake', past: 'mistook', pastParticle: 'mistaken' },
  { type: 'abc', curr: 'ride', past: 'rode', pastParticle: 'ridden' },
  { type: 'abc', curr: 'ring', past: 'rang', pastParticle: 'rung' },
  { type: 'abc', curr: 'rise', past: 'rose', pastParticle: 'risen' },
  { type: 'abc', curr: 'see', past: 'saw', pastParticle: 'seen' },
  { type: 'abc', curr: 'sing', past: 'sang', pastParticle: 'sung' },
  { type: 'abc', curr: 'speak', past: 'spoke', pastParticle: 'spoken' },
  { type: 'abc', curr: 'swim', past: 'swam', pastParticle: 'swum' },
  { type: 'abc', curr: 'take', past: 'took', pastParticle: 'taken' },
  { type: 'abc', curr: 'throw', past: 'threw', pastParticle: 'thrown' },
  { type: 'abc', curr: 'wear', past: 'wore', pastParticle: 'worn' },
  { type: 'abc', curr: 'write', past: 'wrote', pastParticle: 'written' },
] as DataSet[];

// const datapool_test = [
//   // AAA
//   { type: 'aaa', curr: 'set', past: 'set', pastParticle: 'set' },
//   { type: 'aaa', curr: 'cut', past: 'cut', pastParticle: 'cut' },
//   { type: 'aaa', curr: 'put', past: 'put', pastParticle: 'put' },
// ] as DataSet[];

function getRandomSet() {

  const copy = [ ...datapool ];
  console.log('total', copy.length);
  
  const result = [];
  while (result.length !== datapool.length) {
    const idx = Math.floor(Math.random() * copy.length);
    // console.log('idx', idx);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }

  return result;
}

export function GameMain() {

  const form = useRef<any>({ curr: '', past: '', pastParticle: '' });

  const data = useRef<DataSet[]>(getRandomSet());
  const [ index, setIndex ] = useState<number>(0);
  useEffect(() => {
    
    if (data.current[index]) {
      form.current.curr = data.current[index].curr;
      form.current.past = '';
      form.current.pastParticle = '';
    }

  }, [ index ]);

  const confirm = useCallback(() => {
    
    const currData = data.current[index];
    const formData = form.current;
    console.log('confirm form', currData, formData);

    if (currData.past !== formData.past) {
      window.alert('과거형이 틀렸어요!!!');
      return;
    }
    if (currData.pastParticle !== formData.pastParticle) {
      window.alert('과거분사가 틀렸어요!!!');
      return;
    }

    window.alert('정답!!!');
    setIndex(index + 1);
    
  }, [ index ]);

  return (
    <GamePlayView>
      <div style={{ width: '100%', height: '100%', background: 'white' }}>

        <Box align='center' valign='flex-start' style={{ width: '100%', height: '100%' }}>

          {/* 컨텐츠영역 */}
          <Box flexDirection='column' valign='flex-start' style={{ width: '800px', height: '100%', background: '#ffefef' }}>

            {/* 타이틀 */}
            <Box style={{ height: '100px' }}>

              <Box textSize={1}>동사의 불규칙 변화</Box>

            </Box>

            {/* 문제 */}
            <Box flexDirection='column' style={{ height: 'calc(100% - 200px)', background: '#fdfdfd' }}>
              {
                data.current[index] ? (
                  <>
                    <Input readonly name='현재형' formKey='curr' value={data.current[index].curr} />
                    <Input name='과거형' formKey='past' formObject={form.current} />
                    <Input name='과거분사' formKey='pastParticle' formObject={form.current} />
                  </>
                )
                  : <Box>문제를 모두 풀었습니다!!!</Box>
              }
            </Box>

            {/* 하단부 */}
            <Box align='space-between' style={{ height: '100px' }}>
              {data.current[index] && <Box>{`앞으로 [${data.current.length - index}] 문제 남았습니다`}</Box>}
              {data.current[index] && <Button name='정답확인' onClick={confirm} />}
            </Box>

          </Box>

        </Box>

      </div>
    </GamePlayView>
  );
}

interface BoxProps{
  flexDirection?:'row'|'column';
  align?:'flex-start'|'center'|'flex-end'|'space-between';
  valign?:'flex-start'|'center'|'flex-end';
  textSize?:1|2|3|4|5|6;
  textColor?:string;
  style?:React.CSSProperties|undefined;
}
const ColorMap = new Map<number, string>([[ 1, '24px' ], [ 2, '20px' ], [ 3, '16px' ], [ 4, '14px' ], [ 5, '12px' ], [ 6, '11px' ]]);
function Box({ flexDirection = 'row', align = 'flex-start', valign = 'center', textSize = 3, textColor = 'black', style, children }:React.PropsWithChildren<BoxProps>) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection,
      alignItems: valign,
      justifyContent: align,
      padding: '10px',
      fontSize: ColorMap.get(textSize),
      fontWeight: 600,
      color: textColor,
      ...style,
    }}
    >{children}
    </div>
  );
}

interface ButtonProps{
  name:string;
  style?:React.CSSProperties|undefined;
  onClick:()=>void;
}

function Button({ name, style, onClick }:ButtonProps) {
  return <button onClick={onClick} style={{ whiteSpace: 'nowrap', padding: '5px 10px', ...style }}>{name}</button>;
}

interface InputProps{
  name?:string;
  readonly?:boolean;
  formKey?:string;
  formObject?:any;
  value?:string;
  style?:React.CSSProperties|undefined;
}
function Input({ name, readonly = false, value, formKey, formObject, style }:InputProps) {

  const ref = useRef<HTMLInputElement|null>(null);
  if (ref.current && formKey && formObject) {
    ref.current.value = '';
  }
  
  return (
    <Box align='space-between'>
      {name && <Box>{name}</Box>}
      <input
        ref={ref}
        disabled={readonly}
        readOnly={readonly}
        style={{ ...style }}
        value={value}
        onChange={(e) => {
          if (formKey && formObject) {
            formObject[formKey] = e.target.value;
          }
        }}
      />
    </Box>
  );
}