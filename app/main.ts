// const args = process.argv;
// const pattern = args[3]; // The pattern provided as an argument

// export const inputLine: string = await Bun.stdin.text(); // Capture the input string
// function matchPattern(inputLine: string, pattern: string): boolean {
//   let i = 0, j = 0;

//   function isWordCharacter(ascii: number): boolean {
//     return (
//       (ascii >= 48 && ascii <= 57) || // digits 0-9
//       (ascii >= 65 && ascii <= 90) || // uppercase A-Z
//       (ascii >= 97 && ascii <= 122) || // lowercase a-z
//       ascii === 95 // underscore _
//     );
//   }
  
//   function isDigit(ascii: number): boolean {
//     return ascii >= 48 && ascii <= 57; // digits 0-9
//   }
  
//   function matchPattern(inputLine: string, pattern: string): boolean {
//     let i = 0, j = 0;
  
//     while (i < inputLine.length && j < pattern.length) {
//       const currentPatternChar = pattern[j];
  
//       if (currentPatternChar === '\\') {
//         j += 1; // Skip the backslash
//         const nextPatternChar = pattern[j];
  
//         if (nextPatternChar === 'd') {
//           // Match a digit
//           if (!/\d/.test(inputLine[i])) return false; // No digit found
//           while (i < inputLine.length && /\d/.test(inputLine[i])) {
//             i += 1;
//           }
//           j += 1; // Move past the '\d' in the pattern
//         } else {
//           return false; // Unsupported escape sequences
//         }
//       } else {
//         // Literal matching for "apple"
//         const remainingPattern = pattern.slice(j);
//         if (remainingPattern === " apple" && inputLine.slice(i).startsWith(" apple")) {
//           return true;
//         } else if (currentPatternChar !== inputLine[i]) {
//           return false; // Mismatch found
//         }
//         i += 1;
//         j += 1;
//       }
//     }
  
//     return j === pattern.length && i === inputLine.length;
//   }
  
  
  
//   function parsePattern(pattern: string): string[] {
//     const components: string[] = [];
//     for (let i = 0; i < pattern.length; i++) {
//       if (pattern[i] === "\\") {
//         components.push(pattern.slice(i, i + 2)); // capture \d, \w, etc.
//         i++;
//       } else {
//         components.push(pattern[i]); // capture regular characters
//       }
//     }
//     return components;
//   }
  
//   function matchComplexPattern(inputLine: string, components: string[]): boolean {
//     let compareIndex = 0;
  
//     for (let i = 0; i < inputLine.length; i++) {
//       if (compareIndex === components.length) break;
  
//       const currentComponent = components[compareIndex];
//       const ascii = inputLine.charCodeAt(i);
  
//       if (currentComponent === "\\w") {
//         if (isWordCharacter(ascii)) {
//           compareIndex++;
//         } else {
//           resetPatternIndexIfNecessary(components, currentComponent, i, ascii);
//           compareIndex = 0;
//         }
//       } else if (currentComponent === "\\d") {
//         if (isDigit(ascii)) {
//           compareIndex++;
//         } else {
//           resetPatternIndexIfNecessary(components, currentComponent, i, ascii);
//           compareIndex = 0;
//         }
//       } else if (inputLine[i] === currentComponent) {
//         compareIndex++;
//       } else {
//         compareIndex = 0;
//       }
//     }
  
//     return compareIndex === components.length;
//   }
  
//   function resetPatternIndexIfNecessary(components: string[], currentComponent: string, i: number, ascii: number) {
//     if (currentComponent === "\\w" && !isWordCharacter(ascii)) {
//       i--;
//     }
//     if (currentComponent === "\\d" && !isDigit(ascii)) {
//       i--;
//     }
//   }
  


// // Ensure the first argument is "-E"
// if (args[2] !== "-E") {
//   console.log("Expected first argument to be '-E'");
//   process.exit(1);
// }

// // Debugging output (optional)
// console.log("Logs from your program will appear here!");

// // Check if the input line matches the pattern
// if (matchPattern(inputLine, pattern)) {
//   process.exit(0); // Success, pattern matches
// } else {
//   process.exit(1); // Failure, pattern does not match
// }
// }




export {};
const args = process.argv;
const pattern = args[3];
const inputLine: string = await Bun.stdin.text();

function isDigit(ascii: number): boolean {
  return ascii >= 48 && ascii <= 57;
}

function isWordChar(ascii: number): boolean {
  return (ascii >= 48 && ascii <= 57) || (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122) || ascii === 95;
}

function matchPattern(inputLine: string, pattern: string): boolean {
  // Match \d for digits
  if (pattern === "\\d") {
    return inputLine.split('').some(char => isDigit(char.charCodeAt(0)));
  }

  // Match \w for word characters
  if (pattern === "\\w") {
    return inputLine.split('').some(char => isWordChar(char.charCodeAt(0)));
  }

  // Match [abc] or [^abc]
  if (pattern.startsWith("[") && pattern.endsWith("]")) {
    const negate = pattern[1] === "^";
    const chars = pattern.slice(negate ? 2 : 1, -1).split('');
    const charSet = new Set(chars);

    return inputLine.split('').some(char => negate ? !charSet.has(char) : charSet.has(char));
  }

  // Match a simple literal pattern
  if (pattern.length === 1) {
    return inputLine.includes(pattern);
  }

  // Complex patterns (e.g., \d apple)
  const compare: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '\\') {
      if (pattern[i + 1] === 'd') {
        compare.push('\\d');
      } else if (pattern[i + 1] === 'w') {
        compare.push('\\w');
      }
      i += 1;
    } else {
      compare.push(pattern[i]);
    }
  }

  let compareIndex = 0;
  for (let i = 0; i < inputLine.length; i++) {
    if (compareIndex === compare.length) break;

    const currentChar = inputLine[i];
    const currentPattern = compare[compareIndex];

    if (currentPattern === '\\w' && isWordChar(currentChar.charCodeAt(0))) {
      compareIndex++;
    } else if (currentPattern === '\\d' && isDigit(currentChar.charCodeAt(0))) {
      compareIndex++;
    } else if (currentPattern === currentChar) {
      compareIndex++;
    } else {
      compareIndex = 0;
    }
  }

  return compareIndex === compare.length;
}

// Ensure the first argument is "-E"
if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

// Check if the input line matches the pattern
if (matchPattern(inputLine, pattern)) {
  process.exit(0); // Success, pattern matches
} else {
  process.exit(1); // Failure, pattern does not match
}
