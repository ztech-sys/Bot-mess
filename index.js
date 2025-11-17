const puppeteer = require('puppeteer');

const FB_EMAIL = process.env.FB_EMAIL;
const FB_PASS = process.env.FB_PASS;
const THREAD_URL = process.env.THREAD_URL;

const MESSAGES = [
  "Xin chào từ bot😎"
];

const DELAY = 700;
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('https://www.messenger.com', { waitUntil: 'networkidle2' });

  await page.type('#email', FB_EMAIL);
  await page.type('#pass', FB_PASS);
  await page.click('#loginbutton');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.goto(THREAD_URL, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(2000);

  console.log("Bot đã vào chat!");

  while (true) {
    for (let msg of MESSAGES) {
      try {
        await page.waitForSelector('div[role="textbox"][contenteditable="true"]', { timeout: 5000 });
        const box = await page.$('div[role="textbox"][contenteditable="true"]');

        await box.focus();
        await page.evaluate((el, message) => {
          el.innerHTML = "";
          el.textContent = message;
          el.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            inputType: 'insertText',
            data: message
          }));
        }, box, msg);

        await page.keyboard.press('Enter');
        console.log("Sent:", msg);

        await sleep(DELAY);
      } catch (e) {
        console.log("Không tìm thấy box, chờ 2s...");
        await sleep(2000);
      }
    }
  }
})();

require('http').createServer((req, res) => res.end("alive")).listen(3000);
