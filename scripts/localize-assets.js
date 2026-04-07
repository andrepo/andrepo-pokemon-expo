#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets/images/game');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

async function downloadFile(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
}

async function run() {
    console.log('🔍 Scanning database for images...');
    const dbPath = path.join(__dirname, '../constants/pokemonDb.ts');
    let dbContent = fs.readFileSync(dbPath, 'utf-8');

    const urlRegex = /['"](https:\/\/[^'"]+)['"]/g;
    let match;
    const replacements = [];

    while ((match = urlRegex.exec(dbContent)) !== null) {
        const url = match[1];
        const filename = url.split('/').pop();
        const destPath = path.join(ASSETS_DIR, filename);

        console.log(`⬇️  Downloading ${filename}...`);
        await downloadFile(url, destPath);

        replacements.push({
            original: match[0],
            replacement: `require('../assets/images/game/${filename}')`,
        });
    }

    console.log('📝 Updating pokemonDb.ts...');
    for (const r of replacements) {
        dbContent = dbContent.replaceAll(r.original, r.replacement);
    }

    // Update the Types to natively accept the require() modules
    dbContent = dbContent.replaceAll('spriteUri: string;', 'spriteUri: any;');
    dbContent = dbContent.replaceAll('inventoryImageUri: string;', 'inventoryImageUri: any;');

    fs.writeFileSync(dbPath, dbContent);

    console.log('⬇️  Downloading extra UI assets (Trainer)...');
    await downloadFile(
        'https://play.pokemonshowdown.com/sprites/trainers/ash.png',
        path.join(ASSETS_DIR, 'trainer_ash.png'),
    );

    console.log('✅ Asset localization complete! Your app now runs with local images.');
}

run().catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
});
