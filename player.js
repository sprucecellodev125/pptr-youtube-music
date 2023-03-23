const puppeteer = require('puppeteer-extra');
const prompt = require("prompt-sync")({ sigint: true });
const input = prompt("Input your song name: ");

const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin());

(async () => {
    console.log('Starting puppeteer')
    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--mute-audio'],
        args: ["--autoplay-policy=no-user-gesture-required"]
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720
    });
    console.log('Scraping YouTube');
    await page.goto('https://youtube.com');
    await page.click('div#search-input.ytd-searchbox-spt');
    await page.focus('div#search-input.ytd-searchbox-spt');
    await page.type('div#search-input.ytd-searchbox-spt', input);
    await page.keyboard.press('Enter'); 
    await page.waitForTimeout('2000');
    await page.click('a#video-title.yt-simple-endpoint.style-scope.ytd-video-renderer');
    console.log('Playing music');
    await page.waitForTimeout(99999999);
    await browser.close();
})();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
