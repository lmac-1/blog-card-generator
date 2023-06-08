# How to use this application

Run `npm install` to install dependencies

Run `npm run dev` to start the server

# Testing the API

You'll need to use Postman or something similar to simulate a POST request to the endpoint http://localhost:3000/image with the following fields in the body of the request:

| Field     | Description                                   |
| --------- | --------------------------------------------- |
| `bgImage` | png or jpg file of the background image       |
| `title`   | Title that will be displayed on the blog card |
| `color`   | Hex code of the colour of the text            |

# Notes

I am still trying to work out how to wrap the text.

At the moment it's only working for blogs that have two lines of text (each line has max 22 characters). Even then, it's not completely aligned in the center.
