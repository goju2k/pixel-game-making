(() => {
  let s = '';
  const no = 97;
  const to = no + 26;
  
  // let no = 1
  // let to = 150
  for (let i = no; i < to; i++) {
    const ch = String.fromCodePoint(i);
    if (ch.length !== 0 && ch.toLowerCase() === ch) {
      const dot = ch === "'" ? '"' : "'";
      s += `${dot}Key${ch.toUpperCase()}${dot}:boolean=false;`;
    }
  }
  console.log(s);
})();

(() => {
  let s = '';
  const no = 0;
  const to = 10;
  
  // let no = 1
  // let to = 150
  for (let i = no; i < to; i++) {
    const ch = String(i);
    const dot = ch === "'" ? '"' : "'";
    s += `${dot}Digit${ch.toUpperCase()}${dot}:boolean=false;`;
  }
  for (let i = no; i < to; i++) {
    const ch = String(i);
    const dot = ch === "'" ? '"' : "'";
    s += `${dot}Numpad${ch.toUpperCase()}${dot}:boolean=false;`;
  }
  console.log(s);
})();

(() => {
  let s = '';
  const no = 1;
  const to = 13;
  
  // let no = 1
  // let to = 150
  for (let i = no; i < to; i++) {
    const ch = String(i);
    const dot = ch === "'" ? '"' : "'";
    s += `${dot}F${ch.toUpperCase()}${dot}:boolean=false;`;
  }
  console.log(s);
})();