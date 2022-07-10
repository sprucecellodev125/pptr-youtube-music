const puppeteer = require('puppeteer-extra');
const url = process.argv[2];

if (!url) {
	throw "Please gimme YouTube URL aight";
}

const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin());

(async () => {
    console.log('Starting puppeteer')
    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ['--mute-audio'],
        args: ["--autoplay-policy=no-user-gesture-required"]
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720
    });
    console.log('Opening direct link');
    await page.goto(url);
    await page.waitForTimeout('2000');
    console.log('Playing music');
    await page.waitForTimeout(99999999);
    await browser.close();
})();
