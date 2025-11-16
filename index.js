const puppeteer = require('puppeteer');

const FB_EMAIL = process.env.FB_EMAIL;
const FB_PASS = process.env.FB_PASS;
const THREAD_URL = process.env.THREAD_URL;

const MESSAGES = ["Test 1", "Test 2"];
const DELAY = 700;

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

(async () => {
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.messenger.com');
  await page.type('#email', FB_EMAIL, {delay:50});
  await page.type('#pass', FB_PASS, {delay:50});
  await page.click('#loginbutton');
  await page.waitForNavigation({waitUntil:'networkidle2'});
  await page.goto(THREAD_URL, {waitUntil:'networkidle2'});

  while(true){
    for(let msg of MESSAGES){
      const box = await page.$('div[contenteditable="true"]');
      if(!box) { await sleep(1000); continue; }
      await box.focus();
      await page.keyboard.type(msg,{delay:20});
      await page.keyboard.press('Enter');
      await sleep(DELAY);
    }
  }
})();

require('http').createServer((req,res)=>res.end("alive")).listen(3000);
