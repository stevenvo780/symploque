import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('http://localhost:5174/render.html?template=lote1_estandar');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'debug-screenshot.png' });
  await browser.close();
})();
