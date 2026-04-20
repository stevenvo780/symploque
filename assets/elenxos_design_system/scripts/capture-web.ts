import { chromium } from 'playwright';
import { resolve } from 'path';

const outDir = resolve(import.meta.dirname, '../../output_screenshots');
import { existsSync, mkdirSync } from 'fs';
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('Navegando a agora.elenxos.com...');
  await page.goto('https://agora.elenxos.com/', { waitUntil: 'networkidle' });
  
  // 1. Hero
  console.log('Capturando Hero...');
  await page.screenshot({ path: resolve(outDir, 'agora_hero.png') });
  
  // 2. Módulo de ST (buscar algún ejemplo o bajar)
  console.log('Capturando Módulo ST (scroll down)...');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: resolve(outDir, 'agora_st_example.png') });
  
  // 3. Docs
  console.log('Navegando a agora.elenxos.com/docs...');
  await page.goto('https://agora.elenxos.com/docs', { waitUntil: 'networkidle' });
  await page.screenshot({ path: resolve(outDir, 'agora_docs.png') });
  
  await browser.close();
  console.log('Capturas completadas.');
})();
