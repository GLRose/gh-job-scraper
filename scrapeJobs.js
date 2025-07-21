
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://github.com/remoteintech/remote-jobs?tab=readme-ov-file'); // Replace with actual URL
  await page.waitForSelector('table'); // wait for the table to load

  const data = await page.$$eval('table tr', rows => {
    return Array.from(rows)
      .map(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length === 3) {
          return {
            name: cells[0].innerText.trim(),
            website: cells[1].innerText.trim(),
            region: cells[2].innerText.trim(),
          };
        }
        return null;
      })
      .filter(row => row !== null);
  });

  fs.writeFileSync('./jobdata/allJobs.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ Data saved to allJobs.json');

  await browser.close();
})();
