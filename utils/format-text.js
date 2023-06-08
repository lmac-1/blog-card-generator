const organiseTextIntoLines = (input, maxChars = 22) => {
  const allWords = input.split(" ");
  let currentLine = [];
  let currentLength = 0;
  const lines = [];

  allWords.forEach((word) => {
    // Check if adding the next word will exceed the maximum length.
    if (currentLength + word.length + 1 > maxChars) {
      // +1 accounts for a space
      // If it does, we add the current line to the lines array
      // and start a new line with the current word.
      lines.push(currentLine.join(" "));
      currentLine = [word];
      currentLength = word.length;
    } else {
      // If it doesn't, add the word to the current line
      // and increase the current length.
      currentLine.push(word);
      currentLength += word.length + 1; // +1 accounts for a space
    }
  });

  // Add the last line to the lines array if it's not empty.
  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }

  return lines;
};

const formatTitle = (title) => {
  return organiseTextIntoLines(title);
};

module.exports = formatTitle;
