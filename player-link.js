const puppeteer = require('puppeteer');
const url = process.argv[2];

if (!url) {
	throw "Please gimme YouTube URL aight";
}

console.log('Starting puppeteer');
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
    await page.evaluate(() => {         
        self.moHandler = {
            changesObserver: function (mutation) {                
                if (mutation.type === 'attributes'){
                    if(mutation.target.className == 'ytp-ad-skip-button ytp-button' || mutation.target.className == 'style-scope ytd-button-renderer style-text size-default'){                      
                        mutation.target.click(); 
                    }
                }                  
            },
            subscriber: function (mutations) {              
                mutations.forEach((mutation) => {
                    self.moHandler.changesObserver(mutation);
                });                             
            },
            init: function () {            
                const target = self.document.documentElement;
                const config = {
                    attributes: true                    
                };
                self.mObserver = new MutationObserver(self.moHandler.subscriber);
                self.mObserver.observe(target, config);
            }
        }
        self.moHandler.init(); 
    });
    await page.waitForTimeout(99999999);
    await browser.close();
})();
