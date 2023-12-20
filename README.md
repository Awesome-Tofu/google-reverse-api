# Google Reverse API

A simple Express API using Puppeteer to scrape text from a specified image URL and provide related information using Google.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Deploy](#deploy)
- [License](#license)

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Awesome-tofu/google-reverse-api.git

2. **Navigate to the project directory:**

    ```bash
    cd google-reverse-api

2. **Install dependencies:**

    ```bash
    npm install

2. **Create a `.env` file in the project root and add your environment variables:**

    ```env
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = true
    PUPPETEER_EXECUTABLE_PATH = /usr/bin/google-chrome-stable

2. **Run the application:**

    ```bash
    npm start

## Usage

The API exposes an endpoint for scraping text from a specified image URL. See the [Endpoints](#endpoints) section for details.

## Endpoints

### Reverse Image Text

1. **URL:** `/reverse`

2. **Method:** `GET`

3. **Query Parameters:** `url` (required): The URL of the image to process.

4. **Example Request:** 
        
    ```bash
    curl http://localhost:3000/reverse?url=https://te.legra.ph/file/14632fbfeea4766941a14.png

5. **Example Response:**

    ```json
    {
    "result": {
        "image": "luffy hd",
        "requestUrl": "https://images.google.com/searchbyimage?safe=off&sbisrc=tg&image_url=https://te.legra.ph/file/14632fbfeea4766941a14.png"
    },
    "similarUrl": "https://www.google.com/search?tbm=isch&q=luffy%20hd"
    }

6. **If the image text cannot be found, the response will include a message:**

    ```json
    {
    "result": {
        "message": "Cannot find the matched image from the URL"
    }
    }

## Deploy

You can deploy the app at following platform 

1. **Heroku**

    <a aria-label="Deploy to Heroku" href="https://dashboard.heroku.com/new?template=https://github.com/Awesome-Tofu/google-reverse-api" target="_blank">
        <img alt="Heroku" src="https://www.herokucdn.com/deploy/button.svg" />
    </a>

2. **Render**

    <a aria-label="Deploy to Heroku" href="https://render.com/deploy?repo=https://github.com/Awesome-Tofu/google-reverse-api" target="_blank">
        <img alt="Heroku" src="https://render.com/images/deploy-to-render-button.svg" />
    </a>

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
