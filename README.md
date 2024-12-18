This is a [Next.js](https://nextjs.org) project which is used to manage contracts.

## Setup instructions

- Clone the project using `git clone` command
- Run `npm i --force`, --force is used because this is running on react 19 & shadcn is using previous versions of react
- Start the websocket server by running `npm run ws`, default port `8080` (make sure `nodemon` is installed, if not then change `nodemon`=>`node` in package.json file)
- Now in the different terminal start the nextjs app `npm run dev`, default port `3000`
