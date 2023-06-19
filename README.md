# Blog Card Generator

Blog Card Generator is a simple Node.js application that generates blog card images using the [`node-canvas` library](https://github.com/Automattic/node-canvas).

## Getting started

Run `npm install` to install dependencies

Run `npm run dev` to start the server

## How it works

To run the Blog Card Generator, follow these steps:

1. Make sure the development server is running (by running `npm run dev`)
1. Use a tool like Postman to send a POST request to the endpoint: http://localhost:3000/image.
1. Include the following fields in the body of the request:

   | Field     | Description                                                                                                          |
   | --------- | -------------------------------------------------------------------------------------------------------------------- |
   | `bgImage` | png or jpg file of the background image (you can use the sample background image in `/static/sample-background.png`) |
   | `title`   | Title that will be displayed on the blog card                                                                        |
   | `color`   | Hex code of the colour of the text                                                                                   |

1. Review the response to get the generated blog card image.

## How it works

When you make a POST request, the following actions happen:

1. The background image is processed.
2. A canvas is created.
3. A `textBoundingBox` is defined to represent the boundaries of the printed text.
4. The maximum possible font size for the title within the `textBoundingBox` is calculated, and the title is organised into an array of lines.
5. The text is painted onto the canvas:
   - The total height of the words is calculated.
   - Each line of text is painted, and the Y position is adjusted for each line.
6. The canvas is sent as a JPEG image in the response.

## How to customise

The behaviour of the application can be adjusted by modifying the following constants located at the top of `index.js`:

- `CANVAS_WIDTH`: Specifies the width of the blog card image.
- `CANVAS_HEIGHT`: Specifies the height of the blog card image.
- `TEXT_BOUNDING_BOX_WIDTH`: Determines the width of the text container box.
- `TEXT_BOUNDING_BOX_HEIGHT`: Determines the height of the text container box.
- `LINE_HEIGHT`: Controls the line height of the text.
- `MIN_FONT_SIZE`: Sets the minimum font size for the text.
- `MAX_FONT_SIZE`: Sets the maximum font size for the text.
- `FONT`: Sets the minimum font size for the text.
- `SCALE`: A scaling factor applied to all measurements to upscale the image. To ensure optimal image quality, we recommend scaling the images up by a factor of 3. This ensures that the resulting image looks good at the desired size.

The application dynamically adjusts the text size based on the length of the title. As a result, images with shorter titles will have larger text sizes, while longer titles will have smaller text sizes.
