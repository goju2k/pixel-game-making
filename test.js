
(()=>{
  let s = ''
  let no = 97
  let to = no + 26
  
  // let no = 1
  // let to = 150
  for(let i = no ; i < to ; i++){
    const ch = String.fromCodePoint(i)
    if(ch.length === 0){
      continue
    }
    if(ch.toLowerCase() !== ch){ //대문자는 제거
      continue
    }
    const dot = ch === "'"?'"':"'"
    s += `${dot}Key${ch.toUpperCase()}${dot}:boolean=false;`
  }
  console.log(s);
})();

(()=>{
  let s = ''
  let no = 0
  let to = 10
  
  // let no = 1
  // let to = 150
  for(let i = no ; i < to ; i++){
    const ch = String(i)
    const dot = ch === "'"?'"':"'"
    s += `${dot}Digit${ch.toUpperCase()}${dot}:boolean=false;`
  }
  for(let i = no ; i < to ; i++){
    const ch = String(i)
    const dot = ch === "'"?'"':"'"
    s += `${dot}Numpad${ch.toUpperCase()}${dot}:boolean=false;`
  }
  console.log(s);
})();

(()=>{
  let s = ''
  let no = 1
  let to = 13
  
  // let no = 1
  // let to = 150
  for(let i = no ; i < to ; i++){
    const ch = String(i)
    const dot = ch === "'"?'"':"'"
    s += `${dot}F${ch.toUpperCase()}${dot}:boolean=false;`
  }
  console.log(s);
})();
