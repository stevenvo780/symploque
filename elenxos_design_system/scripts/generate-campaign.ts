#!/usr/bin/env npx tsx
/**
 * generate-campaign.ts — Genera imágenes de campaña por narrativa
 *
 * Uso:
 *   npx tsx scripts/generate-campaign.ts                         # todas las narrativas (50 imgs)
 *   npx tsx scripts/generate-campaign.ts --narrativa dolor       # solo Narrativa 1 (20 imgs)
 *   npx tsx scripts/generate-campaign.ts --narrativa solucion    # solo Narrativa 2 (20 imgs)
 *   npx tsx scripts/generate-campaign.ts --narrativa ecosistema  # solo Narrativa 3 (10 imgs)
 *   npx tsx scripts/generate-campaign.ts --lote 1                # solo Lote 1 (10 imgs)
 *   npx tsx scripts/generate-campaign.ts --lote 1,2              # Lotes 1 y 2 (20 imgs)
 *   npx tsx scripts/generate-campaign.ts --tipo post             # solo posts de todas las narrativas
 *   npx tsx scripts/generate-campaign.ts --tipo hybrid           # solo híbridos (necesitan AI images)
 *   npx tsx scripts/generate-campaign.ts --output ./mi-campaña   # directorio personalizado
 *
 * Los metadatos de campaña vienen de src/templates/registry.ts
 * (fuente única de verdad). Internamente invoca render-images.ts.
 */

import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CAMPAIGN_META, type CampaignMeta } from '../src/templates/registry';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ── Parse args ────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  let narrativa: string | null = null;
  let lotes: number[] | null = null;
  let tipo: string | null = null;
  let outputDir: string | null = null;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--narrativa':
        narrativa = args[++i];
        break;
      case '--lote':
        lotes = args[++i].split(',').map(Number);
        break;
      case '--tipo':
        tipo = args[++i];
        break;
      case '--output':
        outputDir = args[++i];
        break;
    }
  }

  return { narrativa, lotes, tipo, outputDir };
}

// ── Main ──────────────────────────────────────────────────────
function main() {
  const { narrativa, lotes, tipo, outputDir } = parseArgs();

  let selected: CampaignMeta[] = [...CAMPAIGN_META];

  if (narrativa) {
    selected = selected.filter(t => t.narrativa === narrativa);
    if (selected.length === 0) {
      console.error(`❌ Narrativa "${narrativa}" no encontrada.`);
      console.error(`   Opciones: dolor, solucion, ecosistema`);
      process.exit(1);
    }
  }

  if (lotes) {
    selected = selected.filter(t => lotes.includes(t.lote));
    if (selected.length === 0) {
      console.error(`❌ Lote(s) ${lotes.join(',')} no encontrado(s).`);
      console.error(`   Opciones: 1, 2, 3, 4, 5`);
      process.exit(1);
    }
  }

  if (tipo) {
    selected = selected.filter(t => t.tipo === tipo);
    if (selected.length === 0) {
      console.error(`❌ Tipo "${tipo}" no encontrado.`);
      console.error(`   Opciones: post, reel, story, banner, hybrid`);
      process.exit(1);
    }
  }

  const ids = selected.map(t => t.id).join(',');

  console.log(`\n╔══════════════════════════════════════════════════╗`);
  console.log(`║  AGORA Campaign Image Generator                 ║`);
  console.log(`╠══════════════════════════════════════════════════╣`);
  if (narrativa) console.log(`║  Narrativa: ${narrativa.padEnd(36)}║`);
  if (lotes)     console.log(`║  Lote(s):   ${lotes.join(', ').padEnd(36)}║`);
  if (tipo)      console.log(`║  Tipo:      ${tipo.padEnd(36)}║`);
  console.log(`║  Templates: ${String(selected.length).padEnd(36)}║`);

  // Breakdown
  const posts   = selected.filter(t => t.tipo === 'post').length;
  const reels   = selected.filter(t => t.tipo === 'reel').length;
  const stories = selected.filter(t => t.tipo === 'story').length;
  const banners = selected.filter(t => t.tipo === 'banner').length;
  const hybrids = selected.filter(t => t.tipo === 'hybrid').length;
  console.log(`║  → ${posts} posts, ${reels} reels, ${stories} stories, ${banners} banners, ${hybrids} hybrids ║`);
  console.log(`╚══════════════════════════════════════════════════╝\n`);

  if (hybrids > 0) {
    console.log(`⚠  Los ${hybrids} híbridos requieren imágenes AI en public/ai-images/campaign/`);
    console.log(`   Si no existen, esos templates se renderizarán con fondo vacío.\n`);
  }

  // Build render-images.ts command
  let cmd = `npx tsx scripts/render-images.ts --template ${ids}`;
  if (outputDir) cmd += ` --output ${outputDir}`;

  console.log(`[CMD] ${cmd}\n`);

  try {
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
  } catch {
    process.exit(1);
  }
}

main();
