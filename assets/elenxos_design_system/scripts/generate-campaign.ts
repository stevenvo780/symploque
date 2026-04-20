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
 * Internamente invoca render-images.ts con el filtro adecuado.
 */

import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ── Catálogo de templates por narrativa/lote ──────────────────
interface CampaignTemplate {
  id: string;
  narrativa: string;
  lote: number;
  tipo: 'post' | 'reel' | 'story' | 'banner' | 'hybrid';
}

const CAMPAIGN: CampaignTemplate[] = [
  // ── Narrativa 1: Dolor — Lote 1: Caos digital ──
  { id: 'n1_l1_post_caos',         narrativa: 'dolor', lote: 1, tipo: 'post' },
  { id: 'n1_l1_post_archivos',     narrativa: 'dolor', lote: 1, tipo: 'post' },
  { id: 'n1_l1_post_pregunta',     narrativa: 'dolor', lote: 1, tipo: 'post' },
  { id: 'n1_l1_reel_dolor',        narrativa: 'dolor', lote: 1, tipo: 'reel' },
  { id: 'n1_l1_story_stat',        narrativa: 'dolor', lote: 1, tipo: 'story' },
  { id: 'n1_l1_banner_linkedin',   narrativa: 'dolor', lote: 1, tipo: 'banner' },
  { id: 'n1_l1_banner_x',          narrativa: 'dolor', lote: 1, tipo: 'banner' },
  { id: 'n1_l1_hybrid_caos',       narrativa: 'dolor', lote: 1, tipo: 'hybrid' },
  { id: 'n1_l1_hybrid_escritorio', narrativa: 'dolor', lote: 1, tipo: 'hybrid' },
  { id: 'n1_l1_hybrid_antes',      narrativa: 'dolor', lote: 1, tipo: 'hybrid' },

  // ── Narrativa 1: Dolor — Lote 2: Fragmentación ──
  { id: 'n1_l2_post_fragmentos',   narrativa: 'dolor', lote: 2, tipo: 'post' },
  { id: 'n1_l2_post_ciclo',        narrativa: 'dolor', lote: 2, tipo: 'post' },
  { id: 'n1_l2_post_dato',         narrativa: 'dolor', lote: 2, tipo: 'post' },
  { id: 'n1_l2_reel_flujo',        narrativa: 'dolor', lote: 2, tipo: 'reel' },
  { id: 'n1_l2_story_antes',       narrativa: 'dolor', lote: 2, tipo: 'story' },
  { id: 'n1_l2_banner_contraste',  narrativa: 'dolor', lote: 2, tipo: 'banner' },
  { id: 'n1_l2_banner_pregunta',   narrativa: 'dolor', lote: 2, tipo: 'banner' },
  { id: 'n1_l2_hybrid_red',        narrativa: 'dolor', lote: 2, tipo: 'hybrid' },
  { id: 'n1_l2_hybrid_nodos',      narrativa: 'dolor', lote: 2, tipo: 'hybrid' },
  { id: 'n1_l2_hybrid_puente',     narrativa: 'dolor', lote: 2, tipo: 'hybrid' },

  // ── Narrativa 2: Solución — Lote 3: Flujo unificado ──
  { id: 'n2_l3_post_flujo',        narrativa: 'solucion', lote: 3, tipo: 'post' },
  { id: 'n2_l3_post_markdown',     narrativa: 'solucion', lote: 3, tipo: 'post' },
  { id: 'n2_l3_post_verificacion', narrativa: 'solucion', lote: 3, tipo: 'post' },
  { id: 'n2_l3_reel_demo',         narrativa: 'solucion', lote: 3, tipo: 'reel' },
  { id: 'n2_l3_story_feature',     narrativa: 'solucion', lote: 3, tipo: 'story' },
  { id: 'n2_l3_banner_solucion',   narrativa: 'solucion', lote: 3, tipo: 'banner' },
  { id: 'n2_l3_banner_cta',        narrativa: 'solucion', lote: 3, tipo: 'banner' },
  { id: 'n2_l3_hybrid_flujo',      narrativa: 'solucion', lote: 3, tipo: 'hybrid' },
  { id: 'n2_l3_hybrid_editor',     narrativa: 'solucion', lote: 3, tipo: 'hybrid' },
  { id: 'n2_l3_hybrid_equipo',     narrativa: 'solucion', lote: 3, tipo: 'hybrid' },

  // ── Narrativa 2: Solución — Lote 4: Rigor formal ──
  { id: 'n2_l4_post_rigor',        narrativa: 'solucion', lote: 4, tipo: 'post' },
  { id: 'n2_l4_post_logica',       narrativa: 'solucion', lote: 4, tipo: 'post' },
  { id: 'n2_l4_post_motor',        narrativa: 'solucion', lote: 4, tipo: 'post' },
  { id: 'n2_l4_reel_rigor',        narrativa: 'solucion', lote: 4, tipo: 'reel' },
  { id: 'n2_l4_story_formal',      narrativa: 'solucion', lote: 4, tipo: 'story' },
  { id: 'n2_l4_banner_formal',     narrativa: 'solucion', lote: 4, tipo: 'banner' },
  { id: 'n2_l4_banner_motor',      narrativa: 'solucion', lote: 4, tipo: 'banner' },
  { id: 'n2_l4_hybrid_rigor',      narrativa: 'solucion', lote: 4, tipo: 'hybrid' },
  { id: 'n2_l4_hybrid_pensar',     narrativa: 'solucion', lote: 4, tipo: 'hybrid' },
  { id: 'n2_l4_hybrid_cta',        narrativa: 'solucion', lote: 4, tipo: 'hybrid' },

  // ── Narrativa 3: Ecosistema — Lote 5: Comunidad ──
  { id: 'n3_l5_post_semillero',    narrativa: 'ecosistema', lote: 5, tipo: 'post' },
  { id: 'n3_l5_post_cooperar',     narrativa: 'ecosistema', lote: 5, tipo: 'post' },
  { id: 'n3_l5_post_futuro',       narrativa: 'ecosistema', lote: 5, tipo: 'post' },
  { id: 'n3_l5_reel_vision',       narrativa: 'ecosistema', lote: 5, tipo: 'reel' },
  { id: 'n3_l5_story_unete',       narrativa: 'ecosistema', lote: 5, tipo: 'story' },
  { id: 'n3_l5_banner_ecosistema', narrativa: 'ecosistema', lote: 5, tipo: 'banner' },
  { id: 'n3_l5_banner_cta',        narrativa: 'ecosistema', lote: 5, tipo: 'banner' },
  { id: 'n3_l5_hybrid_comunidad',  narrativa: 'ecosistema', lote: 5, tipo: 'hybrid' },
  { id: 'n3_l5_hybrid_red',        narrativa: 'ecosistema', lote: 5, tipo: 'hybrid' },
  { id: 'n3_l5_hybrid_agora',      narrativa: 'ecosistema', lote: 5, tipo: 'hybrid' },
];

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

  let selected = [...CAMPAIGN];

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
