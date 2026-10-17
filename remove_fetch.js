const fs = require('fs');
let content = fs.readFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', 'utf8');

const regex = /let data = new FormData\(\);\s*data\.append\('action', 'wao_send_telegram_ajax'\);\s*data\.append\('order_id', '<\?php echo \$order_id; \?>'\);\s*fetch\('<\?php echo admin_url\('admin-ajax\.php'\); \?>', \{ method: 'POST', body: data \}\);/;

content = content.replace(regex, "// Telegram moved to backend for reliability");

fs.writeFileSync('C:/Users/user/Local Sites/boutique-cod/app/public/wp-content/plugins/wao-cod-system/wao-cod-system.php', content, 'utf8');
console.log('Removed frontend fetch');