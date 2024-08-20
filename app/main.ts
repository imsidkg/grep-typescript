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
        j += 2; // Move past the \ and the d in the pattern
      } else if (nextPatternChar === 'w') {
        if (!/\w/.test(inputLine[i])) return false;
        j += 2; // Move past the \ and the w in the pattern
      }
    } else {
      if (currentPatternChar !== inputLine[i]) return false;
      j += 1; // Move to the next character in the pattern
    }
    i += 1; // Always move to the next character in the input line
  }

  // Pattern needs to be completely matched
  return j === pattern.length;
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
