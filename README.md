# Blog Card Generator

Blog Card Generator is a simple Node.js application that generates blog card images using the `node-canvas` library.

## Getting started

Run `npm install` to install dependencies

Run `npm run dev` to start the server

## How to test the API

To test the Blog Card Generator, follow these steps:

1. Make sure the development server is running (by running `npm run dev`)
1. Use a tool like Postman to send a POST request to the endpoint: http://localhost:3000/image.
1. Include the following fields in the body of the request:

   | Field     | Description                                   |
   | --------- | --------------------------------------------- |
   | `bgImage` | png or jpg file of the background image       |
   | `title`   | Title that will be displayed on the blog card |
   | `color`   | Hex code of the colour of the text            |

1. Review the response to get the generated blog card image.

## How it works

When you make a POST request, the following actions happen:

1. Processes the background image
2. Creates canvas
3. Defines a `textBoundingBox` which represents the boundaries of the printed text
4. Calculates the maximum possible font size for title within the `textBoundingBox` and organises the title into an array of lines
5. Text is painted to the canvas:
   - Calculates total height of the words
   - Paints each line of text and adjusts the Y position for each line
6. Canvas is passed into the response as a jpeg buffer.

### Constants

There are a number of constants at the top of `index.js` which determine the behaviour. These can be updated.
