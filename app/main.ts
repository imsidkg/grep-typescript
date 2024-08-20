const args = process.argv;
const pattern = args[3]; // The pattern provided as an argument

export const inputLine: string = await Bun.stdin.text(); // Capture the input string
function matchPattern(inputLine: string, pattern: string): boolean {
  let i = 0, j = 0;

  function isWordCharacter(ascii: number): boolean {
    return (
      (ascii >= 48 && ascii <= 57) || // digits 0-9
      (ascii >= 65 && ascii <= 90) || // uppercase A-Z
      (ascii >= 97 && ascii <= 122) || // lowercase a-z
      ascii === 95 // underscore _
    );
  }
  
  function isDigit(ascii: number): boolean {
    return ascii >= 48 && ascii <= 57; // digits 0-9
  }
  
  function matchPattern(inputLine: string, pattern: string): boolean {
    // Handle simple patterns like \d and \w
    if (pattern === "\\d") {
      return inputLine.split("").some(char => isDigit(char.charCodeAt(0)));
    }
  
    if (pattern === "\\w") {
      return inputLine.split("").some(char => isWordCharacter(char.charCodeAt(0)));
    }
  
    // Handle character classes like [abc] and negated classes like [^abc]
    if (pattern.startsWith("[") && pattern.endsWith("]")) {
      const isNegated = pattern[1] === "^";
      const charsToMatch = pattern.slice(isNegated ? 2 : 1, -1).split("");
  
      if (isNegated) {
        return inputLine.split("").every(char => !charsToMatch.includes(char));
      } else {
        return inputLine.split("").some(char => charsToMatch.includes(char));
      }
    }
  
    // Handle multi-character patterns like "\d apple"
    const components = parsePattern(pattern);
    return matchComplexPattern(inputLine, components);
  }
  
  function parsePattern(pattern: string): string[] {
    const components: string[] = [];
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "\\") {
        components.push(pattern.slice(i, i + 2)); // capture \d, \w, etc.
        i++;
      } else {
        components.push(pattern[i]); // capture regular characters
      }
    }
    return components;
  }
  
  function matchComplexPattern(inputLine: string, components: string[]): boolean {
    let compareIndex = 0;
  
    for (let i = 0; i < inputLine.length; i++) {
      if (compareIndex === components.length) break;
  
      const currentComponent = components[compareIndex];
      const ascii = inputLine.charCodeAt(i);
  
      if (currentComponent === "\\w") {
        if (isWordCharacter(ascii)) {
          compareIndex++;
        } else {
          resetPatternIndexIfNecessary(components, currentComponent, i, ascii);
          compareIndex = 0;
        }
      } else if (currentComponent === "\\d") {
        if (isDigit(ascii)) {
          compareIndex++;
        } else {
          resetPatternIndexIfNecessary(components, currentComponent, i, ascii);
          compareIndex = 0;
        }
      } else if (inputLine[i] === currentComponent) {
        compareIndex++;
      } else {
        compareIndex = 0;
      }
    }
  
    return compareIndex === components.length;
  }
  
  function resetPatternIndexIfNecessary(components: string[], currentComponent: string, i: number, ascii: number) {
    if (currentComponent === "\\w" && !isWordCharacter(ascii)) {
      i--;
    }
    if (currentComponent === "\\d" && !isDigit(ascii)) {
      i--;
    }
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
}
