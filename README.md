# Smart Brain API

## Getting Started

1. Clone this repo
2. You must add your own API key in the `.env` file to connect to Clarifai API
3. Add your own database credentials to `.env`

You can grab Clarifai API key [here](https://www.clarifai.com/)

## Running without Docker

1. Run `npm install`
2. Run `npm start` to start the application
3. The application will be available at `http://localhost:3000`

## Running with Docker Compose

Ensure that you have Docker and Docker Compose installed on your machine.

1. Build the Docker image by running `docker-compose build`
2. Start the application by running `docker-compose up`
3. The application will be available at `http://localhost:3000`

To stop the application, use `docker-compose down`.

\*\* Make sure you use postgreSQL instead of mySQL for this code base.
