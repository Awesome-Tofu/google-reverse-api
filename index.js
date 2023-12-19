const express = require('express');
const puppeteer = require('puppeteer');
require('dotenv').config();

const app = express();
const PORT = 3000;

let browserInstance = null;

const puppeteerExecutablePath =
  process.env.NODE_ENV === 'production'
    ? process.env.PUPPETEER_EXECUTABLE_PATH
    : puppeteer.executablePath();


app.get('/', (req, res)=>{
    res.json({exmaple:"/reverse?url=https://te.legra.ph/file/14632fbfeea4766941a14.png", repo:"https://github.com/awesome-Tofu/google-reverse-api"})
})

app.get('/reverse', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    if (!browserInstance) {
      browserInstance = await puppeteer.launch({
        executablePath: puppeteerExecutablePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null,
        timeout: 20000,
    });

    }

    const page = await browserInstance.newPage();


    const navigationPromise = page.waitForNavigation({
      timeout: 10000, // Set a specific timeout for this navigation (adjust as needed)
      waitUntil: 'domcontentloaded', // Wait until the DOM content is loaded
    });

    await page.goto(`https://images.google.com/searchbyimage?safe=off&sbisrc=tg&image_url=${imageUrl}`);

    await navigationPromise;

    // Wait for some time to ensure the page is fully loaded (adjust as needed)
    await page.waitForTimeout(5000);

    const textareaValue = await page.evaluate(() => {
      const textareaElement = document.querySelector('textarea[type="search"]');
      return textareaElement ? textareaElement.textContent.trim() : null;
    });

    if (!textareaValue) {
      return res.json({ result: { message: 'Cannot find the matched image from the URL' } });
    }

    res.json({ result: { image: textareaValue, requestUrl: `https://images.google.com/searchbyimage?safe=off&sbisrc=tg&image_url=${imageUrl}` }, similarUrl:`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(textareaValue)}` });
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
