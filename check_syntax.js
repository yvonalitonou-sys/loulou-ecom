const { execSync } = require('child_process');
const phpPaths = [
    'C:/Users/user/AppData/Local/Programs/Local/resources/extraResources/lightning-services/php-8.1.9+8/bin/win64/php.exe',
    'C:/Users/user/AppData/Local/Programs/Local/resources/extraResources/lightning-services/php-7.4.30+5/bin/win64/php.exe',
    'C:/Users/user/AppData/Local/Programs/Local/resources/extraResources/lightning-services/php-8.2.10+0/bin/win64/php.exe'
];

let phpFound = false;
for (const path of phpPaths) {
    if (require('fs').existsSync(path)) {
        console.log(`Found PHP at: ${path}`);
        try {
            const result = execSync(`"${path}" -l "C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php"`);
            console.log(result.toString());
        } catch (e) {
            console.log("Syntax Error:");
            console.log(e.stdout ? e.stdout.toString() : e.message);
        }
        phpFound = true;
        break;
    }
}
if (!phpFound) console.log("PHP binary not found.");