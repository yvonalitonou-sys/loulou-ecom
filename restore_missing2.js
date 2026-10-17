const fs = require('fs');

let backup = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/wao-cod-system-BACKUP.php', 'utf8');
let live = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const s1 = backup.indexOf('function wao_send_telegram_ajax');
// We need to skip the entire wao_send_telegram_ajax function!
// Let's just find the start of the next section!
const nextSection = backup.indexOf('// === 5. PIED DE PAGE ET BOUTON FLOTTANT ===');
const endMarker = "// === FACEBOOK PIXEL INTEGRATION ===";
const s2 = backup.indexOf(endMarker, nextSection);

if (nextSection !== -1 && s2 !== -1) {
    const missingCode = backup.substring(nextSection, s2);
    
    // Inject it back into live just before FACEBOOK PIXEL INTEGRATION
    const liveEndIdx = live.indexOf(endMarker);
    if (liveEndIdx !== -1) {
        live = live.substring(0, liveEndIdx) + missingCode + live.substring(liveEndIdx);
        
        // Let's also make sure we remove the frontend fetch from the restored code!
        const fetchRegex = /let data = new FormData\(\);\s*data\.append\('action', 'wao_send_telegram_ajax'\);\s*data\.append\('order_id', '<\?php echo \$order_id; \?>'\);\s*fetch\('<\?php echo admin_url\('admin-ajax\.php'\); \?>', \{ method: 'POST', body: data \}\);/;
        live = live.replace(fetchRegex, "// Telegram moved to backend");

        fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', live, 'utf8');
        console.log('Restored missing code via nextSection!');
    }
}