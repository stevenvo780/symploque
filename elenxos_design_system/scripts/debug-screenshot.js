#!/usr/bin/env npx tsx
/**
 * debug-screenshot.ts — Captura rápida de un template para depuración
 *
 * Uso: npx tsx scripts/debug-screenshot.js [template_id]
 * Requiere: Vite dev server corriendo (npm run dev)
 */
import { chromium } from 'playwright';

const templateId = process.argv[2] || 'lote1_estandar';
const PORT = 5173;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto(`http://localhost:${PORT}/render.html?template=${templateId}`);
  await page.waitForTimeout(3000);
  const outPath = `debug-${templateId}.png`;
  await page.screenshot({ path: outPath });
  console.log(`✅ Screenshot guardado: ${outPath}`);
  await browser.close();
})();
