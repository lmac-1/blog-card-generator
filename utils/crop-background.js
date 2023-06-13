const cropAndDrawBackgroundImage = (context, bgImage) => {
  // Variables to crop image to be in the centre and fill the canvas
  const horizontalRatio = context.canvas.width / bgImage.width;
  const verticalRatio = context.canvas.height / bgImage.height;
  const ratio = Math.max(horizontalRatio, verticalRatio);
  const centerShift_x = (context.canvas.width - bgImage.width * ratio) / 2;
  const centerShift_y = (context.canvas.height - bgImage.height * ratio) / 2;

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
};

module.exports = cropAndDrawBackgroundImage;
