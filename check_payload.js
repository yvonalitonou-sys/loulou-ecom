const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const s1 = content.indexOf('function wao_send_telegram_ajax');
const snippet = content.substring(s1, s1 + 1500);
console.log(snippet);