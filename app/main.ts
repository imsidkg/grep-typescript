const args = process.argv;
const pattern = args[3];

 export const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }
  else if(pattern === "\\d"){
    return /\d/g.test(inputLine)
  }
  else if(pattern == "\\w") {
     return /\w/g.test(inputLine)
  }
  else if(pattern.startsWith('[') && pattern.endsWith(']')) {
     let chars = pattern.slice(0,pattern.length-1);
     return Array.from(chars).some((char) => inputLine.includes(char))
  }
  else if (pattern[0] == "[" && pattern[pattern.length - 1] == "]" && pattern[1] == "^") {
    // Create a set of the characters in the negative character group
    let chars = new Set(pattern.slice(2, pattern.length - 1)); // Start after "^" and end before "]"
  
    // Check if any character in inputLine is in the negative character group
    for (let x = 0; x < inputLine.length; x++) {
      if (chars.has(inputLine[x])) {
        return false; // If any character is in the group, it's not a match
      }
    }
    return true; // If no characters are in the group, it's a match
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
