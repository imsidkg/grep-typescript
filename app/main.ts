const args = process.argv;
const pattern = args[3];

 export const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }
  else if(pattern === "\\d"){
    console.log('reched 1')
    return /\d/g.test(inputLine)
   }
   else if (pattern === '\\w') {
    console.log('reched 2')
    return /\w/g.test(inputLine)
   }
   else if (pattern[0] === "[" && pattern[pattern.length - 1] === "]" && pattern[1] === "^") {
     console.log('reched 4')
     const negGroupChars = pattern.slice(2, pattern.length - 1); // Extract characters after ^ and before ]
     
     // Check if any character in inputLine is NOT in the negative group
     for (let x = 0; x < inputLine.length; x++) {
       if (!negGroupChars.includes(inputLine[x])) {
         return true; // Found a character not in the group, return true
        }
      }
      return false; // All characters are in the group, return false
    }
    else if (pattern.startsWith('[') && pattern.endsWith(']')){
     const chars = pattern.slice(0,pattern.length-1);
     console.log('reched 3')
     return Array.from(chars).some((char) => inputLine.includes(char))
    }

  else {
    throw new Error(`Unhandled pattern: ${pattern}`);
  }
}

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
if (matchPattern(inputLine, pattern)) {
  process.exit(0);
} else {
  process.exit(1);
}
