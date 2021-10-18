const puppeteer = require('puppeteer');

let myArgs = process.argv.slice(2)[0];
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://codequiz.azurewebsites.net/');

    const allResultsSelector = 'input[value=Accept]';
    await page.waitForSelector(allResultsSelector);
    await page.click(allResultsSelector);
    await delay(100);
    const data = await page.evaluate((myArgs) => {
        const tds = document.querySelectorAll('table tr td')
        for (let i = 0; i < tds.length; i++) {
            if (tds[i].innerText.includes(myArgs)) {
                return tds[i+1].innerText;
                break;
            }
        }
    }, myArgs);
    console.log(data);
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }