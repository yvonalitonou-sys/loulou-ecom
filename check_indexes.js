const fs = require('fs');
let backup = fs.readFileSync('C:/Users/user/.gemini/antigravity/scratch/loulou-ecom/wao-cod-system-BACKUP.php', 'utf8');

const s1 = backup.indexOf('function wao_send_telegram_ajax');
const s2 = backup.indexOf('// === FACEBOOK PIXEL INTEGRATION ===', s1);

console.log("Indexes:", s1, s2);