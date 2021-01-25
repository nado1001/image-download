const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 対象URL
const url = ""

// userAgent指定
// PC
const userAgent = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)';

// iPhone
// const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4';

// Android
// const userAgent = 'Mozilla/5.0 (Linux; Android 4.4.2; SH-01F Build/SA090) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36';

async function autoScroll(page){
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
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

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setUserAgent(userAgent);
  // view portの設定
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto(url);
  await page.waitForTimeout(3000);

  // ページ下部までスクロール（lazy load対応）
  await autoScroll(page);

  // 除去したい要素
  await page.evaluate(() => {
    // document.querySelector('header').remove();
    // document.querySelector('footer').remove();
  });
  
  const images = await page.evaluate(() => 
    Array.from(document.querySelectorAll('img')).map(image => image.src)
  )
  const imageNames = await page.evaluate(() => 
    Array.from(document.querySelectorAll('img')).map(image => image.src.split('/').pop())
  )

  for(let i = 0; i < images.length; i ++){
    let localfilefullpath = path.join(__dirname, `/image/${imageNames[i]}`);

    const viewSource = await page.goto(images[i]);
    fs.writeFile(localfilefullpath, await viewSource.buffer(), (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(imageNames[i]);
    });
    await page.waitForTimeout(1000);
  }
  await browser.close();
})();