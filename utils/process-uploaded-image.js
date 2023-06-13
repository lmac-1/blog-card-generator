const { loadImage } = require("canvas");

const processUploadedImage = async (file) => {
  if (!file) {
    throw new Error("No file uploaded");
  }
  const data = file.buffer.toString("base64");
  const imgSrc = `data:${file.mimetype};base64,${data}`;
  return await loadImage(imgSrc);
};

module.exports = processUploadedImage;
