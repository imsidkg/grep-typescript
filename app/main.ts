const args = process.argv;
const pattern = args[3]; // The pattern provided as an argument

export const inputLine: string = await Bun.stdin.text(); // Capture the input string

function matchPattern(inputLine: string, pattern: string): boolean {
  let i = 0, j = 0;
  
  while (i < inputLine.length && j < pattern.length) {
    const currentPatternChar = pattern[j];

    if (currentPatternChar === '\\') {
     
      const nextPatternChar = pattern[j + 1];
      if (nextPatternChar === 'd') {
      
        if (!/\d/.test(inputLine[i])) return false;
        j += 2;
      } else if (nextPatternChar === 'w') {
    
        if (!/\w/.test(inputLine[i])) return false;
        j += 2; 
      }
    } else {
      
      if (currentPatternChar !== inputLine[i]) return false;
      j += 1;
    }
    i += 1;
  }


  return i === inputLine.length && j === pattern.length;
}

// Ensure the first argument is "-E"
if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

// Debugging output (optional)
console.log("Logs from your program will appear here!");

// Check if the input line matches the pattern
if (matchPattern(inputLine, pattern)) {
  process.exit(0); // Success, pattern matches
} else {
  process.exit(1); // Failure, pattern does not match
}
