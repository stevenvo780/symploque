/**
 * render-images.ts — Genera PNGs pixel-perfect desde templates React
 *
 * Uso:
 *   npx tsx scripts/render-images.ts                  # todos los templates
 *   npx tsx scripts/render-images.ts --all             # alias de todos
 *   npx tsx scripts/render-images.ts --template post_tesis
 *   npx tsx scripts/render-images.ts --template post_tesis,banner_minimal
 *   npx tsx scripts/render-images.ts --output ./mi-carpeta
 *
 * Flujo:
 *   1. Levanta Vite dev server en un puerto aleatorio
 *   2. Abre Playwright (Chromium headless)
 *   3. Para cada template: navega, espera render, screenshot del elemento
 *   4. Guarda PNG en output/react/{category}/{id}.png
 */

import { execSync, spawn, type ChildProcess } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ── Template registry (mirror of RenderPage.tsx) ─────────────
interface TemplateInfo {
  id: string;
  format: 'post' | 'reel' | 'banner';
  width: number;
  height: number;
  category: string;
}

const TEMPLATES: TemplateInfo[] = [
  { id: 'post_tesis',         format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_micelio',       format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_cita_roja',     format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_perspectiva',   format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_glass',         format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_simbolo',       format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_datos_split',   format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_pregunta',      format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'post_proximamente',  format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'lote1_estandar',     format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'lote1_flujo',        format: 'post',   width: 1080, height: 1080, category: 'instagram' },
  { id: 'banner_original',    format: 'banner', width: 1500, height: 500,  category: 'linkedin' },
  { id: 'banner_minimal',     format: 'banner', width: 1500, height: 500,  category: 'linkedin' },
  { id: 'banner_denso',       format: 'banner', width: 1500, height: 500,  category: 'linkedin' },
  { id: 'banner_conferencia', format: 'banner', width: 1500, height: 500,  category: 'linkedin' },
  { id: 'reel_original',      format: 'reel',   width: 1080, height: 1920, category: 'instagram' },
  { id: 'reel_manifiesto',    format: 'reel',   width: 1080, height: 1920, category: 'instagram' },
  { id: 'reel_simbolo',       format: 'reel',   width: 1080, height: 1920, category: 'instagram' },
  // Hybrid: AI image + React components
  { id: 'hybrid_arbol_tesis',      format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_problema',         format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_respuesta',        format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_diferenciador',    format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_madurez',          format: 'post',   width: 1080, height: 1080, category: 'hybrid' },
  { id: 'hybrid_reel_manifiesto',  format: 'reel',   width: 1080, height: 1920, category: 'hybrid' },
  { id: 'hybrid_story_teaser',     format: 'reel',   width: 1080, height: 1920, category: 'hybrid' },
  { id: 'hybrid_banner_linkedin',  format: 'banner', width: 1500, height: 500,  category: 'hybrid' },
  { id: 'hybrid_banner_og',        format: 'banner', width: 1500, height: 500,  category: 'hybrid' },
  { id: 'hybrid_banner_x',         format: 'banner', width: 1500, height: 500,  category: 'hybrid' },
  { id: 'hybrid_banner_yt',        format: 'banner', width: 1500, height: 500,  category: 'hybrid' },
];

// ── Args ─────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  let templateFilter: string[] | null = null;
  let outputDir = join(ROOT, 'output', 'react');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--template' && args[i + 1]) {
      templateFilter = args[i + 1].split(',').map((s: string) => s.trim());
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputDir = resolve(args[i + 1]);
      i++;
    }
    // --all is default
  }

  const selected = templateFilter
    ? TEMPLATES.filter(t => templateFilter!.includes(t.id))
    : TEMPLATES;

  return { selected, outputDir };
}

