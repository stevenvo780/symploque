/**
 * render-video.ts — Genera videos MP4 desde templates React con animaciones
 *
 * Usa Playwright screencast para capturar las animaciones CSS/JS del
 * design system y producir reels/stories como videos.
 *
 * Uso:
 *   npx tsx scripts/render-video.ts                         # todos los reels/stories
 *   npx tsx scripts/render-video.ts --template reel_original
 *   npx tsx scripts/render-video.ts --template n1_l1_reel_dolor,reel_manifiesto
 *   npx tsx scripts/render-video.ts --duration 6            # duración en segundos (default: 8)
 *   npx tsx scripts/render-video.ts --output ./mi-videos
 *   npx tsx scripts/render-video.ts --all                   # todos los templates (incluye posts/banners)
 *
 * Flujo:
 *   1. Levanta Vite dev server
 *   2. Playwright con screencast (recordVideo) captura la animación
 *   3. Espera {duration} segundos de grabación
 *   4. Cierra → guarda .webm → ffmpeg convierte a .mp4
 *   5. Output: output/video/{category}/{id}.mp4
 *
 * Nota: Por defecto solo genera video para reels y stories (formato vertical,
 * ideal para reels de Instagram/TikTok). Usa --all para todos los formatos.
 */

import { spawn, execSync, type ChildProcess } from 'child_process';
import { mkdirSync, readFileSync, unlinkSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TEMPLATE_DATA, getTemplateById, type TemplateInfo } from '../src/templates/registry';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

interface RenderSpecItem {
  templateId: string;
  outputName?: string;
  aiBackgroundPath?: string | null;
}

interface RenderJob {
  template: TemplateInfo;
  outputName: string;
  aiBackgroundPath: string | null;
}

// ── Args ─────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  let templateFilter: string[] | null = null;
  let specPath: string | null = null;
  let outputDir = join(ROOT, 'output', 'video');
  let duration = 8; // seconds
  let allFormats = false;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--template':
        templateFilter = args[++i].split(',').map(s => s.trim());
        break;
      case '--spec':
        specPath = resolve(args[++i]);
        break;
      case '--output':
        outputDir = resolve(args[++i]);
        break;
      case '--duration':
        duration = Number(args[++i]);
        break;
      case '--all':
        allFormats = true;
        break;
    }
  }

  if (specPath) {
    const parsed = JSON.parse(readFileSync(specPath, 'utf-8')) as RenderSpecItem[] | { items?: RenderSpecItem[] };
    const rawItems = Array.isArray(parsed) ? parsed : parsed.items;

    if (!Array.isArray(rawItems)) {
      throw new Error('El archivo --spec debe ser un array JSON o un objeto con { items }.');
    }

    const jobs = rawItems.map((item, index): RenderJob => {
      if (!item || typeof item.templateId !== 'string' || item.templateId.trim() === '') {
        throw new Error(`Item inválido en --spec[${index}]: falta templateId.`);
      }

      const template = getTemplateById(item.templateId.trim());
      if (!template) {
        throw new Error(`Template no encontrado en --spec[${index}]: ${item.templateId}`);
      }

      const outputName = typeof item.outputName === 'string' && item.outputName.trim()
        ? item.outputName.trim()
        : template.id;

      return {
        template,
        outputName,
        aiBackgroundPath: typeof item.aiBackgroundPath === 'string' && item.aiBackgroundPath.trim()
          ? item.aiBackgroundPath.trim()
          : null,
      };
    });

    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error('La duración de video debe ser un número mayor que 0.');
    }

    return { jobs, outputDir, duration };
  }

  let selected: TemplateInfo[];

  if (templateFilter) {
    selected = TEMPLATE_DATA.filter(t => templateFilter!.includes(t.id));
  } else if (allFormats) {
    selected = TEMPLATE_DATA;
  } else {
    // Default: solo reels (formato vertical = ideal para video/reel)
    selected = TEMPLATE_DATA.filter(t => t.format === 'reel');
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error('La duración de video debe ser un número mayor que 0.');
  }

  const jobs = selected.map((template): RenderJob => ({
    template,
    outputName: template.id,
    aiBackgroundPath: null,
  }));

  return { jobs, outputDir, duration };
}

