const pt = require('puppeteer');

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const randomLetter1 = letters[Math.floor(Math.random() * 25)];
const randomLetter2 = letters[Math.floor(Math.random() * 25)];
const randomNumber = Math.floor(Math.random() * 1000);

module.exports = async function scrapeImages(url) {
  try {
    const browser = await pt.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const img = await page.screenshot({
      path: `${randomLetter1}${randomNumber}${randomLetter2}.png`,
    });

    await browser.close();

    return img;
  } catch (err) {
    console.error({ err, msg: err.message });
  }
};
