const renderText = (context, lines, fontSize, lineHeight, color) => {
  const totalHeightOfWords = Math.round(lineHeight * fontSize * lines.length);

  let textYPosition =
    (context.canvas.height - totalHeightOfWords) / 2 + fontSize;

  context.textAlign = "center";
  context.fillStyle = color;

  for (let line of lines) {
    context.fillText(line, context.canvas.width / 2, textYPosition);
    textYPosition += fontSize * lineHeight;
  }
};

module.exports = renderText;