// ── Vite dev server ──────────────────────────────────────────
function startVite(): Promise<{ proc: ChildProcess; url: string }> {
  return new Promise((resolveP, reject) => {
    const proc = spawn('npx', ['vite', '--port', '0', '--strictPort', 'false'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    });

    let output = '';
    const onData = (chunk: Buffer) => {
      output += chunk.toString();
      const match = output.match(/Local:\s+(http:\/\/localhost:\d+)/);
      if (match) {
        resolveP({ proc, url: match[1] });
      }
    };

    proc.stdout?.on('data', onData);
    proc.stderr?.on('data', onData);
    proc.on('error', reject);

    setTimeout(() => reject(new Error('Vite did not start in 30s')), 30_000);
  });
}

// ── WebM → MP4 con ffmpeg ────────────────────────────────────
function convertToMp4(webmPath: string, mp4Path: string): void {
  execSync(
    `ffmpeg -y -i "${webmPath}" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -an "${mp4Path}"`,
    { stdio: 'pipe' },
  );
  unlinkSync(webmPath);
}

// ── Main ─────────────────────────────────────────────────────
async function main() {
  const { jobs, outputDir, duration } = parseArgs();

  if (jobs.length === 0) {
    console.error('❌ No templates matched the filter.');
    process.exit(1);
  }

  // Check ffmpeg
  try {
    execSync('which ffmpeg', { stdio: 'pipe' });
  } catch {
    console.error('❌ ffmpeg no encontrado. Instálalo: sudo apt install ffmpeg');
    process.exit(1);
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  ELENXOS React→VIDEO Renderer`);
  console.log(`  Renders:   ${jobs.length}`);
  console.log(`  Duration:  ${duration}s per video`);
  console.log(`  Output:    ${outputDir}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  // 1. Start Vite
  console.log('[VITE] Starting dev server...');
  const { proc: viteProc, url: baseUrl } = await startVite();
  console.log(`[VITE] Ready at ${baseUrl}`);

  let ok = 0;
  let fail = 0;

  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch({ headless: true });

    for (const job of jobs) {
      const tmpl = job.template;
      const categoryDir = join(outputDir, tmpl.category);
      mkdirSync(categoryDir, { recursive: true });

      const mp4Path = join(categoryDir, `${job.outputName}.mp4`);

      try {
        console.log(`\n[${ok + fail + 1}/${jobs.length}] 🎬 ${job.outputName} ← ${tmpl.id} (${tmpl.width}×${tmpl.height}, ${duration}s)`);

        // Create browser context with screencast recording
        const context = await browser.newContext({
          viewport: { width: tmpl.width, height: tmpl.height },
          deviceScaleFactor: 1,
          recordVideo: {
            dir: categoryDir,
            size: { width: tmpl.width, height: tmpl.height },
          },
        });

        const page = await context.newPage();

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            console.error(`  [BROWSER ERROR] ${msg.text()}`);
          }
        });

        // Navigate — use render.html with scale=1 for pixel-perfect capture
        const renderUrl = new URL(`${baseUrl}/render.html`);
        renderUrl.searchParams.set('template', tmpl.id);
        if (job.aiBackgroundPath) {
          renderUrl.searchParams.set('aiBg', job.aiBackgroundPath);
        }
        await page.goto(renderUrl.toString(), { waitUntil: 'networkidle' });

        // Wait for template mount
        const selector = `[data-template-id="${tmpl.id}"]`;
        await page.waitForSelector(selector, { timeout: 15_000 });

        // Let animations play for the specified duration
        console.log(`  ⏳ Recording ${duration}s of animation...`);
        await page.waitForTimeout(duration * 1000);

        const video = page.video();
        if (!video) throw new Error('No video recorded');

        // Close the page to finalize the recording before reading the file path.
        await page.close();
        const webmPath = await video.path();
        await context.close();

        // Convert WebM → MP4 with ffmpeg
        console.log(`  🔄 Converting to MP4...`);
        convertToMp4(webmPath, mp4Path);

        console.log(`  ✓ ${mp4Path}`);
        ok++;
      } catch (err: any) {
        console.error(`  ✗ Error: ${err.message}`);
        fail++;
      }
    }

    await browser.close();
  } finally {
    viteProc.kill('SIGTERM');
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  RESULTADO: ${ok}/${jobs.length} videos generados`);
  if (fail > 0) console.log(`  Errores: ${fail}`);
  console.log(`  Output: ${outputDir}`);
  console.log(`═══════════════════════════════════════════════════\n`);

  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
