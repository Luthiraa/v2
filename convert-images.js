
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
    const dir = path.join(__dirname, 'public/images/writing/21-reflections');

    if (!fs.existsSync(dir)) {
        console.error(`Directory not found: ${dir}`);
        process.exit(1);
    }

    console.log(`Scanning ${dir} for HEIC files...`);
    const files = fs.readdirSync(dir);
    let convertedCount = 0;

    for (const file of files) {
        if (path.extname(file).toLowerCase() === '.heic') {
            const inputPath = path.join(dir, file);
            const outputPath = path.join(dir, path.basename(file, path.extname(file)) + '.jpg');

            // Skip if JPG already exists to save time? No, overwrite to be safe.
            console.log(`Converting ${file} to JPG...`);
            try {
                // Try sips (macOS)
                execSync(`sips -s format jpeg "${inputPath}" --out "${outputPath}"`, { stdio: 'inherit' });
                console.log(`✓ Converted ${file}`);
                convertedCount++;
            } catch (error) {
                console.error(`✗ Failed to convert ${file}:`, error.message);
                // Try ImageMagick as fallback?
                try {
                    execSync(`magick "${inputPath}" "${outputPath}"`, { stdio: 'inherit' });
                    console.log(`✓ Converted ${file} with magick`);
                    convertedCount++;
                } catch (e2) {
                    console.error(`  Also failed with magick.`);
                }
            }
        }
    }

    console.log(`\nConversion complete. ${convertedCount} files converted.`);

    // Clean .next folder
    const nextDir = path.join(__dirname, '.next');
    if (fs.existsSync(nextDir)) {
        console.log('\nCleaning .next folder to fix build errors...');
        try {
            fs.rmSync(nextDir, { recursive: true, force: true });
            console.log('✓ .next folder removed.');
        } catch (err) {
            console.error('✗ Failed to remove .next folder:', err.message);
            console.log('You may need to stop the dev server first.');
        }
    } else {
        console.log('\n.next folder not found, skipping cleanup.');
    }

    console.log('\nDone! Please restart your dev server: npm run dev');
}

main().catch(console.error);
