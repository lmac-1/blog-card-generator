const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const multer = require("multer");

const formatTitle = require("./utils/format-text");

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error("Please upload an PNG or JPG image"));
    }
    cb(undefined, true);
  },
});

const app = express();
const port = 3000;

app.post(
  "/image",
  upload.single("bgImage"),
  async (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded");
    // Processes image from post request body
    const data = req.file.buffer.toString("base64");
    const imgSrc = `data:${req.file.mimetype};base64,${data}`;
    const bgImage = await loadImage(imgSrc);

    // Gets info from body
    const title = req.body.title || "Title";
    const color = req.query.color || "#1E5E25";

    const canvasWidth = 1200 * 3;
    const canvasHeight = 630 * 3;
    // Creates new canvas instance
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const context = canvas.getContext("2d");

    // Crops image to be in the centre and fill the canvas
    const hRatio = canvas.width / bgImage.width;
    const vRatio = canvas.height / bgImage.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - bgImage.width * ratio) / 2;
    const centerShift_y = (canvas.height - bgImage.height * ratio) / 2;

    // Draws image on canvas
    context.drawImage(
      bgImage,
      0, // x coordinate to start clipping
      0, // y coordinate to start clipping
      bgImage.width, // width of clipped image
      bgImage.height, // height of clipped image
      centerShift_x, // x coordinate where to place image on canvas
      centerShift_y, // y coordinate where to place image on canvas
      bgImage.width * ratio, // width of the image to use
      bgImage.height * ratio // height of the image to use
    );

    // Apply any desired styling to the text
    const fontSize = 120;
    context.font = `bold ${fontSize}px Impact`;
    context.fillStyle = color;
    context.textAlign = "center";
    const lineHeight = fontSize + 20;

    const formattedText = formatTitle(title);

    // At the moment just playing with 2 lines (still not centered)
    let titleX = canvas.width / 2;
    let titleY = canvas.height / 2 - (lineHeight * formattedText.length) / 2;
    context.fillText(formattedText[0], titleX, titleY);
    titleY += lineHeight;
    context.fillText(formattedText[1], titleX, titleY);

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
