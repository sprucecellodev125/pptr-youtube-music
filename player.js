const puppeteer = require('puppeteer');
const url = process.argv[2];

if (!url) {
	throw "Please gimme song name aight";
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './data2',
        args: ["--autoplay-policy=no-user-gesture-required"],
        ignoreDefaultArgs: ['--mute-audio'],
        ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720
    });
    await page.goto('https://google.com');
    await page.click('input[class="gLFyf gsfi"]');
    await page.focus('input[class="gLFyf gsfi"]');
    await page.type('input.gLFyf.gsfi', url);
    await page.keyboard.press('Enter'); 
    await page.waitForTimeout('5000');
    await page.click('div.twQ0Be');
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
