const fs = require('fs');

let backup = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/wao-cod-system-BACKUP.php', 'utf8');
let live = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

// I need to extract EVERYTHING from backup between the end of wao_send_telegram_ajax and the endStr
const startMarker = "      return ob_get_clean();\n  }"; // End of wao_send_telegram_ajax
const endMarker = "// === FACEBOOK PIXEL INTEGRATION ===";

const startIdx = backup.indexOf(startMarker);
const endIdx = backup.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const missingCode = backup.substring(startIdx + startMarker.length, endIdx);
    
    // Inject it back into live just before FACEBOOK PIXEL INTEGRATION
    const liveEndIdx = live.indexOf(endMarker);
    if (liveEndIdx !== -1) {
        live = live.substring(0, liveEndIdx) + missingCode + live.substring(liveEndIdx);
        fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', live, 'utf8');
        console.log('Restored missing code!');
    }
} else {
    console.log("Could not extract");
}