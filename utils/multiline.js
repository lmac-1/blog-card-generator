const createWordsArray = (string) => {
  return string.split(" ");
};

const calculateFontSizeAndLines = (
  context,
  string,
  {
    minFontSize = 30,
    maxFontSize = 100,
    font = "Arial",
    lineHeight = 1.1,
    textBoundingBox = {
      x: 100,
      y: 100,
      width: context.canvas.width,
      height: context.canvas.height,
    },
  }
) => {
  let lastFittingFontSize;
  let lines = [];

  // If you want to see what the text bounding box looks like, you can draw it by uncommenting out the following lines
  /* context.strokeRect(
      textBoundingBox.x,
      textBoundingBox.y,
      textBoundingBox.width,
      textBoundingBox.height
    ); */

  const wordsArray = createWordsArray(string);

  // Finds max font size which can be used to print the entire text across multiple lines
  for (let fontSize = minFontSize; fontSize <= maxFontSize; fontSize++) {
    // Line height
    const lineHeightMeasure = fontSize * lineHeight;

    // Sets font for testing with measureText()
    context.font = `${fontSize}px ${font}`;

    // Sets y coordinate and resets lines and line variable
    let y = textBoundingBox.y + fontSize; // we add font size as we're measuring from the bottom line of the letters
    lines = [];
    let line = "";

    // Cycles through words
    for (let word of wordsArray) {
      // Adds next word to line
      let linePlusWordAndSpace = line + word + " ";
      // If added word exceeds the text bounding box's length
      if (
        context.measureText(linePlusWordAndSpace).width > textBoundingBox.width
      ) {
        // Adds the line to the lines array without the last word
        lines.push(line);
        // New line with last word
        line = word + " ";
        // Moves y coordinate down to the next line
        y += lineHeightMeasure;
      } else {
        // continues appending words
        line = linePlusWordAndSpace;
      }
    }

    // Saves the last line
    lines.push(line);

    // If the bottom of the text's bounding box is reached then it breaks fontSize
    if (y > textBoundingBox.height) break;
    // Updates font size variable if all text fits
    lastFittingFontSize = fontSize;
  }

  return { lines, fontSize: lastFittingFontSize };
};

module.exports = calculateFontSizeAndLines;
