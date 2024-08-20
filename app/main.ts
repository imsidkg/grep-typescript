const args = process.argv;
const pattern = args[3];

 export const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  let i=0 ;
  let j=0;
  // if (pattern.length === 1) {
  //   return inputLine.includes(pattern);
  // }
  // else if(pattern === "\\d"){
  //   console.log('reched 1')
  //   return /\d/g.test(inputLine)
  //  }
  //  else if (pattern === '\\w') {
  //   console.log('reched 2')
  //   return /\w/g.test(inputLine)
  //  }
  //  else if (pattern[0] === "[" && pattern[pattern.length - 1] === "]" && pattern[1] === "^") {
  //    console.log('reched 4')
  //    const negGroupChars = pattern.slice(2, pattern.length - 1); 
  //    return !Array.from(negGroupChars).some((negGroupChar) => inputLine.includes(negGroupChar))
  //   }
  //   else if (pattern.startsWith('[') && pattern.endsWith(']')){
  //    const chars = pattern.slice(0,pattern.length-1);
     
  //    return Array.from(chars).some((char) => inputLine.includes(char))
  //   }
  while (i<inputLine.length && j<pattern.length-1) {
    const currentPatternCharacter = pattern[j] ;
     
    if(currentPatternCharacter === '//') {
      const nextPatternCharacter = pattern[j+1];
      if(nextPatternCharacter === 'd') {
        if(!/\d/.test(inputLine[i])) return false
        j+=2 ;
    }
    else if(nextPatternCharacter === 'w') {
      if(!/\w/.test(inputLine[i])) return false
      j+=2;
    }

    }
    else {
      if(pattern[j] !== inputLine[i]) return false
      j +=1;
    }
     i+=1;


  }
  return i === inputLine.length && j == pattern.length;
 
}

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
if (matchPattern(inputLine, pattern)) {
  process.exit(0);
} else {
  process.exit(1);
}
  