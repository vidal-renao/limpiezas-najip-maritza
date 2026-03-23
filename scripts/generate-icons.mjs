/**
 * D'Namar Icon Generator
 * ----------------------
 * Generates all PWA icons, favicons, and apple-touch-icons from the logo.
 *
 * Requirements:
 *   npm install --save-dev sharp
 *
 * Usage:
 *   node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "public", "images", "N.jpeg");

const ICONS_DIR = join(ROOT, "public", "icons");
const PUBLIC_DIR = join(ROOT, "public");
const APP_DIR = join(ROOT, "app");

// Create output directory
if (!existsSync(ICONS_DIR)) mkdirSync(ICONS_DIR, { recursive: true });

// ── Icon definitions ─────────────────────────────────────────────────────────
const ICONS = [
  // PWA icons (manifest)
  { dest: join(ICONS_DIR, "icon-192.png"),        size: 192  },
  { dest: join(ICONS_DIR, "icon-512.png"),        size: 512  },
  { dest: join(ICONS_DIR, "icon-maskable-512.png"), size: 512, padding: 0.12 },

  // Apple touch icons
  { dest: join(PUBLIC_DIR, "apple-touch-icon.png"),        size: 180 },
  { dest: join(ICONS_DIR, "apple-touch-icon-152.png"),     size: 152 },
  { dest: join(ICONS_DIR, "apple-touch-icon-120.png"),     size: 120 },
  { dest: join(ICONS_DIR, "apple-touch-icon-76.png"),      size: 76  },

  // Standard favicons
  { dest: join(PUBLIC_DIR, "favicon-32x32.png"),    size: 32 },
  { dest: join(PUBLIC_DIR, "favicon-16x16.png"),    size: 16 },

  // OG / social (square crop)
  { dest: join(ICONS_DIR, "icon-96.png"),           size: 96  },
];

// ── Generate ─────────────────────────────────────────────────────────────────
async function generateIcon({ dest, size, padding = 0 }) {
  const paddingPx = Math.round(size * padding);
  const innerSize = size - paddingPx * 2;

  const pipeline = sharp(SOURCE)
    .resize(innerSize, innerSize, { fit: "cover", position: "centre" });

  if (padding > 0) {
    // Maskable icon: add white background with safe-zone padding
    const raw = await pipeline.png().toBuffer();
    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
    })
      .composite([{ input: raw, top: paddingPx, left: paddingPx }])
      .png()
      .toFile(dest);
  } else {
    await pipeline.png().toFile(dest);
  }

  console.log(`✓ ${dest.replace(ROOT, ".")} (${size}×${size})`);
}

// ── favicon.ico (multi-size) via 32px PNG ────────────────────────────────────
async function generateFaviconIco() {
  // Next.js serves app/favicon.ico — we write a proper PNG-based ICO replacement
  // For best results install "ico-endec" or just use the 32px PNG approach.
  // Here we generate a clean 32px PNG as fallback (browser auto-detects .ico).
  await sharp(SOURCE)
    .resize(32, 32, { fit: "cover", position: "centre" })
    .png()
    .toFile(join(APP_DIR, "favicon.png"));

  console.log("✓ ./app/favicon.png (32×32) — rename to favicon.ico if needed");
}

// ── Run all ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("🎨 D'Namar — Generating brand icons from N.jpeg...\n");

  await Promise.all(ICONS.map(generateIcon));
  await generateFaviconIco();

  console.log("\n✅ All icons generated successfully!");
  console.log("   → PWA icons:        /public/icons/icon-192.png, icon-512.png");
  console.log("   → Apple touch icon: /public/apple-touch-icon.png");
  console.log("   → Favicons:         /public/favicon-32x32.png, favicon-16x16.png");
  console.log("\n📋 Next steps:");
  console.log("   1. Run: npm run build");
  console.log("   2. Deploy to Vercel");
  console.log("   3. Open site on mobile → 'Add to Home Screen' banner will appear");
}

main().catch((err) => {
  console.error("❌ Icon generation failed:", err.message);
  process.exit(1);
});