// ── Vite dev server ──────────────────────────────────────────
function startVite(): Promise<{ proc: ChildProcess; url: string }> {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', '--port', '0', '--strictPort', 'false'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let output = '';
    const onData = (chunk: Buffer) => {
      output += chunk.toString();
      // Vite prints: Local: http://localhost:XXXX/
      const match = output.match(/Local:\s+(http:\/\/localhost:\d+)/);
      if (match) {
        resolve({ proc, url: match[1] });
      }
    };

    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);
    proc.on('error', reject);

    setTimeout(() => reject(new Error('Vite did not start in 30s')), 30_000);
  });
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  const { selected, outputDir } = parseArgs();

  if (selected.length === 0) {
    console.error('❌ No templates matched the filter.');
    process.exit(1);
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  ELENXOS React→PNG Renderer`);
  console.log(`  Templates: ${selected.length}`);
  console.log(`  Output: ${outputDir}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  // 1. Start Vite
  console.log('[VITE] Starting dev server...');
  const { proc: viteProc, url: baseUrl } = await startVite();
  console.log(`[VITE] Ready at ${baseUrl}`);

  let ok = 0;
  let fail = 0;

  try {
    // 2. Launch Playwright
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true });

    for (const tmpl of selected) {
      const outPath = join(outputDir, tmpl.category, `${tmpl.id}.png`);
      mkdirSync(join(outputDir, tmpl.category), { recursive: true });

      try {
        console.log(`\n[${ok + fail + 1}/${selected.length}] ${tmpl.id} (${tmpl.width}×${tmpl.height})`);

        // Create page with exact viewport
        const page = await browser.newPage({
          viewport: { width: tmpl.width, height: tmpl.height },
          deviceScaleFactor: 1,
        });

        // Capture browser console errors for debugging
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            console.error(`  [BROWSER ERROR] ${msg.text()}`);
          }
        });
        page.on('pageerror', (err) => {
          console.error(`  [PAGE ERROR] ${err.message}`);
        });

        // Navigate to render page for this specific template
        const renderUrl = `${baseUrl}/render.html?template=${tmpl.id}`;
        await page.goto(renderUrl, { waitUntil: 'networkidle' });

        // Wait for the template element to mount
        const selector = `[data-template-id="${tmpl.id}"]`;
        try {
          await page.waitForSelector(selector, { timeout: 15_000 });
        } catch (waitErr) {
          const idsOnPage = await page.$$eval('[data-template-id]', (nodes) =>
            nodes.map((n) => n.getAttribute('data-template-id') || ''),
          );
          console.error(`  [DEBUG] IDs en página: ${idsOnPage.join(', ') || '(none)'}`);

          const viteOverlayText = await page.evaluate(() => {
            const overlay = document.querySelector('vite-error-overlay');
            if (!overlay) return '';
            return (
              (overlay.shadowRoot?.textContent || overlay.textContent || '').trim().slice(0, 1200)
            );
          });
          if (viteOverlayText) {
            console.error(`  [VITE ERROR] ${viteOverlayText}`);
          }

          throw waitErr;
        }

        // Wait for ALL finite (non-infinite) CSS animations to complete.
        // This uses the Web Animations API to detect every running animation
        // and waits for those with finite iterations to reach their end state.
        await page.evaluate(async () => {
          // Give React a tick to mount and let animations start.
          await new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(resolve));
          });

          const finiteAnimations = document.getAnimations().filter((animation) => {
            const effect = animation.effect as KeyframeEffect | null;
            if (!effect?.getComputedTiming) return false;
            const timing = effect.getComputedTiming();
            return timing.iterations !== Infinity;
          });

          if (finiteAnimations.length === 0) return;

          // Wait for finite animations, but don't hang forever.
          await Promise.race([
            Promise.allSettled(finiteAnimations.map((animation) => animation.finished)),
            new Promise((resolve) => setTimeout(resolve, 12_000)),
          ]);
        });

        // Extra settle time for any CSS transitions triggered after animations
        await page.waitForTimeout(300);

        // Screenshot just the template element at exact dimensions
        const element = await page.$(selector);
        if (!element) throw new Error(`Element ${selector} not found`);

        await element.screenshot({
          path: outPath,
          type: 'png',
        });

        await page.close();
        console.log(`  ✓ ${outPath}`);
        ok++;
      } catch (err: any) {
        console.error(`  ✗ Error: ${err.message}`);
        fail++;
      }
    }

    await browser.close();
  } finally {
    // 3. Kill Vite
    viteProc.kill('SIGTERM');
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  RESULTADO: ${ok}/${selected.length} imágenes generadas`);
  if (fail > 0) console.log(`  Errores: ${fail}`);
  console.log(`  Output: ${outputDir}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
