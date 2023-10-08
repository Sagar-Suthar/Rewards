const puppeteer = require('puppeteer');
const fs = require('fs');
const { exit } = require('process');

// var puppeteer_args = [
//   '--no-sandbox',
//   '--window-size=1920,1080',
// ];

// const puppeteer_opts = {
//   headless: true,
//   args: puppeteer_args,
// };
// (async function main() {
//   try {
//     const browser = await puppeteer.launch(puppeteer_opts);
//     const page = await browser.newPage();
//     await page.setViewport({width:1920, height:1080});

//     // await page.goto('https://login.live.com/', { waitUntil: 'networkidle0',timeout:0 });
//     await page.goto('https://login.live.com/', { waitUntil: 'networkidle0',timeout:60000 });
   
// //     const content = await page.evaluate(() => document.querySelector('.ltr_override').outerHTML);
// // console.log(content)
// // exit()
//     // const content = await page.evaluate(() => document.querySelector('*').outerHTML);
//     // let content = await page.content();
//     // fs.writeFileSync('output.html', content);

//     // console.log(content)
//     // exit()

//     await browser.close();
//   } catch (err) {
//     console.error(err);
//   }
// })();
// -----------------------------------------------------------------------------------------------------------------------------------------------

function blockingWait(seconds) {
  //simple blocking technique (wait...)
  var waitTill = new Date(new Date().getTime() + seconds * 1000);
  while(waitTill > new Date()){}

}
const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://login.live.com/", {
    waitUntil: "domcontentloaded",
  });

//   await page.waitForTimeout(3000);
    var ele = await page.waitForXPath("//input[@name='loginfmt']",{timeout:0})
    await ele.type('sagarsuthar2001@gmail.com');

    var ele = await page.waitForXPath("//input[@id='idSIButton9']",{timeout:0})
    await ele.click();

    var ele = await page.waitForXPath("//input[@name='passwd']",{timeout:0})
    await ele.type('sagar9561');
  await page.waitForTimeout(1000);

    var ele2 = await page.waitForXPath("//input[@value='Sign in']",{timeout:0})
    await ele2.click();
    
    var ele = await page.waitForXPath("//input[@id='idBtn_Back']",{timeout:0})
    await ele.click();

    await page.waitForTimeout(30000);
    
    var ele = await page.waitForXPath("//div[@id='home.cards.card.rewards.cold']",{timeout:0})
    // await ele.click();
    // await page.close();
    
    if(ele !== false){

      const page1 = await browser.newPage();
      await page1.goto("https://rewards.bing.com/", {waitUntil: "domcontentloaded"});

      await page.waitForTimeout(10000);
      await page1.waitForTimeout(10000);

      var cards = await page1.$$(".ds-card-sec")
      
      for (let i = 0; i < cards.length; i++) {
          var card = cards[i];

          card.click()
          // blockingWait(3)
          // var close = await page.waitForXPath("//button[@class='c-glyph glyph-cancel']",{timeout:0})
          // close.click()
          await page1.bringToFront();
          blockingWait(2)
      }
      console.log('done')
    }

};
// Start the scraping
getQuotes();
