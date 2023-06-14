const express = require("express");
const { createCanvas } = require("canvas");
// todo: registerFont so that it works on the server
const multer = require("multer");

const processUploadedImage = require("./utils/process-uploaded-image");
const calculateFontSizeAndLines = require("./utils/multiline");
const cropAndDrawBackgroundImage = require("./utils/crop-background");
const renderText = require("./utils/render-text");

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error("Please upload a PNG or JPG image"));
    }
    cb(undefined, true);
  },
});

// Constants
// We scale all measurements so the image is of a higher quality
const SCALE = 3;
const CANVAS_WIDTH = 1200 * SCALE;
const CANVAS_HEIGHT = 630 * SCALE;
const TEXT_BOUNDING_BOX_WIDTH = 752 * SCALE;
const TEXT_BOUNDING_BOX_HEIGHT = 396 * SCALE;
const LINE_HEIGHT = 1.1;
const MIN_FONT_SIZE = 30 * SCALE;
const MAX_FONT_SIZE = 80 * SCALE;
// Custom fonts need quotation marks around them
const FONT = `"Onest"`;

const app = express();
const port = 3000;

app.post(
  "/image",
  upload.single("bgImage"),
  async (req, res) => {
    const bgImage = await processUploadedImage(req.file);

    // Gets info from body
    const title = req.body.title || "Title";
    const color = req.query.color || "#1E5E25";

    // Creates new canvas instance
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const context = canvas.getContext("2d");

    cropAndDrawBackgroundImage(context, bgImage);

    // Calculates x and y starting coordinates of bounding box
    const textBoundingBox_x = (canvas.width - TEXT_BOUNDING_BOX_WIDTH) / 2;
    const textBoundingBox_y = (canvas.height - TEXT_BOUNDING_BOX_HEIGHT) / 2;

    // This is the rectangle that the text should be held within and not exceed
    const textBoundingBox = {
      x: textBoundingBox_x, // starting point X
      y: textBoundingBox_y, // starting point Y
      width: TEXT_BOUNDING_BOX_WIDTH, // width of total rectangle
      height: TEXT_BOUNDING_BOX_HEIGHT, // height of total rectangle
    };

    const options = {
      lineHeight: LINE_HEIGHT,
      minFontSize: MIN_FONT_SIZE,
      maxFontSize: MAX_FONT_SIZE,
      font: FONT,
      textBoundingBox,
    };

    const { fontSize, lines } = calculateFontSizeAndLines(
      context,
      title,
      options
    );

    renderText(context, lines, fontSize, LINE_HEIGHT, color);

    // Sends image back in response
    const buffer = canvas.toBuffer("image/jpeg");
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
