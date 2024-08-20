const args = process.argv;
const pattern = args[3]; // The pattern provided as an argument

export const inputLine: string = await Bun.stdin.text(); // Capture the input string
function matchPattern(inputLine: string, pattern: string): boolean {
  let i = 0, j = 0;

  while (i < inputLine.length && j < pattern.length) {
    const currentPatternChar = pattern[j];
    console.log(`Checking pattern character: ${currentPatternChar}, input character: ${inputLine[i]}`);

    if (currentPatternChar === '\\') {
      j += 1; // Skip the backslash
      const nextPatternChar = pattern[j];

      if (nextPatternChar === 'd') {
        console.log('Matching digit...');
        let digitStart = i;
        while (i < inputLine.length && /\d/.test(inputLine[i])) {
          i += 1;
        }
        if (digitStart === i) return false; // No digit found
        j += 1; // Move past the digit part of the pattern
      } else if (nextPatternChar === 'w') {
        console.log('Matching word character...');
        let wordStart = i;
        while (i < inputLine.length && /\w/.test(inputLine[i])) {
          i += 1;
        }
        if (wordStart === i) return false; // No word character found
        j += 1; // Move past the word character part of the pattern
      } else {
        // Handle unrecognized escape sequences
        console.log(`Unrecognized escape sequence: \\${nextPatternChar}`);
        return false;
      }
    } else {
      console.log(`Matching literal character: ${currentPatternChar}`);
      if (currentPatternChar !== inputLine[i]) return false; // Check if the current pattern character matches the input character
      i += 1; // Move to the next character in the input line
      j += 1; // Move to the next character in the pattern
    }
  }

  // Ensure both pattern and input line are fully matched
  return j === pattern.length && i === inputLine.length;
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


